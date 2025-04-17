"use strict";(self.webpackChunk_contexify_docs_site=self.webpackChunk_contexify_docs_site||[]).push([[596],{991:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>l});var r=s(4700);const i={},c=r.createContext(i);function t(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(c.Provider,{value:n},e.children)}},4605:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>g,frontMatter:()=>t,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"examples/basic-example","title":"\u57fa\u672c\u793a\u4f8b","description":"\u672c\u793a\u4f8b\u5c55\u793a\u4e86 Contexify \u7684\u57fa\u672c\u7528\u6cd5\uff0c\u5305\u62ec\u521b\u5efa\u4e0a\u4e0b\u6587\u3001\u7ed1\u5b9a\u670d\u52a1\u548c\u4f7f\u7528\u4f9d\u8d56\u6ce8\u5165\u3002","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/examples/basic-example.md","sourceDirName":"examples","slug":"/examples/basic-example","permalink":"/contexify/zh/docs/examples/basic-example","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/examples/basic-example.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Examples","permalink":"/contexify/zh/docs/category/examples"},"next":{"title":"\u529f\u80fd\u793a\u4f8b","permalink":"/contexify/zh/docs/examples/features"}}');var i=s(7968),c=s(991);const t={sidebar_position:1},l="\u57fa\u672c\u793a\u4f8b",o={},a=[{value:"\u5b8c\u6574\u793a\u4f8b",id:"\u5b8c\u6574\u793a\u4f8b",level:2},{value:"\u9010\u6b65\u89e3\u91ca",id:"\u9010\u6b65\u89e3\u91ca",level:2},{value:"1. \u5b9a\u4e49\u63a5\u53e3",id:"1-\u5b9a\u4e49\u63a5\u53e3",level:3},{value:"2. \u5b9e\u73b0\u670d\u52a1",id:"2-\u5b9e\u73b0\u670d\u52a1",level:3},{value:"3. \u521b\u5efa\u4e0a\u4e0b\u6587",id:"3-\u521b\u5efa\u4e0a\u4e0b\u6587",level:3},{value:"4. \u7ed1\u5b9a\u670d\u52a1",id:"4-\u7ed1\u5b9a\u670d\u52a1",level:3},{value:"5. \u4f7f\u7528\u670d\u52a1",id:"5-\u4f7f\u7528\u670d\u52a1",level:3},{value:"\u5173\u952e\u70b9",id:"\u5173\u952e\u70b9",level:2},{value:"\u4e0b\u4e00\u6b65",id:"\u4e0b\u4e00\u6b65",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"\u57fa\u672c\u793a\u4f8b",children:"\u57fa\u672c\u793a\u4f8b"})}),"\n",(0,i.jsx)(n.p,{children:"\u672c\u793a\u4f8b\u5c55\u793a\u4e86 Contexify \u7684\u57fa\u672c\u7528\u6cd5\uff0c\u5305\u62ec\u521b\u5efa\u4e0a\u4e0b\u6587\u3001\u7ed1\u5b9a\u670d\u52a1\u548c\u4f7f\u7528\u4f9d\u8d56\u6ce8\u5165\u3002"}),"\n",(0,i.jsx)(n.h2,{id:"\u5b8c\u6574\u793a\u4f8b",children:"\u5b8c\u6574\u793a\u4f8b"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Context, injectable, inject } from 'contexify';\n\n// Define interfaces\ninterface Logger {\n  log(message: string): void;\n}\n\ninterface UserService {\n  createUser(name: string): Promise<User>;\n}\n\ninterface User {\n  id: string;\n  name: string;\n}\n\n// Implement services\n@injectable()\nclass ConsoleLogger implements Logger {\n  log(message: string) {\n    console.log(`[LOG] ${message}`);\n  }\n}\n\n@injectable()\nclass DefaultUserService implements UserService {\n  constructor(@inject('services.Logger') private logger: Logger) {}\n\n  async createUser(name: string): Promise<User> {\n    this.logger.log(`Creating user: ${name}`);\n    return { id: Date.now().toString(), name };\n  }\n}\n\n// Create a context\nconst context = new Context('application');\n\n// Bind services\ncontext.bind('services.Logger').toClass(ConsoleLogger);\ncontext.bind('services.UserService').toClass(DefaultUserService);\n\n// Use services\nasync function run() {\n  const userService = await context.get<UserService>('services.UserService');\n  const user = await userService.createUser('John Doe');\n  console.log('Created user:', user);\n}\n\nrun().catch(err => console.error(err));\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u9010\u6b65\u89e3\u91ca",children:"\u9010\u6b65\u89e3\u91ca"}),"\n",(0,i.jsx)(n.h3,{id:"1-\u5b9a\u4e49\u63a5\u53e3",children:"1. \u5b9a\u4e49\u63a5\u53e3"}),"\n",(0,i.jsx)(n.p,{children:"\u9996\u5148\uff0c\u6211\u4eec\u5b9a\u4e49\u4e86\u670d\u52a1\u7684\u63a5\u53e3\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"interface Logger {\n  log(message: string): void;\n}\n\ninterface UserService {\n  createUser(name: string): Promise<User>;\n}\n\ninterface User {\n  id: string;\n  name: string;\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u5b9a\u4e49\u63a5\u53e3\u6709\u52a9\u4e8e\u5b9e\u73b0\u677e\u8026\u5408\u548c\u66f4\u597d\u7684\u53ef\u6d4b\u8bd5\u6027\u3002"}),"\n",(0,i.jsx)(n.h3,{id:"2-\u5b9e\u73b0\u670d\u52a1",children:"2. \u5b9e\u73b0\u670d\u52a1"}),"\n",(0,i.jsx)(n.p,{children:"\u63a5\u4e0b\u6765\uff0c\u6211\u4eec\u5b9e\u73b0\u4e86\u670d\u52a1\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"@injectable()\nclass ConsoleLogger implements Logger {\n  log(message: string) {\n    console.log(`[LOG] ${message}`);\n  }\n}\n\n@injectable()\nclass DefaultUserService implements UserService {\n  constructor(@inject('services.Logger') private logger: Logger) {}\n\n  async createUser(name: string): Promise<User> {\n    this.logger.log(`Creating user: ${name}`);\n    return { id: Date.now().toString(), name };\n  }\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u6ce8\u610f\uff1a"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"@injectable()"})," \u88c5\u9970\u5668\u6807\u8bb0\u7c7b\u4e3a\u53ef\u6ce8\u5165"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"@inject('services.Logger')"})," \u88c5\u9970\u5668\u6ce8\u5165 Logger \u670d\u52a1"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"3-\u521b\u5efa\u4e0a\u4e0b\u6587",children:"3. \u521b\u5efa\u4e0a\u4e0b\u6587"}),"\n",(0,i.jsx)(n.p,{children:"\u7136\u540e\uff0c\u6211\u4eec\u521b\u5efa\u4e00\u4e2a\u4e0a\u4e0b\u6587\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const context = new Context('application');\n"})}),"\n",(0,i.jsx)(n.h3,{id:"4-\u7ed1\u5b9a\u670d\u52a1",children:"4. \u7ed1\u5b9a\u670d\u52a1"}),"\n",(0,i.jsx)(n.p,{children:"\u6211\u4eec\u5c06\u670d\u52a1\u7ed1\u5b9a\u5230\u4e0a\u4e0b\u6587\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"context.bind('services.Logger').toClass(ConsoleLogger);\ncontext.bind('services.UserService').toClass(DefaultUserService);\n"})}),"\n",(0,i.jsx)(n.h3,{id:"5-\u4f7f\u7528\u670d\u52a1",children:"5. \u4f7f\u7528\u670d\u52a1"}),"\n",(0,i.jsx)(n.p,{children:"\u6700\u540e\uff0c\u6211\u4eec\u4ece\u4e0a\u4e0b\u6587\u4e2d\u83b7\u53d6\u670d\u52a1\u5e76\u4f7f\u7528\u5b83\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"async function run() {\n  const userService = await context.get<UserService>('services.UserService');\n  const user = await userService.createUser('John Doe');\n  console.log('Created user:', user);\n}\n\nrun().catch(err => console.error(err));\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5173\u952e\u70b9",children:"\u5173\u952e\u70b9"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u4f9d\u8d56\u6ce8\u5165"}),"\uff1a",(0,i.jsx)(n.code,{children:"UserService"})," \u901a\u8fc7\u6784\u9020\u51fd\u6570\u6ce8\u5165\u4f9d\u8d56\u4e8e ",(0,i.jsx)(n.code,{children:"Logger"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u63a7\u5236\u53cd\u8f6c"}),"\uff1a\u670d\u52a1\u7684\u521b\u5efa\u548c\u751f\u547d\u5468\u671f\u7531 Context \u7ba1\u7406"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"\u677e\u8026\u5408"}),"\uff1a\u670d\u52a1\u901a\u8fc7\u63a5\u53e3\u800c\u4e0d\u662f\u5177\u4f53\u5b9e\u73b0\u8fdb\u884c\u4ea4\u4e92"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u4e0b\u4e00\u6b65",children:"\u4e0b\u4e00\u6b65"}),"\n",(0,i.jsx)(n.p,{children:"\u67e5\u770b\u66f4\u591a\u9ad8\u7ea7\u793a\u4f8b\uff1a"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"./modular-app",children:"\u6a21\u5757\u5316\u5e94\u7528\u7a0b\u5e8f"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"./interceptors",children:"\u62e6\u622a\u5668"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"./observers",children:"\u89c2\u5bdf\u8005\u548c\u4e8b\u4ef6"})}),"\n"]})]})}function g(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);