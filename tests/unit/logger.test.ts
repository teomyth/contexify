import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import createLogger, { configure, Logger } from '../../src/utils/logger.js';

describe('Logger', () => {
  let originalConsoleLog: typeof console.log;
  let originalProcessStdoutWrite: typeof process.stdout.write;
  let mockConsoleLog: ReturnType<typeof vi.fn>;
  let mockStdoutWrite: ReturnType<typeof vi.fn>;

  // Store original environment
  const originalEnv = { ...process.env };
  const originalWindow = typeof window !== 'undefined' ? window : undefined;

  beforeEach(() => {
    // Mock console.log
    originalConsoleLog = console.log;
    mockConsoleLog = vi.fn();
    console.log = mockConsoleLog;

    // Mock process.stdout.write if in Node environment
    if (typeof process !== 'undefined' && process.stdout) {
      originalProcessStdoutWrite = process.stdout.write;
      mockStdoutWrite = vi.fn();
      process.stdout.write = mockStdoutWrite as any;
    }

    // Reset environment variables
    process.env = { ...originalEnv };

    // Reset logger configuration
    configure({
      colors: true,
      timestamp: true,
    });
  });

  afterEach(() => {
    // Restore original functions
    console.log = originalConsoleLog;
    if (typeof process !== 'undefined' && process.stdout) {
      process.stdout.write = originalProcessStdoutWrite;
    }

    // Restore environment
    process.env = originalEnv;

    // Clear all mocks
    vi.clearAllMocks();
  });

  describe('createLogger', () => {
    it('should create a logger function', () => {
      const logger = createLogger('test');
      expect(typeof logger).toBe('function');
      expect(typeof logger.enabled).toBe('boolean');
      expect(typeof logger.extend).toBe('function');
    });

    it('should create a disabled logger by default', () => {
      const logger = createLogger('test');
      expect(logger.enabled).toBe(false);
    });

    it('should create an enabled logger when DEBUG=* is set', () => {
      process.env.DEBUG = '*';
      const logger = createLogger('test');
      expect(logger.enabled).toBe(true);
    });

    it('should create an enabled logger when DEBUG matches the namespace', () => {
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      expect(logger.enabled).toBe(true);
    });

    it('should create an enabled logger when DEBUG matches the namespace prefix', () => {
      process.env.DEBUG = 'test:*';
      const logger = createLogger('test:submodule');
      expect(logger.enabled).toBe(true);
    });

    it('should create a disabled logger when DEBUG excludes the namespace', () => {
      process.env.DEBUG = '-test';
      const logger = createLogger('test');
      expect(logger.enabled).toBe(false);
    });

    it('should create a disabled logger when DEBUG includes and excludes the namespace', () => {
      process.env.DEBUG = 'test,-test';
      const logger = createLogger('test');
      expect(logger.enabled).toBe(false);
    });
  });

  describe('logger function', () => {
    it('should not log when disabled', () => {
      const logger = createLogger('test');
      logger('test message');
      expect(mockConsoleLog).not.toHaveBeenCalled();
      if (mockStdoutWrite) {
        expect(mockStdoutWrite).not.toHaveBeenCalled();
      }
    });

    it('should log when enabled', () => {
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      logger('test message');

      // Check that either console.log or process.stdout.write was called
      const consoleLogCalled = mockConsoleLog.mock.calls.length > 0;
      const stdoutWriteCalled =
        mockStdoutWrite && mockStdoutWrite.mock.calls.length > 0;

      expect(consoleLogCalled || stdoutWriteCalled).toBe(true);
    });

    it('should format string messages correctly', () => {
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      logger('Hello, %s!', 'world');

      if (mockStdoutWrite) {
        expect(mockStdoutWrite).toHaveBeenCalledWith(
          expect.stringContaining('Hello, world!')
        );
      } else {
        expect(mockConsoleLog).toHaveBeenCalledWith(
          expect.any(String),
          expect.stringContaining('Hello, world!')
        );
      }
    });

    it('should format number messages correctly', () => {
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      logger('Count: %d', 42);

      if (mockStdoutWrite) {
        expect(mockStdoutWrite).toHaveBeenCalledWith(
          expect.stringContaining('Count: 42')
        );
      } else {
        expect(mockConsoleLog).toHaveBeenCalledWith(
          expect.any(String),
          expect.stringContaining('Count: 42')
        );
      }
    });

    it('should format object messages correctly', () => {
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      const obj = { name: 'test', value: 42 };
      logger('Object: %o', obj);

      const objString = JSON.stringify(obj);

      if (mockStdoutWrite) {
        expect(mockStdoutWrite).toHaveBeenCalledWith(
          expect.stringContaining(`Object: ${objString}`)
        );
      } else {
        expect(mockConsoleLog).toHaveBeenCalledWith(
          expect.any(String),
          expect.stringContaining(`Object: ${objString}`)
        );
      }
    });

    it('should handle non-string formatters', () => {
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      logger(42, 'test');

      if (mockStdoutWrite) {
        expect(mockStdoutWrite).toHaveBeenCalledWith(
          expect.stringContaining('42 test')
        );
      } else {
        expect(mockConsoleLog).toHaveBeenCalledWith(
          expect.any(String),
          expect.stringContaining('42 test')
        );
      }
    });
  });

  describe('extend', () => {
    it('should create a new logger with extended namespace', () => {
      const logger = createLogger('test');
      const extendedLogger = logger.extend('sub');
      expect(extendedLogger).not.toBe(logger);
      expect(typeof extendedLogger).toBe('function');
      expect(typeof extendedLogger.enabled).toBe('boolean');
      expect(typeof extendedLogger.extend).toBe('function');
    });

    it('should create an enabled extended logger when parent namespace is enabled', () => {
      process.env.DEBUG = 'test:*';
      const logger = createLogger('test');
      const extendedLogger = logger.extend('sub');
      expect(extendedLogger.enabled).toBe(true);
    });

    it('should create a disabled extended logger when parent namespace is disabled', () => {
      process.env.DEBUG = 'other';
      const logger = createLogger('test');
      const extendedLogger = logger.extend('sub');
      expect(extendedLogger.enabled).toBe(false);
    });
  });

  describe('configure', () => {
    it('should disable colors', () => {
      configure({ colors: false });
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      logger('test message');

      if (mockStdoutWrite) {
        // Check that ANSI color codes are not present
        expect(mockStdoutWrite).toHaveBeenCalledWith(
          expect.not.stringMatching(/\u001b\[\d+m/)
        );
      }
      // Note: We can't easily test browser colors since they're passed as CSS
    });

    it('should disable timestamp', () => {
      configure({ timestamp: false });
      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      logger('test message');

      // ISO date format regex
      const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

      if (mockStdoutWrite) {
        expect(mockStdoutWrite).toHaveBeenCalledWith(
          expect.not.stringMatching(isoDateRegex)
        );
      } else {
        // For browser, we can't easily check the actual string content
        // Just verify that logging happened
        expect(mockConsoleLog).toHaveBeenCalled();
      }
    });

    it('should use custom formatters', () => {
      configure({
        formatters: {
          t: (v: any) => `TEST:${v}`,
        },
      });

      process.env.DEBUG = 'test';
      const logger = createLogger('test');
      logger('Custom: %t', 'value');

      if (mockStdoutWrite) {
        expect(mockStdoutWrite).toHaveBeenCalledWith(
          expect.stringContaining('Custom: TEST:value')
        );
      } else {
        expect(mockConsoleLog).toHaveBeenCalledWith(
          expect.any(String),
          expect.stringContaining('Custom: TEST:value')
        );
      }
    });
  });
});
