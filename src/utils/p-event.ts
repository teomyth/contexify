/**
 * This module contains utilities to convert events to promises and async iterators.
 * It's a simplified version of the p-event package (https://github.com/sindresorhus/p-event)
 * adapted for our specific needs.
 */

/**
 * Error thrown when a promise times out
 */
export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Normalize an event emitter to have consistent addListener and removeListener methods
 */
const normalizeEmitter = (emitter: any) => {
  const addListener =
    emitter.addEventListener || emitter.on || emitter.addListener;
  const removeListener =
    emitter.removeEventListener || emitter.off || emitter.removeListener;

  if (!addListener || !removeListener) {
    throw new TypeError('Emitter is not compatible');
  }

  return {
    addListener: addListener.bind(emitter),
    removeListener: removeListener.bind(emitter),
  };
};

/**
 * Options for pEventMultiple
 */
export interface MultipleOptions<T = unknown> {
  /**
   * Events that will reject the promise.
   * @default ['error']
   */
  rejectionEvents?: string[];

  /**
   * Whether to return all arguments from the event callback.
   * @default false
   */
  multiArgs?: boolean;

  /**
   * Whether to resolve the promise immediately.
   * @default false
   */
  resolveImmediately?: boolean;

  /**
   * The number of times the event needs to be emitted before the promise resolves.
   */
  count: number;

  /**
   * The time in milliseconds before timing out.
   * @default Infinity
   */
  timeout?: number;

  /**
   * A filter function for accepting an event.
   */
  filter?: (value: T) => boolean;

  /**
   * An AbortSignal to abort waiting for the event.
   */
  signal?: AbortSignal;
}

/**
 * Options for pEvent
 */
export interface Options<T = unknown>
  extends Partial<Omit<MultipleOptions<T>, 'count'>> {}

/**
 * A promise with a cancel method
 */
export interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void;
}

/**
 * Wait for multiple event emissions
 */
export function pEventMultiple<T = unknown>(
  emitter: any,
  event: string | symbol | (string | symbol)[],
  options: MultipleOptions<T>
): CancelablePromise<T[]> {
  let cancel: () => void;
  const returnValue = new Promise<T[]>((resolve, reject) => {
    options = {
      rejectionEvents: ['error'],
      multiArgs: false,
      resolveImmediately: false,
      ...options,
    };

    if (
      !(
        options.count >= 0 &&
        (options.count === Number.POSITIVE_INFINITY ||
          Number.isInteger(options.count))
      )
    ) {
      throw new TypeError('The `count` option should be at least 0 or more');
    }

    options.signal?.throwIfAborted();

    // Allow multiple events
    const events = Array.isArray(event) ? event : [event];

    const items: T[] = [];
    const { addListener, removeListener } = normalizeEmitter(emitter);

    const onItem = (...arguments_: any[]) => {
      const value = options.multiArgs
        ? (arguments_ as unknown as T)
        : (arguments_[0] as T);

      if (options.filter && !options.filter(value)) {
        return;
      }

      items.push(value);

      if (options.count === items.length) {
        cancel();
        resolve(items);
      }
    };

    const rejectHandler = (error: Error) => {
      cancel();
      reject(error);
    };

    cancel = () => {
      for (const event of events) {
        removeListener(event, onItem);
      }

      for (const rejectionEvent of options.rejectionEvents || []) {
        removeListener(rejectionEvent, rejectHandler);
      }
    };

    for (const event of events) {
      addListener(event, onItem);
    }

    for (const rejectionEvent of options.rejectionEvents || []) {
      addListener(rejectionEvent, rejectHandler);
    }

    if (options.signal) {
      options.signal.addEventListener(
        'abort',
        () => {
          rejectHandler(options.signal!.reason as Error);
        },
        { once: true }
      );
    }

    if (options.resolveImmediately) {
      resolve(items);
    }
  }) as CancelablePromise<T[]>;

  returnValue.cancel = cancel!;

  if (typeof options.timeout === 'number') {
    const timeoutPromise = new Promise<T[]>((_, reject) => {
      const timer = setTimeout(() => {
        returnValue.cancel();
        reject(
          new TimeoutError(
            `Promise timed out after ${options.timeout} milliseconds`
          )
        );
      }, options.timeout);

      // Clear the timeout when the promise is fulfilled
      returnValue.then(
        () => clearTimeout(timer),
        () => clearTimeout(timer)
      );
    });

    const combinedPromise = Promise.race([
      returnValue,
      timeoutPromise,
    ]) as CancelablePromise<T[]>;
    combinedPromise.cancel = cancel!;
    return combinedPromise;
  }

  return returnValue;
}

/**
 * Wait for a single event emission
 */
export function pEvent<T = unknown>(
  emitter: any,
  event: string | symbol | (string | symbol)[],
  options?: Options<T> | ((value: T) => boolean)
): CancelablePromise<T> {
  if (typeof options === 'function') {
    options = { filter: options };
  }

  const multipleOptions: MultipleOptions<T> = {
    ...(options as Options<T>),
    count: 1,
    resolveImmediately: false,
  };

  const arrayPromise = pEventMultiple<T>(emitter, event, multipleOptions);
  const promise = arrayPromise.then(
    (array) => array[0]
  ) as CancelablePromise<T>;
  promise.cancel = arrayPromise.cancel;

  return promise;
}

/**
 * Options for pEventIterator
 */
export interface IteratorOptions<T = unknown>
  extends Omit<Options<T>, 'timeout'> {
  /**
   * Events that will end the iterator.
   * @default []
   */
  resolutionEvents?: string[];

  /**
   * The maximum number of events for the iterator before it ends.
   * @default Infinity
   */
  limit?: number;
}

/**
 * Create an async iterator for events
 */
export function pEventIterator<T = unknown>(
  emitter: any,
  event: string | symbol | (string | symbol)[],
  options?: IteratorOptions<T> | ((value: T) => boolean)
): AsyncIterableIterator<T> {
  if (typeof options === 'function') {
    options = { filter: options };
  }

  // Allow multiple events
  const events = Array.isArray(event) ? event : [event];

  options = {
    rejectionEvents: ['error'],
    resolutionEvents: [],
    limit: Number.POSITIVE_INFINITY,
    multiArgs: false,
    ...options,
  };

  const { limit } = options;
  const isValidLimit =
    limit! >= 0 &&
    (limit === Number.POSITIVE_INFINITY || Number.isInteger(limit));
  if (!isValidLimit) {
    throw new TypeError(
      'The `limit` option should be a non-negative integer or Infinity'
    );
  }

  options.signal?.throwIfAborted();

  if (limit === 0) {
    // Return an empty async iterator to avoid any further cost
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      async next() {
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }

  const { addListener, removeListener } = normalizeEmitter(emitter);

  let isDone = false;
  let error: any;
  let hasPendingError = false;
  const nextQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];
  const valueQueue: T[] = [];
  let eventCount = 0;
  let isLimitReached = false;

  const valueHandler = (...arguments_: any[]) => {
    eventCount++;
    isLimitReached = eventCount === limit;

    const value = options!.multiArgs
      ? (arguments_ as unknown as T)
      : (arguments_[0] as T);

    if (nextQueue.length > 0) {
      const { resolve } = nextQueue.shift()!;

      resolve({ done: false, value });

      if (isLimitReached) {
        cancel();
      }

      return;
    }

    valueQueue.push(value);

    if (isLimitReached) {
      cancel();
    }
  };

  const cancel = () => {
    isDone = true;

    for (const event of events) {
      removeListener(event, valueHandler);
    }

    for (const rejectionEvent of options!.rejectionEvents!) {
      removeListener(rejectionEvent, rejectHandler);
    }

    for (const resolutionEvent of options!.resolutionEvents!) {
      removeListener(resolutionEvent, resolveHandler);
    }

    while (nextQueue.length > 0) {
      const { resolve } = nextQueue.shift()!;
      resolve({ done: true, value: undefined });
    }
  };

  const rejectHandler = (...arguments_: any[]) => {
    error = options!.multiArgs ? arguments_ : arguments_[0];

    if (nextQueue.length > 0) {
      const { reject } = nextQueue.shift()!;
      reject(error);
    } else {
      hasPendingError = true;
    }

    cancel();
  };

  const resolveHandler = (...arguments_: any[]) => {
    const value = options!.multiArgs
      ? (arguments_ as unknown as T)
      : (arguments_[0] as T);

    if (options!.filter && !options!.filter(value)) {
      cancel();
      return;
    }

    if (nextQueue.length > 0) {
      const { resolve } = nextQueue.shift()!;
      resolve({ done: true, value });
    } else {
      valueQueue.push(value);
    }

    cancel();
  };

  for (const event of events) {
    addListener(event, valueHandler);
  }

  for (const rejectionEvent of options!.rejectionEvents!) {
    addListener(rejectionEvent, rejectHandler);
  }

  for (const resolutionEvent of options!.resolutionEvents!) {
    addListener(resolutionEvent, resolveHandler);
  }

  if (options!.signal) {
    options!.signal.addEventListener(
      'abort',
      () => {
        rejectHandler(options!.signal!.reason);
      },
      { once: true }
    );
  }

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      if (valueQueue.length > 0) {
        const value = valueQueue.shift()!;
        return {
          done: isDone && valueQueue.length === 0 && !isLimitReached,
          value,
        };
      }

      if (hasPendingError) {
        hasPendingError = false;
        throw error;
      }

      if (isDone) {
        return {
          done: true,
          value: undefined,
        };
      }

      return new Promise((resolve, reject) => {
        nextQueue.push({ resolve, reject });
      });
    },
    async return(value?: any) {
      cancel();
      return {
        done: isDone,
        value,
      };
    },
  };
}
