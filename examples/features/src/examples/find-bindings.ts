import {
  type BindingFilter,
  type BindingTemplate,
  Context,
  createBindingFromClass,
  filterByTag,
  injectable,
} from 'contexify';

interface Greeter {
  language: string;
  greet(name: string): string;
}

const asGreeter: BindingTemplate = (binding) => {
  binding.tag('greeter');
};

const greeterFilter: BindingFilter = (binding) =>
  binding.tagMap['greeter'] != null;

class ChineseGreeter implements Greeter {
  language = 'zh';
  greet(name: string) {
    return `你好，${name}！`;
  }
}

@injectable(asGreeter)
class EnglishGreeter implements Greeter {
  language = 'en';
  greet(name: string) {
    return `Hello, ${name}!`;
  }
}

export async function main() {
  const ctx = new Context('request');

  // Add EnglishGreeter for now
  ctx.add(createBindingFromClass(EnglishGreeter, { namespace: 'greeters' }));

  // Add ChineseGreeter
  ctx.bind('greeters.ChineseGreeter').toClass(ChineseGreeter).tag('greeter');

  const enlishGreeterBinding = ctx.getBinding('greeters.EnglishGreeter');
  console.log(enlishGreeterBinding.key);

  let possibleEnglishGreeters = ctx.find('*.EnglishGreeter');
  console.log(possibleEnglishGreeters.map((b) => b.key));

  possibleEnglishGreeters = ctx.find(/\w+\.EnglishGreeter$/);
  console.log(possibleEnglishGreeters.map((b) => b.key));

  let greeterBindings = ctx.findByTag('greeter');
  console.log(greeterBindings.map((b) => b.key));

  greeterBindings = ctx.find(filterByTag('greeter'));
  console.log(greeterBindings.map((b) => b.key));

  greeterBindings = ctx.find(greeterFilter);
  console.log(greeterBindings.map((b) => b.key));

  const view = ctx.createView(greeterFilter, (b1, b2) =>
    b1.key.localeCompare(b2.key)
  );
  console.log(view.bindings.map((b) => b.key));
}

// Run this example directly
if (import.meta.url === import.meta.resolve('./find-bindings.js')) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
