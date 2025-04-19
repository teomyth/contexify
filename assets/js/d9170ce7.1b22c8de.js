"use strict";(self.webpackChunk_contexify_docs_site=self.webpackChunk_contexify_docs_site||[]).push([[949],{991:(e,n,i)=>{i.d(n,{R:()=>c,x:()=>o});var t=i(4700);const s={},r=t.createContext(s);function c(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),t.createElement(r.Provider,{value:n},e.children)}},6023:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"api/binding","title":"Binding","description":"The Binding class represents a connection between a key and a value in the Context. It provides methods for configuring how values are resolved.","source":"@site/docs/api/binding.md","sourceDirName":"api","slug":"/api/binding","permalink":"/contexify/docs/api/binding","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/api/binding.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Context","permalink":"/contexify/docs/api/context"},"next":{"title":"ContextView","permalink":"/contexify/docs/api/context-view"}}');var s=i(7968),r=i(991);const c={sidebar_position:2},o="Binding",a={},l=[{value:"Static Methods",id:"static-methods",level:2},{value:"create",id:"create",level:3},{value:"Properties",id:"properties",level:2},{value:"key",id:"key",level:3},{value:"scope",id:"scope",level:3},{value:"tags",id:"tags",level:3},{value:"tagMap",id:"tagmap",level:3},{value:"Binding Methods",id:"binding-methods",level:2},{value:"to",id:"to",level:3},{value:"toClass",id:"toclass",level:3},{value:"toDynamicValue",id:"todynamicvalue",level:3},{value:"toProvider",id:"toprovider",level:3},{value:"toAlias",id:"toalias",level:3},{value:"Scope Methods",id:"scope-methods",level:2},{value:"inScope",id:"inscope",level:3},{value:"Tag Methods",id:"tag-methods",level:2},{value:"tag",id:"tag",level:3},{value:"tagMap",id:"tagmap-1",level:3},{value:"Configuration Methods",id:"configuration-methods",level:2},{value:"configure",id:"configure",level:3},{value:"Complete Example",id:"complete-example",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"binding",children:"Binding"})}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"Binding"})," class represents a connection between a key and a value in the Context. It provides methods for configuring how values are resolved."]}),"\n",(0,s.jsx)(n.h2,{id:"static-methods",children:"Static Methods"}),"\n",(0,s.jsx)(n.h3,{id:"create",children:"create"}),"\n",(0,s.jsx)(n.p,{children:"Creates a new Binding with the given key."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"key"}),": The binding key. This is a string that uniquely identifies the binding within a Context."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," A new Binding instance."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Create a binding\nconst binding = Binding.create<string>('greeting');\nbinding.to('Hello, world!');\n"})}),"\n",(0,s.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h3,{id:"key",children:"key"}),"\n",(0,s.jsx)(n.p,{children:"The key of the binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const binding = Binding.create('greeting');\nconsole.log(binding.key); // greeting\n"})}),"\n",(0,s.jsx)(n.h3,{id:"scope",children:"scope"}),"\n",(0,s.jsx)(n.p,{children:"The scope of the binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const binding = Binding.create('greeting');\nbinding.inScope(BindingScope.SINGLETON);\nconsole.log(binding.scope); // singleton\n"})}),"\n",(0,s.jsx)(n.h3,{id:"tags",children:"tags"}),"\n",(0,s.jsx)(n.p,{children:"The tags associated with the binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const binding = Binding.create('greeting');\nbinding.tag('message');\nconsole.log(binding.tags.has('message')); // true\n"})}),"\n",(0,s.jsx)(n.h3,{id:"tagmap",children:"tagMap"}),"\n",(0,s.jsx)(n.p,{children:"The tag map associated with the binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const binding = Binding.create('greeting');\nbinding.tag({ type: 'message', priority: 1 });\nconsole.log(binding.tagMap.type); // message\nconsole.log(binding.tagMap.priority); // 1\n"})}),"\n",(0,s.jsx)(n.h2,{id:"binding-methods",children:"Binding Methods"}),"\n",(0,s.jsx)(n.h3,{id:"to",children:"to"}),"\n",(0,s.jsx)(n.p,{children:"Binds the key to a specific value."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"value"}),": The value to bind."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Bind to a simple value\ncontext.bind('greeting').to('Hello, world!');\n\n// Bind to an object\ncontext.bind('config').to({\n  host: 'localhost',\n  port: 3000\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"toclass",children:"toClass"}),"\n",(0,s.jsx)(n.p,{children:"Binds the key to a class constructor. When resolved, a new instance of the class will be created."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"ctor"}),": The class constructor."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Bind to a class\ncontext.bind('services.UserService').toClass(UserService);\n\n// Resolve the class\nconst userService = await context.get<UserService>('services.UserService');\n"})}),"\n",(0,s.jsx)(n.h3,{id:"todynamicvalue",children:"toDynamicValue"}),"\n",(0,s.jsx)(n.p,{children:"Binds the key to a factory function that creates the value dynamically."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"factory"}),": A function that creates the value. It receives the Context as an argument."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Bind to a dynamic value\ncontext.bind('currentTime').toDynamicValue(() => new Date().toISOString());\n\n// Bind to a dynamic value that depends on other bindings\ncontext.bind('greeting').toDynamicValue(async (ctx) => {\n  const name = await ctx.get<string>('name');\n  return `Hello, ${name}!`;\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"toprovider",children:"toProvider"}),"\n",(0,s.jsxs)(n.p,{children:["Binds the key to a provider class. When resolved, an instance of the provider will be created, and its ",(0,s.jsx)(n.code,{children:"value()"})," method will be called."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"providerClass"}),": The provider class constructor."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Define a provider\n@injectable()\nclass TimeProvider implements Provider<string> {\n  value() {\n    return new Date().toISOString();\n  }\n}\n\n// Bind to the provider\ncontext.bind('currentTime').toProvider(TimeProvider);\n\n// Resolve the value\nconst time = await context.get<string>('currentTime');\n"})}),"\n",(0,s.jsx)(n.h3,{id:"toalias",children:"toAlias"}),"\n",(0,s.jsx)(n.p,{children:"Binds the key to another binding key. When resolved, the target binding will be resolved instead."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"key"}),": The target binding key."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Bind a value\ncontext.bind('config.apiUrl').to('https://api.example.com');\n\n// Create an alias\ncontext.bind('apiUrl').toAlias('config.apiUrl');\n\n// Resolve through the alias\nconst apiUrl = await context.get<string>('apiUrl');\nconsole.log(apiUrl); // https://api.example.com\n"})}),"\n",(0,s.jsx)(n.h2,{id:"scope-methods",children:"Scope Methods"}),"\n",(0,s.jsx)(n.h3,{id:"inscope",children:"inScope"}),"\n",(0,s.jsx)(n.p,{children:"Sets the scope of the binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"scope"}),": The scope to use."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Singleton scope (default)\ncontext.bind('singleton').to(new Date()).inScope(BindingScope.SINGLETON);\n\n// Transient scope (new instance for each resolution)\ncontext.bind('transient').toDynamicValue(() => new Date()).inScope(BindingScope.TRANSIENT);\n\n// Context scope (instance shared within the same context)\ncontext.bind('contextScoped').toDynamicValue(() => new Date()).inScope(BindingScope.CONTEXT);\n"})}),"\n",(0,s.jsx)(n.h2,{id:"tag-methods",children:"Tag Methods"}),"\n",(0,s.jsx)(n.h3,{id:"tag",children:"tag"}),"\n",(0,s.jsx)(n.p,{children:"Adds a tag or tag map to the binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"tag"}),": A tag string or tag map."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Add a simple tag\ncontext.bind('service.user').toClass(UserService).tag('service');\n\n// Add multiple tags\ncontext.bind('service.user')\n  .toClass(UserService)\n  .tag('service')\n  .tag('core');\n\n// Add a tag map\ncontext.bind('service.user')\n  .toClass(UserService)\n  .tag({ type: 'service', priority: 1 });\n"})}),"\n",(0,s.jsx)(n.h3,{id:"tagmap-1",children:"tagMap"}),"\n",(0,s.jsx)(n.p,{children:"Adds a tag map to the binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"tagMap"}),": The tag map to add."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," The Binding instance (for method chaining)."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Add a tag map\ncontext.bind('service.user')\n  .toClass(UserService)\n  .tagMap({ type: 'service', priority: 1 });\n"})}),"\n",(0,s.jsx)(n.h2,{id:"configuration-methods",children:"Configuration Methods"}),"\n",(0,s.jsx)(n.h3,{id:"configure",children:"configure"}),"\n",(0,s.jsx)(n.p,{children:"Creates a configuration binding for this binding."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Parameters:"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"key"}),": The configuration key."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Returns:"})," A new Binding instance for the configuration."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Example:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Configure a service\ncontext.bind('services.EmailService').toClass(EmailService);\ncontext.bind('services.EmailService').configure('options').to({\n  host: 'smtp.example.com',\n  port: 587,\n  secure: true,\n});\n\n// In the service, use @config() to inject the configuration\n@injectable()\nclass EmailService {\n  constructor(@config() private options: EmailOptions) {}\n\n  sendEmail(to: string, subject: string, body: string) {\n    console.log(`Sending email using ${this.options.host}:${this.options.port}`);\n  }\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"complete-example",children:"Complete Example"}),"\n",(0,s.jsx)(n.p,{children:"Here's a complete example showing how to use the Binding class:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import { Context, Binding, BindingScope, injectable } from 'contexify';\n\n// Create a context\nconst context = new Context('application');\n\n// Bind a simple value\ncontext.bind('greeting').to('Hello, world!');\n\n// Bind a class\n@injectable()\nclass UserService {\n  getUsers() {\n    return ['user1', 'user2', 'user3'];\n  }\n}\ncontext.bind('services.UserService')\n  .toClass(UserService)\n  .inScope(BindingScope.SINGLETON)\n  .tag('service');\n\n// Bind a dynamic value\ncontext.bind('currentTime')\n  .toDynamicValue(() => new Date().toISOString())\n  .inScope(BindingScope.TRANSIENT);\n\n// Bind a provider\n@injectable()\nclass ConfigProvider implements Provider<any> {\n  value() {\n    return {\n      apiUrl: 'https://api.example.com',\n      timeout: 5000\n    };\n  }\n}\ncontext.bind('config')\n  .toProvider(ConfigProvider)\n  .inScope(BindingScope.SINGLETON);\n\n// Create an alias\ncontext.bind('apiConfig').toAlias('config');\n\n// Use the bindings\nasync function run() {\n  // Resolve values\n  const greeting = await context.get<string>('greeting');\n  console.log(greeting); // Hello, world!\n\n  const userService = await context.get<UserService>('services.UserService');\n  console.log(userService.getUsers()); // ['user1', 'user2', 'user3']\n\n  const time1 = await context.get<string>('currentTime');\n  const time2 = await context.get<string>('currentTime');\n  console.log(time1 !== time2); // true (transient scope)\n\n  const config = await context.get<any>('config');\n  console.log(config.apiUrl); // https://api.example.com\n\n  const apiConfig = await context.get<any>('apiConfig');\n  console.log(apiConfig === config); // true (alias)\n}\n\nrun().catch(err => console.error(err));\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}}}]);