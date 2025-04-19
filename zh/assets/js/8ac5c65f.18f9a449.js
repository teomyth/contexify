"use strict";(self.webpackChunk_contexify_docs_site=self.webpackChunk_contexify_docs_site||[]).push([[960],{991:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var r=t(4700);const i={},o=r.createContext(i);function s(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:n},e.children)}},2622:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>a,frontMatter:()=>s,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"core-concepts/observers","title":"\u89c2\u5bdf\u8005\u548c\u4e8b\u4ef6","description":"Observers and Events","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/core-concepts/observers.md","sourceDirName":"core-concepts","slug":"/core-concepts/observers","permalink":"/contexify/zh/docs/core-concepts/observers","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/core-concepts/observers.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5},"sidebar":"tutorialSidebar","previous":{"title":"\u62e6\u622a\u5668","permalink":"/contexify/zh/docs/core-concepts/interceptors"},"next":{"title":"Guides","permalink":"/contexify/zh/docs/category/guides"}}');var i=t(7968),o=t(991);const s={sidebar_position:5},c="\u89c2\u5bdf\u8005\u548c\u4e8b\u4ef6",l={},d=[{value:"Observers and Events",id:"observers-and-events",level:2},{value:"\u4ec0\u4e48\u662f Context \u4e8b\u4ef6\uff1f",id:"\u4ec0\u4e48\u662f-context-\u4e8b\u4ef6",level:2},{value:"Context \u4e8b\u4ef6\u76d1\u542c\u5668",id:"context-\u4e8b\u4ef6\u76d1\u542c\u5668",level:2},{value:"\u4ec0\u4e48\u662f Context \u89c2\u5bdf\u8005\uff1f",id:"\u4ec0\u4e48\u662f-context-\u89c2\u5bdf\u8005",level:2},{value:"\u521b\u5efa\u548c\u4f7f\u7528 Context \u89c2\u5bdf\u8005",id:"\u521b\u5efa\u548c\u4f7f\u7528-context-\u89c2\u5bdf\u8005",level:2},{value:"\u89c2\u5bdf\u8005\u51fd\u6570",id:"\u89c2\u5bdf\u8005\u51fd\u6570",level:2},{value:"Context \u89c6\u56fe",id:"context-\u89c6\u56fe",level:2},{value:"Context \u89c6\u56fe\u4e8b\u4ef6",id:"context-\u89c6\u56fe\u4e8b\u4ef6",level:3},{value:"\u89c2\u5bdf\u8005\u9519\u8bef\u5904\u7406",id:"\u89c2\u5bdf\u8005\u9519\u8bef\u5904\u7406",level:2},{value:"\u6700\u4f73\u5b9e\u8df5",id:"\u6700\u4f73\u5b9e\u8df5",level:2},{value:"\u4e0b\u4e00\u6b65",id:"\u4e0b\u4e00\u6b65",level:2}];function x(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"\u89c2\u5bdf\u8005\u548c\u4e8b\u4ef6",children:"\u89c2\u5bdf\u8005\u548c\u4e8b\u4ef6"})}),"\n",(0,i.jsx)(n.h2,{id:"observers-and-events",children:"Observers and Events"}),"\n",(0,i.jsx)(n.h2,{id:"\u4ec0\u4e48\u662f-context-\u4e8b\u4ef6",children:"\u4ec0\u4e48\u662f Context \u4e8b\u4ef6\uff1f"}),"\n",(0,i.jsx)(n.p,{children:"Context \u4e8b\u4ef6\u662f\u5f53\u7ed1\u5b9a\u88ab\u6dfb\u52a0\u6216\u79fb\u9664\u65f6\u7531 Context \u53d1\u51fa\u7684\u901a\u77e5\u3002\u8fd9\u4e9b\u4e8b\u4ef6\u5141\u8bb8\u60a8\u5bf9 Context \u4e2d\u7684\u53d8\u5316\u505a\u51fa\u53cd\u5e94\uff0c\u4f8b\u5982\u5f53\u65b0\u670d\u52a1\u88ab\u6ce8\u518c\u6216\u914d\u7f6e\u88ab\u66f4\u65b0\u65f6\u3002"}),"\n",(0,i.jsx)(n.p,{children:"Context \u53d1\u51fa\u4ee5\u4e0b\u4e8b\u4ef6\uff1a"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"bind"}),"\uff1a\u5f53\u65b0\u7ed1\u5b9a\u6dfb\u52a0\u5230\u4e0a\u4e0b\u6587\u65f6\u53d1\u51fa"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"unbind"}),"\uff1a\u5f53\u73b0\u6709\u7ed1\u5b9a\u4ece\u4e0a\u4e0b\u6587\u4e2d\u79fb\u9664\u65f6\u53d1\u51fa"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"error"}),"\uff1a\u5f53\u89c2\u5bdf\u8005\u5728\u901a\u77e5\u8fc7\u7a0b\u4e2d\u629b\u51fa\u9519\u8bef\u65f6\u53d1\u51fa"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"context-\u4e8b\u4ef6\u76d1\u542c\u5668",children:"Context \u4e8b\u4ef6\u76d1\u542c\u5668"}),"\n",(0,i.jsx)(n.p,{children:"\u60a8\u53ef\u4ee5\u4f7f\u7528\u6807\u51c6\u7684\u4e8b\u4ef6\u53d1\u5c04\u5668\u6a21\u5f0f\u76d1\u542c\u4e0a\u4e0b\u6587\u4e8b\u4ef6\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context('my-context');\n\n// Listen for 'bind' events\ncontext.on('bind', event => {\n  console.log(`Binding added: ${event.binding.key}`);\n});\n\n// Listen for 'unbind' events\ncontext.on('unbind', event => {\n  console.log(`Binding removed: ${event.binding.key}`);\n});\n\n// Add a binding\ncontext.bind('greeting').to('Hello, world!');\n// Output: Binding added: greeting\n\n// Remove a binding\ncontext.unbind('greeting');\n// Output: Binding removed: greeting\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u4ec0\u4e48\u662f-context-\u89c2\u5bdf\u8005",children:"\u4ec0\u4e48\u662f Context \u89c2\u5bdf\u8005\uff1f"}),"\n",(0,i.jsx)(n.p,{children:"Context \u89c2\u5bdf\u8005\u63d0\u4f9b\u4e86\u4e00\u79cd\u66f4\u7ed3\u6784\u5316\u7684\u65b9\u5f0f\u6765\u54cd\u5e94\u4e0a\u4e0b\u6587\u4e8b\u4ef6\u3002\u4e0e\u4e8b\u4ef6\u76d1\u542c\u5668\u4e0d\u540c\uff0c\u89c2\u5bdf\u8005\uff1a"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u53ef\u4ee5\u8fc7\u6ee4\u5b83\u4eec\u611f\u5174\u8da3\u7684\u7ed1\u5b9a"}),"\n",(0,i.jsx)(n.li,{children:"\u53ef\u4ee5\u6267\u884c\u5f02\u6b65\u64cd\u4f5c"}),"\n",(0,i.jsx)(n.li,{children:"\u4ee5\u53d7\u63a7\u65b9\u5f0f\u63a5\u6536\u901a\u77e5"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["\u4e0a\u4e0b\u6587\u89c2\u5bdf\u8005\u662f\u5b9e\u73b0 ",(0,i.jsx)(n.code,{children:"ContextObserver"})," \u63a5\u53e3\u7684\u5bf9\u8c61\uff1a"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"interface ContextObserver {\n  // An optional filter function to match bindings\n  filter?: BindingFilter;\n\n  // Listen on 'bind', 'unbind', or other events\n  observe(eventType: string, binding: Readonly<Binding<unknown>>, context: Context): ValueOrPromise<void>;\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u521b\u5efa\u548c\u4f7f\u7528-context-\u89c2\u5bdf\u8005",children:"\u521b\u5efa\u548c\u4f7f\u7528 Context \u89c2\u5bdf\u8005"}),"\n",(0,i.jsx)(n.p,{children:"\u4ee5\u4e0b\u662f\u521b\u5efa\u548c\u4f7f\u7528\u4e0a\u4e0b\u6587\u89c2\u5bdf\u8005\u7684\u793a\u4f8b\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Context, ContextObserver } from 'contexify';\n\nconst context = new Context('my-context');\n\n// Create an observer\nconst serviceObserver: ContextObserver = {\n  // Only interested in bindings with 'service' tag\n  filter: binding => binding.tagMap.service != null,\n\n  observe(event, binding, ctx) {\n    if (event === 'bind') {\n      console.log(`Service registered: ${binding.key}`);\n      // You can perform async operations here\n      return registerServiceWithRegistry(binding.key);\n    } else if (event === 'unbind') {\n      console.log(`Service unregistered: ${binding.key}`);\n      return unregisterServiceFromRegistry(binding.key);\n    }\n  }\n};\n\n// Register the observer\ncontext.subscribe(serviceObserver);\n\n// Add a binding with 'service' tag\ncontext.bind('services.UserService')\n  .toClass(UserService)\n  .tag('service');\n// Output: Service registered: services.UserService\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u89c2\u5bdf\u8005\u51fd\u6570",children:"\u89c2\u5bdf\u8005\u51fd\u6570"}),"\n",(0,i.jsx)(n.p,{children:"\u5982\u679c\u60a8\u4e0d\u9700\u8981\u8fc7\u6ee4\u529f\u80fd\uff0c\u53ef\u4ee5\u4f7f\u7528\u7b80\u5355\u7684\u51fd\u6570\u4f5c\u4e3a\u89c2\u5bdf\u8005\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context('my-context');\n\n// Create an observer function\nconst observerFn = (event, binding, ctx) => {\n  console.log(`Event: ${event}, Binding: ${binding.key}`);\n};\n\n// Register the observer function\ncontext.subscribe(observerFn);\n"})}),"\n",(0,i.jsx)(n.h2,{id:"context-\u89c6\u56fe",children:"Context \u89c6\u56fe"}),"\n",(0,i.jsx)(n.p,{children:"Context \u89c6\u56fe\u662f\u5efa\u7acb\u5728\u89c2\u5bdf\u8005\u4e4b\u4e0a\u7684\u66f4\u9ad8\u7ea7\u62bd\u8c61\u3002\u5b83\u4eec\u5141\u8bb8\u60a8\u8ddf\u8e2a\u5339\u914d\u7279\u5b9a\u8fc7\u6ee4\u5668\u7684\u4e00\u7ec4\u7ed1\u5b9a\u5e76\u83b7\u53d6\u5176\u89e3\u6790\u503c\u3002"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context('my-context');\n\n// Create a view that tracks all bindings with 'controller' tag\nconst controllersView = context.createView(\n  binding => binding.tagMap.controller != null\n);\n\n// Get all controller instances\nasync function getControllers() {\n  const controllers = await controllersView.values();\n  return controllers;\n}\n\n// Add a controller\ncontext.bind('controllers.UserController')\n  .toClass(UserController)\n  .tag('controller');\n\n// Now getControllers() will include UserController\n"})}),"\n",(0,i.jsx)(n.h3,{id:"context-\u89c6\u56fe\u4e8b\u4ef6",children:"Context \u89c6\u56fe\u4e8b\u4ef6"}),"\n",(0,i.jsx)(n.p,{children:"\u5f53\u7ed1\u5b9a\u4ece\u89c6\u56fe\u4e2d\u6dfb\u52a0\u6216\u79fb\u9664\u65f6\uff0cContext \u89c6\u56fe\u4f1a\u53d1\u51fa\u4e8b\u4ef6\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Context } from 'contexify';\n\nconst context = new Context('my-context');\nconst controllersView = context.createView(\n  binding => binding.tagMap.controller != null\n);\n\n// Listen for 'refresh' events\ncontrollersView.on('refresh', () => {\n  console.log('Controllers view refreshed');\n});\n\n// Listen for 'resolve' events\ncontrollersView.on('resolve', () => {\n  console.log('Controllers view resolved');\n});\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u89c2\u5bdf\u8005\u9519\u8bef\u5904\u7406",children:"\u89c2\u5bdf\u8005\u9519\u8bef\u5904\u7406"}),"\n",(0,i.jsx)(n.p,{children:"\u4e0a\u4e0b\u6587\u89c2\u5bdf\u8005\u629b\u51fa\u7684\u9519\u8bef\u901a\u8fc7\u4e0a\u4e0b\u6587\u94fe\u62a5\u544a\uff1a"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5982\u679c\u94fe\u4e2d\u7684\u4efb\u4f55\u4e0a\u4e0b\u6587\u6709 ",(0,i.jsx)(n.code,{children:"error"})," \u76d1\u542c\u5668\uff0c\u5219\u5728\u8be5\u4e0a\u4e0b\u6587\u4e0a\u53d1\u51fa ",(0,i.jsx)(n.code,{children:"error"})," \u4e8b\u4ef6"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679c\u6ca1\u6709\u4e0a\u4e0b\u6587\u6709 ",(0,i.jsx)(n.code,{children:"error"})," \u76d1\u542c\u5668\uff0c\u5219\u5728\u5f53\u524d\u4e0a\u4e0b\u6587\u4e0a\u53d1\u51fa ",(0,i.jsx)(n.code,{children:"error"})," \u4e8b\u4ef6\uff0c\u8fd9\u53ef\u80fd\u5bfc\u81f4\u8fdb\u7a0b\u9000\u51fa"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"\u5efa\u8bae\u5728\u89c2\u5bdf\u8005\u4e2d\u5904\u7406\u9519\u8bef\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"const observer: ContextObserver = {\n  filter: binding => binding.tagMap.service != null,\n\n  observe(event, binding, ctx) {\n    try {\n      // Your observer logic\n    } catch (error) {\n      console.error('Error in observer:', error);\n      // Handle the error\n    }\n  }\n};\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u6700\u4f73\u5b9e\u8df5",children:"\u6700\u4f73\u5b9e\u8df5"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u4f7f\u7528\u89c2\u5bdf\u8005\u8fdb\u884c\u7ec4\u4ef6\u7684\u52a8\u6001\u53d1\u73b0"}),"\n",(0,i.jsx)(n.li,{children:"\u4fdd\u6301\u89c2\u5bdf\u8005\u4e13\u6ce8\u4e8e\u5355\u4e00\u5173\u6ce8\u70b9"}),"\n",(0,i.jsx)(n.li,{children:"\u5728\u89c2\u5bdf\u8005\u4e2d\u6b63\u786e\u5904\u7406\u9519\u8bef"}),"\n",(0,i.jsx)(n.li,{children:"\u4f7f\u7528\u4e0a\u4e0b\u6587\u89c6\u56fe\u8ddf\u8e2a\u76f8\u5173\u7ed1\u5b9a"}),"\n",(0,i.jsx)(n.li,{children:"\u6ce8\u610f\u89c2\u5bdf\u8005\u5bf9\u6027\u80fd\u7684\u5f71\u54cd\uff0c\u7279\u522b\u662f\u5bf9\u4e8e\u9891\u7e41\u53d8\u5316\u7684\u7ed1\u5b9a"}),"\n",(0,i.jsx)(n.li,{children:"\u5728\u4e0d\u518d\u9700\u8981\u4e0a\u4e0b\u6587\u89c6\u56fe\u65f6\u5173\u95ed\u5b83\u4eec\u4ee5\u907f\u514d\u5185\u5b58\u6cc4\u6f0f"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u4e0b\u4e00\u6b65",children:"\u4e0b\u4e00\u6b65"}),"\n",(0,i.jsx)(n.p,{children:"\u73b0\u5728\u60a8\u5df2\u7ecf\u4e86\u89e3\u4e86\u89c2\u5bdf\u8005\u548c\u4e8b\u4ef6\uff0c\u53ef\u4ee5\u4e86\u89e3\uff1a"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"./context",children:"Context"})," - \u7ed1\u5b9a\u7684\u5bb9\u5668"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"./binding",children:"Binding"})," - \u5982\u4f55\u6ce8\u518c\u4f9d\u8d56\u9879"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"./dependency-injection",children:"\u4f9d\u8d56\u6ce8\u5165"})," - \u5982\u4f55\u5c06\u4f9d\u8d56\u9879\u6ce8\u5165\u5230\u7c7b\u4e2d"]}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(x,{...e})}):x(e)}}}]);