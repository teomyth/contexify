"use strict";(self.webpackChunkdocs_site=self.webpackChunkdocs_site||[]).push([[976],{991:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>o});var i=t(4700);const s={},r=i.createContext(s);function c(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(r.Provider,{value:n},e.children)}},6120:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>p,frontMatter:()=>c,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"intro","title":"Getting Started","description":"Welcome to Contexify, a powerful TypeScript dependency injection container with context-based IoC capabilities.","source":"@site/docs/intro.md","sourceDirName":".","slug":"/intro","permalink":"/contexify/docs/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/intro.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","next":{"title":"Core Concepts","permalink":"/contexify/docs/category/core-concepts"}}');var s=t(7968),r=t(991);const c={sidebar_position:1},o="Getting Started",a={},l=[{value:"Installation",id:"installation",level:2},{value:"Basic Usage",id:"basic-usage",level:2},{value:"Core Concepts",id:"core-concepts",level:2},{value:"Context",id:"context",level:3},{value:"Binding",id:"binding",level:3},{value:"Dependency Injection",id:"dependency-injection",level:3},{value:"Next Steps",id:"next-steps",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"getting-started",children:"Getting Started"})}),"\n",(0,s.jsxs)(n.p,{children:["Welcome to ",(0,s.jsx)(n.strong,{children:"Contexify"}),", a powerful TypeScript dependency injection container with context-based IoC capabilities."]}),"\n",(0,s.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(n.p,{children:"Install Contexify using your favorite package manager:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# Using npm\nnpm install contexify\n\n# Using yarn\nyarn add contexify\n\n# Using pnpm\npnpm add contexify\n"})}),"\n",(0,s.jsx)(n.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,s.jsx)(n.p,{children:"Here's a simple example demonstrating the basic usage of Contexify:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import { Context, injectable, inject } from 'contexify';\n\n// Create a context\nconst context = new Context('application');\n\n// Define a service\n@injectable()\nclass LoggerService {\n  log(message: string) {\n    console.log(`[LOG] ${message}`);\n  }\n}\n\n// Define a service that depends on the logger\n@injectable()\nclass UserService {\n  constructor(@inject('services.LoggerService') private logger: LoggerService) {}\n\n  createUser(name: string) {\n    this.logger.log(`Creating user: ${name}`);\n    return { id: Date.now().toString(), name };\n  }\n}\n\n// Bind the services to the context\ncontext.bind('services.LoggerService').toClass(LoggerService);\ncontext.bind('services.UserService').toClass(UserService);\n\n// Use the services\nasync function run() {\n  // Resolve the UserService from the context\n  const userService = await context.get<UserService>('services.UserService');\n\n  // Create a user\n  const user = userService.createUser('John');\n  console.log('Created user:', user);\n}\n\nrun().catch(err => console.error(err));\n"})}),"\n",(0,s.jsx)(n.h2,{id:"core-concepts",children:"Core Concepts"}),"\n",(0,s.jsx)(n.h3,{id:"context",children:"Context"}),"\n",(0,s.jsx)(n.p,{children:"Context is the core of Contexify. It serves as a registry for dependencies, allowing you to manage all dependencies in your application."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Create a root context\nconst rootContext = new Context('root');\n\n// Create a child context\nconst childContext = new Context(rootContext, 'child');\n"})}),"\n",(0,s.jsx)(n.h3,{id:"binding",children:"Binding"}),"\n",(0,s.jsx)(n.p,{children:"Bindings connect keys to values, classes, or factory functions."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Bind a value\ncontext.bind('config.port').to(3000);\n\n// Bind a class\ncontext.bind('services.UserService').toClass(UserService);\n\n// Bind a factory function\ncontext.bind('services.DbConnection').toDynamicValue(() => {\n  return createDbConnection();\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"dependency-injection",children:"Dependency Injection"}),"\n",(0,s.jsxs)(n.p,{children:["Contexify supports constructor injection using the ",(0,s.jsx)(n.code,{children:"@inject"})," decorator."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"@injectable()\nclass UserController {\n  constructor(\n    @inject('services.UserService') private userService: UserService,\n    @inject('config.apiKey') private apiKey: string\n  ) {}\n\n  async getUser(id: string) {\n    // Use the injected dependencies\n    return this.userService.findById(id);\n  }\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,s.jsx)(n.p,{children:"Now that you have a basic understanding of Contexify, you can explore more advanced features:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"./category/core-concepts",children:"Core Concepts"})," - Learn about the fundamental concepts of Contexify"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"./api",children:"API Reference"})," - View the detailed API documentation"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"./category/examples",children:"Examples"})," - See examples of Contexify in action"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}}}]);