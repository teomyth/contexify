import { beforeEach, describe, expect, it } from 'vitest';

import {
  Context,
  type ContextView,
  compareBindingsByTag,
  filterByTag,
  type Getter,
  inject,
} from '../../src/index.js';

let app: Context;
let server: Context;

describe('@inject.* to receive multiple values matching a filter', () => {
  const workloadMonitorFilter = filterByTag('workloadMonitor');
  beforeEach(givenWorkloadMonitors);

  it('injects as getter', async () => {
    class MyControllerWithGetter {
      @inject.getter(workloadMonitorFilter)
      getter: Getter<number[]>;
    }

    server.bind('my-controller').toClass(MyControllerWithGetter);
    const inst = await server.get<MyControllerWithGetter>('my-controller');
    const getter = inst.getter;
    expect(await getter()).toEqual([3, 5]);
    // Add a new binding that matches the filter
    givenWorkloadMonitor(server, 'server-reporter-2', 7);
    // The getter picks up the new binding
    expect(await getter()).toEqual([3, 7, 5]);
  });

  it('injects as getter with bindingComparator', async () => {
    class MyControllerWithGetter {
      @inject.getter(workloadMonitorFilter, {
        bindingComparator: compareBindingsByTag('name'),
      })
      getter: Getter<number[]>;
    }

    server.bind('my-controller').toClass(MyControllerWithGetter);
    const inst = await server.get<MyControllerWithGetter>('my-controller');
    const getter = inst.getter;
    // app-reporter, server-reporter
    expect(await getter()).toEqual([5, 3]);
    // Add a new binding that matches the filter
    givenWorkloadMonitor(server, 'server-reporter-2', 7);
    // The getter picks up the new binding by order
    // // app-reporter, server-reporter, server-reporter-2
    expect(await getter()).toEqual([5, 3, 7]);
  });

  describe('@inject', () => {
    class MyControllerWithValues {
      constructor(
        @inject(workloadMonitorFilter)
        public values: number[]
      ) {}
    }

    it('injects as values', async () => {
      server.bind('my-controller').toClass(MyControllerWithValues);
      const inst = await server.get<MyControllerWithValues>('my-controller');
      expect(inst.values).toEqual([3, 5]);
    });

    it('injects as values that can be resolved synchronously', () => {
      server.bind('my-controller').toClass(MyControllerWithValues);
      const inst = server.getSync<MyControllerWithValues>('my-controller');
      expect(inst.values).toEqual([3, 5]);
    });

    it('injects as values with bindingComparator', async () => {
      class MyControllerWithBindingSorter {
        constructor(
          @inject(workloadMonitorFilter, {
            bindingComparator: compareBindingsByTag('name'),
          })
          public values: number[]
        ) {}
      }
      server.bind('my-controller').toClass(MyControllerWithBindingSorter);
      const inst =
        await server.get<MyControllerWithBindingSorter>('my-controller');
      // app-reporter, server-reporter
      expect(inst.values).toEqual([5, 3]);
    });

    it('throws error if bindingComparator is provided without a filter', () => {
      expect(() => {
        class ControllerWithInvalidInject {
          constructor(
            @inject('my-key', {
              bindingComparator: compareBindingsByTag('name'),
            })
            public values: number[]
          ) {}
        }
      }).toThrow('Binding comparator is only allowed with a binding filter');
    });
  });

  it('injects as a view', async () => {
    class MyControllerWithView {
      @inject.view(workloadMonitorFilter)
      view: ContextView<number[]>;
    }

    server.bind('my-controller').toClass(MyControllerWithView);
    const inst = await server.get<MyControllerWithView>('my-controller');
    const view = inst.view;
    expect(await view.values()).toEqual([3, 5]);
    // Add a new binding that matches the filter
    const binding = givenWorkloadMonitor(server, 'server-reporter-2', 7);
    // The view picks up the new binding
    expect(await view.values()).toEqual([3, 7, 5]);
    server.unbind(binding.key);
    expect(await view.values()).toEqual([3, 5]);
  });

  it('injects as a view with bindingComparator', async () => {
    class MyControllerWithView {
      @inject.view(workloadMonitorFilter, {
        bindingComparator: compareBindingsByTag('name'),
      })
      view: ContextView<number[]>;
    }

    server.bind('my-controller').toClass(MyControllerWithView);
    const inst = await server.get<MyControllerWithView>('my-controller');
    const view = inst.view;
    expect(view.bindings.map((b) => b.tagMap.name)).toEqual([
      'app-reporter',
      'server-reporter',
    ]);
    expect(await view.values()).toEqual([5, 3]);
  });

  function givenWorkloadMonitors() {
    givenServerWithinAnApp();
    givenWorkloadMonitor(server, 'server-reporter', 3);
    givenWorkloadMonitor(app, 'app-reporter', 5);
  }

  /**
   * Add a workload monitor to the given context
   * @param ctx - Context object
   * @param name - Name of the monitor
   * @param workload - Current workload
   */
  function givenWorkloadMonitor(ctx: Context, name: string, workload: number) {
    return ctx
      .bind(`workloadMonitors.${name}`)
      .to(workload)
      .tag('workloadMonitor')
      .tag({ name });
  }
});

function givenServerWithinAnApp() {
  app = new Context('app');
  server = new Context(app, 'server');
}
