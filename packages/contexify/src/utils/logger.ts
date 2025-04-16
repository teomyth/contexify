/**
 * A lightweight logger inspired by the debug package
 * Provides similar functionality with a smaller footprint
 */

export interface LoggerOptions {
  colors?: boolean;
  timestamp?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatters?: Record<string, (v: any) => string>;
}

export interface Logger {
  enabled: boolean;
  (formatter: unknown, ...args: unknown[]): void;
  extend: (suffix: string) => Logger;
}

// Environment detection is done inline where needed

// Global configuration
const config: LoggerOptions = {
  colors: true,
  timestamp: true,
  formatters: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    o: (v: any) => JSON.stringify(v),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    O: (v: any) => JSON.stringify(v, null, 2),
  },
};

// Parse DEBUG environment variable
const enabledNamespaces = new Set<string>();
const skippedNamespaces = new Set<string>();

function parseDebugEnv() {
  let namespaces = '';

  if (typeof process !== 'undefined' && process.env && process.env.DEBUG) {
    namespaces = process.env.DEBUG;
  } else if (typeof window !== 'undefined') {
    // Read from localStorage
    try {
      namespaces = localStorage.getItem('debug') || '';
    } catch {
      // Ignore errors
    }
  }

  if (!namespaces) return;

  // Clear previous settings
  enabledNamespaces.clear();
  skippedNamespaces.clear();

  namespaces.split(/[\s,]+/).forEach((ns) => {
    if (!ns) return;
    if (ns === '*') {
      enabledNamespaces.add('*');
    } else if (ns.startsWith('-')) {
      skippedNamespaces.add(ns.slice(1));
    } else {
      enabledNamespaces.add(ns);
    }
  });
}

// Color functions
const colors = [
  '#0000CC', // blue
  '#CC0000', // red
  '#00CC00', // green
  '#CCCC00', // yellow
  '#00CCCC', // cyan
  '#CC00CC', // magenta
];

// Node.js color codes
const nodeColors = [
  '\x1b[34m', // blue
  '\x1b[31m', // red
  '\x1b[32m', // green
  '\x1b[33m', // yellow
  '\x1b[36m', // cyan
  '\x1b[35m', // magenta
];

const reset = '\x1b[0m';

// Assign colors to namespaces
const namespaceColors = new Map<string, number>();
let colorIndex = 0;

function getColorIndex(namespace: string): number {
  if (!namespaceColors.has(namespace)) {
    namespaceColors.set(namespace, colorIndex++ % colors.length);
  }
  return namespaceColors.get(namespace)!;
}

// Format function
function format(formatter: unknown, args: unknown[]): string {
  if (typeof formatter !== 'string') {
    return [formatter, ...args]
      .map((arg) =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      )
      .join(' ');
  }

  let index = 0;
  return formatter.replace(/%([a-z%])/gi, (match, format) => {
    // %% escapes to %
    if (match === '%%') return '%';

    if (index >= args.length) return match;
    const arg = args[index++];

    // Use custom formatters
    if (config.formatters && format in config.formatters) {
      return config.formatters[format](arg);
    }

    switch (format) {
      case 's':
        return String(arg);
      case 'd':
        return Number(arg).toString();
      case 'j':
        return JSON.stringify(arg);
      case 'o':
        return JSON.stringify(arg);
      case 'O':
        return JSON.stringify(arg, null, 2);
      default:
        return String(arg);
    }
  });
}

/**
 * Creates a logger function with the specified namespace
 * @param namespace - The namespace for the logger
 * @returns A logger function
 */
// Make sure to parse environment variables before creating loggers
function ensureEnvParsed() {
  parseDebugEnv();
}

export function createLogger(namespace: string): Logger {
  // Parse environment variables when creating a logger
  ensureEnvParsed();

  const isEnabled = () => {
    if (skippedNamespaces.has(namespace)) return false;
    if (enabledNamespaces.has('*')) return true;
    if (enabledNamespaces.has(namespace)) return true;

    return [...enabledNamespaces].some((ns) => {
      if (ns.endsWith('*')) {
        const prefix = ns.slice(0, -1);
        return namespace.startsWith(prefix);
      }
      return false;
    });
  };

  const logger = ((formatter: unknown, ...args: unknown[]) => {
    if (!logger.enabled) return;

    const colorIdx = getColorIndex(namespace);
    const time = config.timestamp ? new Date().toISOString() + ' ' : '';
    const message = format(formatter, args);

    if (
      typeof process !== 'undefined' &&
      process.stdout &&
      process.stdout.write
    ) {
      if (config.colors) {
        process.stdout.write(
          `${nodeColors[colorIdx]}${time}${namespace}${reset} ${message}\n`
        );
      } else {
        process.stdout.write(`${time}${namespace} ${message}\n`);
      }
    } else {
      // Browser environment
      if (config.colors) {
        console.log(
          `%c${time}${namespace}`,
          `color: ${colors[colorIdx]}`,
          message
        );
      } else {
        console.log(`${time}${namespace}`, message);
      }
    }
  }) as Logger;

  // Define enabled property
  Object.defineProperty(logger, 'enabled', {
    get: isEnabled,
  });

  // Add extend method
  logger.extend = (suffix: string) => {
    return createLogger(`${namespace}:${suffix}`);
  };

  return logger;
}

/**
 * Configure the logger
 * @param options - Logger options
 */
export function configure(options: LoggerOptions) {
  Object.assign(config, options);
}

// Export default instance
export default createLogger;
