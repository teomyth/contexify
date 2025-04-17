"use strict";(self.webpackChunkdocs_site=self.webpackChunkdocs_site||[]).push([[203],{991:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var i=t(4700);const o={},r=i.createContext(o);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:n},e.children)}},7923:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>x,frontMatter:()=>s,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"core-concepts/context","title":"Context","description":"What is Context?","source":"@site/docs/core-concepts/context.md","sourceDirName":"core-concepts","slug":"/core-concepts/context","permalink":"/contexify/docs/core-concepts/context","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/core-concepts/context.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Core Concepts","permalink":"/contexify/docs/category/core-concepts"},"next":{"title":"Binding","permalink":"/contexify/docs/core-concepts/binding"}}');var o=t(7968),r=t(991);const s={sidebar_position:1},c="Context",l={},a=[{value:"What is Context?",id:"what-is-context",level:2},{value:"Context Hierarchy",id:"context-hierarchy",level:2},{value:"Context Levels",id:"context-levels",level:2},{value:"1. Application-level Context (Global)",id:"1-application-level-context-global",level:3},{value:"2. Server-level Context",id:"2-server-level-context",level:3},{value:"3. Request-level Context (Per Request)",id:"3-request-level-context-per-request",level:3},{value:"Creating and Using a Context",id:"creating-and-using-a-context",level:2},{value:"Context Events",id:"context-events",level:2},{value:"Context Observers",id:"context-observers",level:2},{value:"Context Views",id:"context-views",level:2},{value:"Next Steps",id:"next-steps",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"context",children:"Context"})}),"\n",(0,o.jsx)(n.h2,{id:"what-is-context",children:"What is Context?"}),"\n",(0,o.jsx)(n.p,{children:"Context is the core of the Contexify framework. It serves as:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"An abstraction of all state and dependencies in your application"}),"\n",(0,o.jsx)(n.li,{children:"A global registry for anything and everything in your app (configurations, state, dependencies, classes, etc.)"}),"\n",(0,o.jsxs)(n.li,{children:["An ",(0,o.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Inversion_of_control",children:"inversion of control"})," container used to inject dependencies into your code"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"The Context system allows you to manage dependencies in a structured and flexible way, making your application more modular and testable."}),"\n",(0,o.jsx)(n.h2,{id:"context-hierarchy",children:"Context Hierarchy"}),"\n",(0,o.jsx)(n.p,{children:"One of the key features of the Context system is its hierarchical nature. Contexts can be organized in a parent-child relationship, forming a Context chain."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\n// Create a root context\nconst rootContext = new Context('root');\n\n// Create a child context with rootContext as its parent\nconst serverContext = new Context(rootContext, 'server');\n\n// Create another child context\nconst requestContext = new Context(serverContext, 'request');\n"})}),"\n",(0,o.jsx)(n.p,{children:"This hierarchy allows for:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Inheritance"}),": Child contexts inherit bindings from their parent contexts"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Isolation"}),": Changes to a child context don't affect the parent context"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Scoping"}),": Different parts of your application can have their own context with specific bindings"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"context-levels",children:"Context Levels"}),"\n",(0,o.jsx)(n.p,{children:"In a typical application, you'll have three levels of contexts:"}),"\n",(0,o.jsx)(n.h3,{id:"1-application-level-context-global",children:"1. Application-level Context (Global)"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Stores all the initial and modified app states throughout the entire life of the app"}),"\n",(0,o.jsx)(n.li,{children:"Generally configured when the application is created"}),"\n",(0,o.jsx)(n.li,{children:"Serves as the root context for all other contexts"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\n// Create an application class that extends Context\nclass Application extends Context {\n  constructor() {\n    super('application');\n  }\n}\n\n// Create an application instance\nconst app = new Application();\n\n// Register application-wide services\napp.bind('services.ConfigService').toClass(ConfigService);\napp.bind('services.LoggerService').toClass(LoggerService);\n"})}),"\n",(0,o.jsx)(n.h3,{id:"2-server-level-context",children:"2. Server-level Context"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Child of the application-level context"}),"\n",(0,o.jsx)(n.li,{children:"Holds configuration specific to a particular server instance"}),"\n",(0,o.jsx)(n.li,{children:"Useful for multi-server applications where each server might have different configurations"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"// Create a server context\nconst serverContext = new Context(app, 'server');\n\n// Configure server-specific bindings\nserverContext.bind('server.port').to(3000);\nserverContext.bind('server.host').to('localhost');\n"})}),"\n",(0,o.jsx)(n.h3,{id:"3-request-level-context-per-request",children:"3. Request-level Context (Per Request)"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Created for each incoming request"}),"\n",(0,o.jsx)(n.li,{children:"Extends the server-level context"}),"\n",(0,o.jsx)(n.li,{children:"Garbage-collected once the request is completed"}),"\n",(0,o.jsx)(n.li,{children:"Allows for request-specific dependencies and state"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"// For each incoming request\nconst requestContext = new Context(serverContext, 'request');\n\n// Bind request-specific data\nrequestContext.bind('request.body').to(requestBody);\nrequestContext.bind('request.headers').to(requestHeaders);\n"})}),"\n",(0,o.jsx)(n.h2,{id:"creating-and-using-a-context",children:"Creating and Using a Context"}),"\n",(0,o.jsx)(n.p,{children:"Here's a basic example of creating and using a Context:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\n// Create a context\nconst context = new Context('my-context');\n\n// Bind a value to a key\ncontext.bind('greeting').to('Hello, world!');\n\n// Retrieve the value\nasync function run() {\n  const greeting = await context.get('greeting');\n  console.log(greeting); // Output: Hello, world!\n}\n\nrun().catch(err => console.error(err));\n"})}),"\n",(0,o.jsx)(n.h2,{id:"context-events",children:"Context Events"}),"\n",(0,o.jsx)(n.p,{children:"A Context emits events when bindings are added or removed. You can listen to these events to react to changes in the Context."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context('my-context');\n\n// Listen for 'bind' events\ncontext.on('bind', event => {\n  console.log(`Binding added: ${event.binding.key}`);\n});\n\n// Listen for 'unbind' events\ncontext.on('unbind', event => {\n  console.log(`Binding removed: ${event.binding.key}`);\n});\n\n// Add a binding\ncontext.bind('greeting').to('Hello, world!');\n// Output: Binding added: greeting\n\n// Remove a binding\ncontext.unbind('greeting');\n// Output: Binding removed: greeting\n"})}),"\n",(0,o.jsx)(n.h2,{id:"context-observers",children:"Context Observers"}),"\n",(0,o.jsx)(n.p,{children:"For more advanced use cases, you can use Context Observers to react to changes in the Context asynchronously."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import { Context, ContextObserver } from 'contexify';\n\nconst context = new Context('my-context');\n\n// Create an observer\nconst observer: ContextObserver = {\n  // Only interested in bindings with 'service' tag\n  filter: binding => binding.tagMap.service != null,\n\n  observe(event, binding) {\n    if (event === 'bind') {\n      console.log(`Service registered: ${binding.key}`);\n    } else if (event === 'unbind') {\n      console.log(`Service unregistered: ${binding.key}`);\n    }\n  }\n};\n\n// Register the observer\ncontext.subscribe(observer);\n\n// Add a binding with 'service' tag\ncontext.bind('services.UserService')\n  .toClass(UserService)\n  .tag('service');\n// Output: Service registered: services.UserService\n"})}),"\n",(0,o.jsx)(n.h2,{id:"context-views",children:"Context Views"}),"\n",(0,o.jsx)(n.p,{children:"Context Views allow you to track a set of bindings that match a specific filter. This is useful for dynamically tracking extensions or plugins."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context('my-context');\n\n// Create a view that tracks all bindings with 'controller' tag\nconst controllersView = context.createView(\n  binding => binding.tagMap.controller != null\n);\n\n// Get all controller instances\nasync function getControllers() {\n  const controllers = await controllersView.values();\n  return controllers;\n}\n\n// Add a controller\ncontext.bind('controllers.UserController')\n  .toClass(UserController)\n  .tag('controller');\n\n// Now getControllers() will include UserController\n"})}),"\n",(0,o.jsx)(n.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,o.jsx)(n.p,{children:"Now that you understand the Context concept, you can learn about:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"./binding",children:"Binding"})," - How to register and manage dependencies"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"./dependency-injection",children:"Dependency Injection"})," - How to inject dependencies into your classes"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"../api",children:"API Reference"})," - View the detailed API documentation"]}),"\n"]})]})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}}}]);