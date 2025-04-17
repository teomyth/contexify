"use strict";(self.webpackChunkdocs_site=self.webpackChunkdocs_site||[]).push([[667],{991:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>s});var r=t(4700);const i={},o=r.createContext(i);function c(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(o.Provider,{value:n},e.children)}},9271:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"examples/interceptors","title":"\u62e6\u622a\u5668\u793a\u4f8b","description":"\u672c\u793a\u4f8b\u6f14\u793a\u5982\u4f55\u4f7f\u7528 Contexify \u7684\u62e6\u622a\u5668\u529f\u80fd\u6765\u6dfb\u52a0\u6a2a\u5207\u5173\u6ce8\u70b9\u3002","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/examples/interceptors.md","sourceDirName":"examples","slug":"/examples/interceptors","permalink":"/contexify/zh/docs/examples/interceptors","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/examples/interceptors.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"\u6a21\u5757\u5316\u5e94\u7528\u7a0b\u5e8f\u793a\u4f8b","permalink":"/contexify/zh/docs/examples/modular-app"},"next":{"title":"\u89c2\u5bdf\u8005\u793a\u4f8b","permalink":"/contexify/zh/docs/examples/observers"}}');var i=t(7968),o=t(991);const c={sidebar_position:3},s="\u62e6\u622a\u5668\u793a\u4f8b",a={},l=[{value:"\u4ec0\u4e48\u662f\u62e6\u622a\u5668\uff1f",id:"\u4ec0\u4e48\u662f\u62e6\u622a\u5668",level:2},{value:"\u521b\u5efa\u62e6\u622a\u5668",id:"\u521b\u5efa\u62e6\u622a\u5668",level:2},{value:"\u4f7f\u7528\u62e6\u622a\u5668",id:"\u4f7f\u7528\u62e6\u622a\u5668",level:2},{value:"\u65b9\u6cd5\u7ea7\u62e6\u622a\u5668",id:"\u65b9\u6cd5\u7ea7\u62e6\u622a\u5668",level:3},{value:"\u7c7b\u7ea7\u62e6\u622a\u5668",id:"\u7c7b\u7ea7\u62e6\u622a\u5668",level:3},{value:"\u591a\u4e2a\u62e6\u622a\u5668",id:"\u591a\u4e2a\u62e6\u622a\u5668",level:3},{value:"\u5e38\u89c1\u62e6\u622a\u5668\u6a21\u5f0f",id:"\u5e38\u89c1\u62e6\u622a\u5668\u6a21\u5f0f",level:2},{value:"\u7f13\u5b58\u62e6\u622a\u5668",id:"\u7f13\u5b58\u62e6\u622a\u5668",level:3},{value:"\u9519\u8bef\u5904\u7406\u62e6\u622a\u5668",id:"\u9519\u8bef\u5904\u7406\u62e6\u622a\u5668",level:3},{value:"\u5b8c\u6574\u793a\u4f8b",id:"\u5b8c\u6574\u793a\u4f8b",level:2},{value:"\u5173\u952e\u8981\u70b9",id:"\u5173\u952e\u8981\u70b9",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"\u62e6\u622a\u5668\u793a\u4f8b",children:"\u62e6\u622a\u5668\u793a\u4f8b"})}),"\n",(0,i.jsx)(n.p,{children:"\u672c\u793a\u4f8b\u6f14\u793a\u5982\u4f55\u4f7f\u7528 Contexify \u7684\u62e6\u622a\u5668\u529f\u80fd\u6765\u6dfb\u52a0\u6a2a\u5207\u5173\u6ce8\u70b9\u3002"}),"\n",(0,i.jsx)(n.h2,{id:"\u4ec0\u4e48\u662f\u62e6\u622a\u5668",children:"\u4ec0\u4e48\u662f\u62e6\u622a\u5668\uff1f"}),"\n",(0,i.jsx)(n.p,{children:"\u62e6\u622a\u5668\u5141\u8bb8\u60a8\u5728\u65b9\u6cd5\u8c03\u7528\u524d\u540e\u6267\u884c\u4ee3\u7801\uff0c\u800c\u65e0\u9700\u4fee\u6539\u65b9\u6cd5\u672c\u8eab\u3002\u8fd9\u5bf9\u4e8e\u6dfb\u52a0\u65e5\u5fd7\u8bb0\u5f55\u3001\u6027\u80fd\u76d1\u63a7\u3001\u9519\u8bef\u5904\u7406\u7b49\u6a2a\u5207\u5173\u6ce8\u70b9\u975e\u5e38\u6709\u7528\u3002"}),"\n",(0,i.jsx)(n.h2,{id:"\u521b\u5efa\u62e6\u622a\u5668",children:"\u521b\u5efa\u62e6\u622a\u5668"}),"\n",(0,i.jsx)(n.p,{children:"\u9996\u5148\uff0c\u8ba9\u6211\u4eec\u521b\u5efa\u4e00\u4e2a\u7b80\u5355\u7684\u65e5\u5fd7\u62e6\u622a\u5668\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { Interceptor, InvocationContext, ValueOrPromise } from 'contexify';\n\nclass LogInterceptor implements Interceptor {\n  async intercept(\n    invocationCtx: InvocationContext,\n    next: () => ValueOrPromise<any>\n  ) {\n    // Code executed before the method call\n    const { methodName, args } = invocationCtx;\n    console.log(`Calling ${methodName} method with args:`, args);\n\n    const start = Date.now();\n    try {\n      // Call the next interceptor or the method itself\n      const result = await next();\n\n      // Code executed after the method call\n      const duration = Date.now() - start;\n      console.log(`${methodName} method completed in ${duration}ms with result:`, result);\n\n      // Return the result\n      return result;\n    } catch (error) {\n      // Code executed if the method throws an error\n      const duration = Date.now() - start;\n      console.error(`${methodName} method failed after ${duration}ms with error:`, error);\n      throw error;\n    }\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u4f7f\u7528\u62e6\u622a\u5668",children:"\u4f7f\u7528\u62e6\u622a\u5668"}),"\n",(0,i.jsx)(n.h3,{id:"\u65b9\u6cd5\u7ea7\u62e6\u622a\u5668",children:"\u65b9\u6cd5\u7ea7\u62e6\u622a\u5668"}),"\n",(0,i.jsxs)(n.p,{children:["\u60a8\u53ef\u4ee5\u4f7f\u7528 ",(0,i.jsx)(n.code,{children:"@intercept"})," \u88c5\u9970\u5668\u5c06\u62e6\u622a\u5668\u5e94\u7528\u4e8e\u7279\u5b9a\u65b9\u6cd5\uff1a"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { injectable, intercept } from 'contexify';\nimport { LogInterceptor } from './interceptors';\n\n@injectable()\nclass UserService {\n  @intercept(LogInterceptor)\n  async createUser(userData: UserData) {\n    // Method implementation\n    return { id: '123', ...userData };\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u7c7b\u7ea7\u62e6\u622a\u5668",children:"\u7c7b\u7ea7\u62e6\u622a\u5668"}),"\n",(0,i.jsx)(n.p,{children:"\u60a8\u53ef\u4ee5\u5c06\u62e6\u622a\u5668\u5e94\u7528\u4e8e\u7c7b\u7684\u6240\u6709\u65b9\u6cd5\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { injectable, intercept } from 'contexify';\nimport { LogInterceptor } from './interceptors';\n\n@injectable()\n@intercept(LogInterceptor)\nclass UserService {\n  async createUser(userData: UserData) {\n    // Method implementation\n    return { id: '123', ...userData };\n  }\n\n  async getUser(id: string) {\n    // Method implementation\n    return { id, name: 'John Doe' };\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u591a\u4e2a\u62e6\u622a\u5668",children:"\u591a\u4e2a\u62e6\u622a\u5668"}),"\n",(0,i.jsx)(n.p,{children:"\u60a8\u53ef\u4ee5\u5c06\u591a\u4e2a\u62e6\u622a\u5668\u5e94\u7528\u4e8e\u65b9\u6cd5\u6216\u7c7b\u3002\u5b83\u4eec\u5c06\u6309\u7167\u6307\u5b9a\u7684\u987a\u5e8f\u6267\u884c\uff1a"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"import { injectable, intercept } from 'contexify';\nimport { AuthInterceptor, LogInterceptor, CacheInterceptor } from './interceptors';\n\n@injectable()\nclass UserService {\n  @intercept(AuthInterceptor, LogInterceptor, CacheInterceptor)\n  async getUser(id: string) {\n    // Method implementation\n    return { id, name: 'John Doe' };\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5e38\u89c1\u62e6\u622a\u5668\u6a21\u5f0f",children:"\u5e38\u89c1\u62e6\u622a\u5668\u6a21\u5f0f"}),"\n",(0,i.jsx)(n.h3,{id:"\u7f13\u5b58\u62e6\u622a\u5668",children:"\u7f13\u5b58\u62e6\u622a\u5668"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"class CacheInterceptor implements Interceptor {\n  private cache = new Map<string, any>();\n\n  async intercept(\n    invocationCtx: InvocationContext,\n    next: () => ValueOrPromise<any>\n  ) {\n    const { methodName, args } = invocationCtx;\n    const cacheKey = `${methodName}:${JSON.stringify(args)}`;\n\n    // Check if result is in cache\n    if (this.cache.has(cacheKey)) {\n      return this.cache.get(cacheKey);\n    }\n\n    // Call the method\n    const result = await next();\n\n    // Cache the result\n    this.cache.set(cacheKey, result);\n\n    return result;\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u9519\u8bef\u5904\u7406\u62e6\u622a\u5668",children:"\u9519\u8bef\u5904\u7406\u62e6\u622a\u5668"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"class ErrorHandlingInterceptor implements Interceptor {\n  async intercept(\n    invocationCtx: InvocationContext,\n    next: () => ValueOrPromise<any>\n  ) {\n    try {\n      return await next();\n    } catch (error) {\n      // Handle the error\n      console.error('Error during method execution:', error);\n\n      // You can transform the error\n      throw new ApplicationError('An error occurred', { cause: error });\n    }\n  }\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5b8c\u6574\u793a\u4f8b",children:"\u5b8c\u6574\u793a\u4f8b"}),"\n",(0,i.jsxs)(n.p,{children:["\u5b8c\u6574\u7684\u793a\u4f8b\u4ee3\u7801\u53ef\u4ee5\u5728 ",(0,i.jsx)(n.a,{href:"https://github.com/teomyth/contexify/tree/main/examples/features/interceptors",children:"examples/features/interceptors"})," \u76ee\u5f55\u4e2d\u627e\u5230\u3002"]}),"\n",(0,i.jsx)(n.h2,{id:"\u5173\u952e\u8981\u70b9",children:"\u5173\u952e\u8981\u70b9"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u62e6\u622a\u5668\u5141\u8bb8\u60a8\u5728\u4e0d\u4fee\u6539\u65b9\u6cd5\u672c\u8eab\u7684\u60c5\u51b5\u4e0b\u6dfb\u52a0\u6a2a\u5207\u5173\u6ce8\u70b9"}),"\n",(0,i.jsx)(n.li,{children:"\u60a8\u53ef\u4ee5\u5c06\u62e6\u622a\u5668\u5e94\u7528\u4e8e\u7279\u5b9a\u65b9\u6cd5\u6216\u6574\u4e2a\u7c7b"}),"\n",(0,i.jsx)(n.li,{children:"\u60a8\u53ef\u4ee5\u7ec4\u5408\u591a\u4e2a\u62e6\u622a\u5668\u6765\u5b9e\u73b0\u590d\u6742\u7684\u529f\u80fd"}),"\n",(0,i.jsx)(n.li,{children:"\u5e38\u89c1\u7528\u4f8b\u5305\u62ec\u65e5\u5fd7\u8bb0\u5f55\u3001\u7f13\u5b58\u3001\u9519\u8bef\u5904\u7406\u548c\u6027\u80fd\u76d1\u63a7"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}}}]);