"use strict";(self.webpackChunk_contexify_docs_site=self.webpackChunk_contexify_docs_site||[]).push([[271],{991:(n,e,i)=>{i.d(e,{R:()=>r,x:()=>o});var t=i(4700);const c={},s=t.createContext(c);function r(n){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:r(n.components),t.createElement(s.Provider,{value:e},n.children)}},9025:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>d,contentTitle:()=>o,default:()=>x,frontMatter:()=>r,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"core-concepts/binding","title":"\u7ed1\u5b9a","description":"Binding","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/core-concepts/binding.md","sourceDirName":"core-concepts","slug":"/core-concepts/binding","permalink":"/contexify/zh/docs/core-concepts/binding","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/core-concepts/binding.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"\u4e0a\u4e0b\u6587","permalink":"/contexify/zh/docs/core-concepts/context"},"next":{"title":"\u4f9d\u8d56\u6ce8\u5165","permalink":"/contexify/zh/docs/core-concepts/dependency-injection"}}');var c=i(7968),s=i(991);const r={sidebar_position:2},o="\u7ed1\u5b9a",d={},l=[{value:"Binding",id:"binding",level:2},{value:"\u4ec0\u4e48\u662f Binding\uff1f",id:"\u4ec0\u4e48\u662f-binding",level:2},{value:"\u7ed1\u5b9a\u952e",id:"\u7ed1\u5b9a\u952e",level:2},{value:"\u547d\u540d\u7ea6\u5b9a",id:"\u547d\u540d\u7ea6\u5b9a",level:3},{value:"\u7ed1\u5b9a\u7c7b\u578b",id:"\u7ed1\u5b9a\u7c7b\u578b",level:2},{value:"\u503c\u7ed1\u5b9a",id:"\u503c\u7ed1\u5b9a",level:3},{value:"\u7c7b\u7ed1\u5b9a",id:"\u7c7b\u7ed1\u5b9a",level:3},{value:"\u5de5\u5382\u51fd\u6570\u7ed1\u5b9a",id:"\u5de5\u5382\u51fd\u6570\u7ed1\u5b9a",level:3},{value:"\u63d0\u4f9b\u8005\u7ed1\u5b9a",id:"\u63d0\u4f9b\u8005\u7ed1\u5b9a",level:3},{value:"\u7ed1\u5b9a\u4f5c\u7528\u57df",id:"\u7ed1\u5b9a\u4f5c\u7528\u57df",level:2},{value:"\u4f5c\u7528\u57df\u6307\u5357",id:"\u4f5c\u7528\u57df\u6307\u5357",level:3},{value:"\u7ed1\u5b9a\u6807\u7b7e",id:"\u7ed1\u5b9a\u6807\u7b7e",level:2},{value:"\u7ed1\u5b9a\u914d\u7f6e",id:"\u7ed1\u5b9a\u914d\u7f6e",level:2},{value:"\u521b\u5efa\u548c\u7ba1\u7406\u7ed1\u5b9a",id:"\u521b\u5efa\u548c\u7ba1\u7406\u7ed1\u5b9a",level:2},{value:"\u6dfb\u52a0\u7ed1\u5b9a",id:"\u6dfb\u52a0\u7ed1\u5b9a",level:3},{value:"\u79fb\u9664\u7ed1\u5b9a",id:"\u79fb\u9664\u7ed1\u5b9a",level:3},{value:"\u68c0\u67e5\u7ed1\u5b9a\u662f\u5426\u5b58\u5728",id:"\u68c0\u67e5\u7ed1\u5b9a\u662f\u5426\u5b58\u5728",level:3},{value:"\u67e5\u627e\u7ed1\u5b9a",id:"\u67e5\u627e\u7ed1\u5b9a",level:3},{value:"\u4e0b\u4e00\u6b65",id:"\u4e0b\u4e00\u6b65",level:2}];function a(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...n.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e.header,{children:(0,c.jsx)(e.h1,{id:"\u7ed1\u5b9a",children:"\u7ed1\u5b9a"})}),"\n",(0,c.jsx)(e.h2,{id:"binding",children:"Binding"}),"\n",(0,c.jsx)(e.h2,{id:"\u4ec0\u4e48\u662f-binding",children:"\u4ec0\u4e48\u662f Binding\uff1f"}),"\n",(0,c.jsx)(e.p,{children:"Binding \u662f Context \u4e2d\u952e\u548c\u503c\u4e4b\u95f4\u7684\u8fde\u63a5\u3002\u5b83\u662f Contexify \u4e2d\u4f9d\u8d56\u6ce8\u5165\u7cfb\u7edf\u7684\u57fa\u672c\u6784\u5efa\u5757\u3002"}),"\n",(0,c.jsx)(e.p,{children:"\u7ed1\u5b9a\u5141\u8bb8\u60a8\uff1a"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"\u5728 Context \u4e2d\u6ce8\u518c\u503c\u3001\u7c7b\u6216\u5de5\u5382\u51fd\u6570"}),"\n",(0,c.jsx)(e.li,{children:"\u63a7\u5236\u4f9d\u8d56\u9879\u7684\u751f\u547d\u5468\u671f"}),"\n",(0,c.jsx)(e.li,{children:"\u4e3a\u53d1\u73b0\u548c\u5206\u7ec4\u6807\u8bb0\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.li,{children:"\u914d\u7f6e\u4f9d\u8d56\u9879\u7684\u89e3\u6790\u65b9\u5f0f"}),"\n"]}),"\n",(0,c.jsx)(e.h2,{id:"\u7ed1\u5b9a\u952e",children:"\u7ed1\u5b9a\u952e"}),"\n",(0,c.jsx)(e.p,{children:"\u7ed1\u5b9a\u952e\u662f\u7528\u4e8e\u5728 Context \u4e2d\u67e5\u627e\u503c\u7684\u552f\u4e00\u6807\u8bc6\u7b26\u3002\u5b83\u4eec\u901a\u5e38\u662f\u9075\u5faa\u547d\u540d\u7ea6\u5b9a\u7684\u5b57\u7b26\u4e32\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context();\n\n// Using a simple string as a binding key\ncontext.bind('greeting').to('Hello, world!');\n\n// Using a namespaced key (recommended)\ncontext.bind('services.UserService').toClass(UserService);\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u547d\u540d\u7ea6\u5b9a",children:"\u547d\u540d\u7ea6\u5b9a"}),"\n",(0,c.jsx)(e.p,{children:"\u5efa\u8bae\u4e3a\u7ed1\u5b9a\u952e\u4f7f\u7528\u4e00\u81f4\u7684\u547d\u540d\u7ea6\u5b9a\u3002\u4ee5\u4e0b\u662f\u4e00\u4e9b\u5e38\u89c1\u6a21\u5f0f\uff1a"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.code,{children:"{namespace}.{name}"}),"\uff1a\u4f7f\u7528\u547d\u540d\u7a7a\u95f4\u548c\u540d\u79f0\uff08\u4f8b\u5982\uff0c",(0,c.jsx)(e.code,{children:"services.UserService"}),"\uff09"]}),"\n",(0,c.jsxs)(e.li,{children:["\u4e3a\u547d\u540d\u7a7a\u95f4\u4f7f\u7528\u590d\u6570\u5f62\u5f0f\uff08\u4f8b\u5982\uff0c",(0,c.jsx)(e.code,{children:"services"}),"\u3001",(0,c.jsx)(e.code,{children:"repositories"}),"\u3001",(0,c.jsx)(e.code,{children:"controllers"}),"\uff09"]}),"\n",(0,c.jsxs)(e.li,{children:["\u5bf9\u4e8e\u914d\u7f6e\uff0c\u4f7f\u7528 ",(0,c.jsx)(e.code,{children:"config.{component}"}),"\uff08\u4f8b\u5982\uff0c",(0,c.jsx)(e.code,{children:"config.api"}),"\uff09"]}),"\n"]}),"\n",(0,c.jsx)(e.h2,{id:"\u7ed1\u5b9a\u7c7b\u578b",children:"\u7ed1\u5b9a\u7c7b\u578b"}),"\n",(0,c.jsx)(e.p,{children:"Contexify \u652f\u6301\u51e0\u79cd\u7c7b\u578b\u7684\u7ed1\u5b9a\uff1a"}),"\n",(0,c.jsx)(e.h3,{id:"\u503c\u7ed1\u5b9a",children:"\u503c\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.p,{children:"\u5c06\u5e38\u91cf\u503c\u7ed1\u5b9a\u5230\u952e\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"// Bind a string\ncontext.bind('greeting').to('Hello, world!');\n\n// Bind a number\ncontext.bind('config.port').to(3000);\n\n// Bind an object\ncontext.bind('config.database').to({\n  host: 'localhost',\n  port: 5432,\n  username: 'admin'\n});\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u7c7b\u7ed1\u5b9a",children:"\u7c7b\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.p,{children:"\u5c06\u7c7b\u6784\u9020\u51fd\u6570\u7ed1\u5b9a\u5230\u952e\u3002\u89e3\u6790\u7ed1\u5b9a\u65f6\uff0c\u5c06\u5b9e\u4f8b\u5316\u8be5\u7c7b\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"import { Context, injectable } from 'contexify';\n\n@injectable()\nclass UserService {\n  getUsers() {\n    return ['user1', 'user2'];\n  }\n}\n\nconst context = new Context();\ncontext.bind('services.UserService').toClass(UserService);\n\n// \u7a0d\u540e\uff0c\u89e3\u6790\u65f6\nconst userService = await context.get('services.UserService');\nconsole.log(userService.getUsers()); // ['user1', 'user2']\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u5de5\u5382\u51fd\u6570\u7ed1\u5b9a",children:"\u5de5\u5382\u51fd\u6570\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.p,{children:"\u7ed1\u5b9a\u4e00\u4e2a\u5728\u89e3\u6790\u7ed1\u5b9a\u65f6\u521b\u5efa\u503c\u7684\u5de5\u5382\u51fd\u6570\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"context.bind('services.DbConnection').toDynamicValue(() => {\n  // This function is called when the binding is resolved\n  return createDbConnection();\n});\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u63d0\u4f9b\u8005\u7ed1\u5b9a",children:"\u63d0\u4f9b\u8005\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.p,{children:"\u7ed1\u5b9a\u4e00\u4e2a\u5728\u89e3\u6790\u7ed1\u5b9a\u65f6\u521b\u5efa\u503c\u7684\u63d0\u4f9b\u8005\u7c7b\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"import { Context, Provider, injectable } from 'contexify';\n\n@injectable()\nclass DbConnectionProvider implements Provider<DbConnection> {\n  constructor(@inject('config.database') private config: DbConfig) {}\n\n  value() {\n    // This method is called when the binding is resolved\n    return createDbConnection(this.config);\n  }\n}\n\ncontext.bind('services.DbConnection').toProvider(DbConnectionProvider);\n"})}),"\n",(0,c.jsx)(e.h2,{id:"\u7ed1\u5b9a\u4f5c\u7528\u57df",children:"\u7ed1\u5b9a\u4f5c\u7528\u57df"}),"\n",(0,c.jsx)(e.p,{children:"\u7ed1\u5b9a\u4f5c\u7528\u57df\u63a7\u5236\u89e3\u6790\u503c\u7684\u751f\u547d\u5468\u671f\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"import { Context, BindingScope } from 'contexify';\n\nconst context = new Context();\n\n// Singleton: One instance for the entire application\ncontext\n  .bind('services.ConfigService')\n  .toClass(ConfigService)\n  .inScope(BindingScope.SINGLETON);\n\n// \u77ac\u6001\uff1a\u6bcf\u6b21\u89e3\u6790\u65f6\u65b0\u5b9e\u4f8b\ncontext\n  .bind('services.RequestHandler')\n  .toClass(RequestHandler)\n  .inScope(BindingScope.TRANSIENT);\n\n// Context: One instance per context\ncontext\n  .bind('services.CacheService')\n  .toClass(CacheService)\n  .inScope(BindingScope.CONTEXT);\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u4f5c\u7528\u57df\u6307\u5357",children:"\u4f5c\u7528\u57df\u6307\u5357"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.strong,{children:"SINGLETON"}),"\uff1a\u7528\u4e8e\u5177\u6709\u5171\u4eab\u72b6\u6001\u7684\u670d\u52a1\uff08\u914d\u7f6e\u3001\u6570\u636e\u5e93\u8fde\u63a5\uff09"]}),"\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.strong,{children:"TRANSIENT"}),"\uff1a\u7528\u4e8e\u6bcf\u6b21\u4f7f\u7528\u65f6\u9700\u8981\u65b0\u5b9e\u4f8b\u7684\u7ec4\u4ef6"]}),"\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.strong,{children:"CONTEXT"}),"\uff1a\u7528\u4e8e\u5728\u7279\u5b9a\u4e0a\u4e0b\u6587\u4e2d\u5171\u4eab\u7684\u7ec4\u4ef6"]}),"\n"]}),"\n",(0,c.jsx)(e.h2,{id:"\u7ed1\u5b9a\u6807\u7b7e",children:"\u7ed1\u5b9a\u6807\u7b7e"}),"\n",(0,c.jsx)(e.p,{children:"\u6807\u7b7e\u5141\u8bb8\u60a8\u5bf9\u7ed1\u5b9a\u8fdb\u884c\u5206\u7c7b\u548c\u53d1\u73b0\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context();\n\n// Add tags to a binding\ncontext\n  .bind('controllers.UserController')\n  .toClass(UserController)\n  .tag('controller', 'rest');\n\n// Find bindings by tag\nasync function findControllers() {\n  const controllerBindings = await context.findByTag('controller');\n  return controllerBindings;\n}\n"})}),"\n",(0,c.jsx)(e.h2,{id:"\u7ed1\u5b9a\u914d\u7f6e",children:"\u7ed1\u5b9a\u914d\u7f6e"}),"\n",(0,c.jsx)(e.p,{children:"\u60a8\u53ef\u4ee5\u4f7f\u7528\u5176\u4ed6\u5143\u6570\u636e\u914d\u7f6e\u7ed1\u5b9a\u3002"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context();\n\n// Configure a binding\ncontext\n  .bind('services.EmailService')\n  .toClass(EmailService)\n  .tag('service')\n  .inScope(BindingScope.SINGLETON)\n  .configure(binding => {\n    binding.description = 'Email service for sending notifications';\n  });\n"})}),"\n",(0,c.jsx)(e.h2,{id:"\u521b\u5efa\u548c\u7ba1\u7406\u7ed1\u5b9a",children:"\u521b\u5efa\u548c\u7ba1\u7406\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.h3,{id:"\u6dfb\u52a0\u7ed1\u5b9a",children:"\u6dfb\u52a0\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"import { Context, Binding } from 'contexify';\n\nconst context = new Context();\n\n// Using the bind method\ncontext.bind('greeting').to('Hello, world!');\n\n// Creating a binding first and then adding it\nconst binding = Binding.create('services.UserService')\n  .toClass(UserService)\n  .tag('service');\n\ncontext.add(binding);\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u79fb\u9664\u7ed1\u5b9a",children:"\u79fb\u9664\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"// Remove a binding\ncontext.unbind('greeting');\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u68c0\u67e5\u7ed1\u5b9a\u662f\u5426\u5b58\u5728",children:"\u68c0\u67e5\u7ed1\u5b9a\u662f\u5426\u5b58\u5728"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"// Check if a binding exists\nconst exists = context.contains('greeting');\nconsole.log(exists); // true or false\n"})}),"\n",(0,c.jsx)(e.h3,{id:"\u67e5\u627e\u7ed1\u5b9a",children:"\u67e5\u627e\u7ed1\u5b9a"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-typescript",children:"// Find bindings by tag\nconst serviceBindings = await context.findByTag('service');\n\n// Find bindings by key pattern\nconst userBindings = await context.find(/^services\\.User/);\n"})}),"\n",(0,c.jsx)(e.h2,{id:"\u4e0b\u4e00\u6b65",children:"\u4e0b\u4e00\u6b65"}),"\n",(0,c.jsx)(e.p,{children:"\u73b0\u5728\u60a8\u5df2\u7ecf\u4e86\u89e3\u4e86\u7ed1\u5b9a\uff0c\u53ef\u4ee5\u4e86\u89e3\uff1a"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.a,{href:"./dependency-injection",children:"\u4f9d\u8d56\u6ce8\u5165"})," - \u5982\u4f55\u5c06\u4f9d\u8d56\u9879\u6ce8\u5165\u5230\u7c7b\u4e2d"]}),"\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.a,{href:"./context",children:"Context"})," - \u7ed1\u5b9a\u7684\u5bb9\u5668"]}),"\n",(0,c.jsxs)(e.li,{children:[(0,c.jsx)(e.a,{href:"../api",children:"API \u53c2\u8003"})," - \u67e5\u770b\u8be6\u7ec6\u7684 API \u6587\u6863"]}),"\n"]})]})}function x(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(a,{...n})}):a(n)}}}]);