"use strict";(self.webpackChunk_contexify_docs_site=self.webpackChunk_contexify_docs_site||[]).push([[322],{991:(n,e,o)=>{o.d(e,{R:()=>t,x:()=>g});var i=o(4700);const s={},r=i.createContext(s);function t(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function g(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:t(n.components),i.createElement(r.Provider,{value:e},n.children)}},8901:(n,e,o)=>{o.r(e),o.d(e,{assets:()=>c,contentTitle:()=>g,default:()=>p,frontMatter:()=>t,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"guides/component-creation","title":"Component Creation Guide","description":"Note: Component support is planned for the second phase of development and is not yet available in the current version of Contexify. This guide outlines the planned approach and will be updated when component support is implemented.","source":"@site/docs/guides/component-creation.md","sourceDirName":"guides","slug":"/guides/component-creation","permalink":"/contexify/docs/guides/component-creation","draft":false,"unlisted":false,"editUrl":"https://github.com/teomyth/contexify/edit/main/docs-site/docs/guides/component-creation.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Application Structure Guide","permalink":"/contexify/docs/guides/application-structure"},"next":{"title":"Testing Guide","permalink":"/contexify/docs/guides/testing"}}');var s=o(7968),r=o(991);const t={sidebar_position:2},g="Component Creation Guide",c={},a=[{value:"What is a Component?",id:"what-is-a-component",level:2},{value:"Component Structure",id:"component-structure",level:2},{value:"Creating a Component",id:"creating-a-component",level:2},{value:"1. Define Binding Keys",id:"1-define-binding-keys",level:3},{value:"2. Define Types",id:"2-define-types",level:3},{value:"3. Implement Services",id:"3-implement-services",level:3},{value:"4. Create Component Class",id:"4-create-component-class",level:3},{value:"Using the Component",id:"using-the-component",level:2},{value:"Component with Providers",id:"component-with-providers",level:2},{value:"Component with Extension Points",id:"component-with-extension-points",level:2},{value:"Best Practices",id:"best-practices",level:2},{value:"Next Steps",id:"next-steps",level:2}];function l(n){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"component-creation-guide",children:"Component Creation Guide"})}),"\n",(0,s.jsxs)(e.blockquote,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"Note:"})," Component support is planned for the second phase of development and is not yet available in the current version of Contexify. This guide outlines the planned approach and will be updated when component support is implemented."]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"This guide provides instructions for creating reusable components with Contexify, following patterns inspired by LoopBack 4's component architecture."}),"\n",(0,s.jsx)(e.h2,{id:"what-is-a-component",children:"What is a Component?"}),"\n",(0,s.jsx)(e.p,{children:"A component is a collection of related bindings that can be reused across applications. Components are a great way to organize your code and promote modularity."}),"\n",(0,s.jsx)(e.p,{children:"Components typically include:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Services"}),"\n",(0,s.jsx)(e.li,{children:"Providers"}),"\n",(0,s.jsx)(e.li,{children:"Binding keys"}),"\n",(0,s.jsx)(e.li,{children:"Type definitions"}),"\n",(0,s.jsx)(e.li,{children:"Configuration"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"component-structure",children:"Component Structure"}),"\n",(0,s.jsx)(e.p,{children:"Here's a recommended structure for a component, following LoopBack 4's component patterns:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"src/\n\u2514\u2500\u2500 components/\n    \u2514\u2500\u2500 my-component/\n        \u251c\u2500\u2500 index.ts              # Main entry point that exports the component class and public APIs\n        \u251c\u2500\u2500 component.ts          # Component class definition\n        \u251c\u2500\u2500 keys.ts               # Binding keys (constants)\n        \u251c\u2500\u2500 types.ts              # Type definitions and interfaces\n        \u251c\u2500\u2500 services/             # Services provided by the component\n        \u2502   \u251c\u2500\u2500 index.ts          # Service exports\n        \u2502   \u2514\u2500\u2500 my-service.ts     # Service implementation\n        \u251c\u2500\u2500 providers/            # Providers for creating values dynamically\n        \u2502   \u251c\u2500\u2500 index.ts          # Provider exports\n        \u2502   \u2514\u2500\u2500 my-provider.ts    # Provider implementation\n        \u2514\u2500\u2500 decorators/           # Custom decorators (if any)\n            \u251c\u2500\u2500 index.ts          # Decorator exports\n            \u2514\u2500\u2500 my-decorator.ts   # Decorator implementation\n"})}),"\n",(0,s.jsx)(e.p,{children:"This structure follows the principle of organizing code by feature (component) rather than by type, making it easier to understand and maintain."}),"\n",(0,s.jsx)(e.h2,{id:"creating-a-component",children:"Creating a Component"}),"\n",(0,s.jsx)(e.p,{children:"Let's create a simple logging component as an example."}),"\n",(0,s.jsx)(e.h3,{id:"1-define-binding-keys",children:"1. Define Binding Keys"}),"\n",(0,s.jsx)(e.p,{children:"First, define the binding keys for your component:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// components/logger/keys.ts\nexport namespace LoggerBindings {\n  export const COMPONENT = 'components.Logger';\n  export const SERVICE = 'services.Logger';\n  export const CONFIG = 'config.logger';\n}\n"})}),"\n",(0,s.jsx)(e.h3,{id:"2-define-types",children:"2. Define Types"}),"\n",(0,s.jsx)(e.p,{children:"Next, define the types for your component:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// components/logger/types.ts\nexport interface LoggerConfig {\n  level: 'debug' | 'info' | 'warn' | 'error';\n  prefix?: string;\n}\n\nexport interface Logger {\n  debug(message: string, ...args: any[]): void;\n  info(message: string, ...args: any[]): void;\n  warn(message: string, ...args: any[]): void;\n  error(message: string, ...args: any[]): void;\n}\n"})}),"\n",(0,s.jsx)(e.h3,{id:"3-implement-services",children:"3. Implement Services"}),"\n",(0,s.jsx)(e.p,{children:"Now, implement the services for your component:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// components/logger/services/console-logger.ts\nimport { injectable, config } from 'contexify';\nimport { Logger, LoggerConfig } from '../types';\nimport { LoggerBindings } from '../keys';\n\n@injectable()\nexport class ConsoleLogger implements Logger {\n  constructor(\n    @config({\n      fromBinding: LoggerBindings.COMPONENT,\n      propertyPath: 'config',\n    })\n    private config: LoggerConfig = { level: 'info' }\n  ) {}\n\n  debug(message: string, ...args: any[]): void {\n    if (this.shouldLog('debug')) {\n      console.debug(`${this.getPrefix()} ${message}`, ...args);\n    }\n  }\n\n  info(message: string, ...args: any[]): void {\n    if (this.shouldLog('info')) {\n      console.info(`${this.getPrefix()} ${message}`, ...args);\n    }\n  }\n\n  warn(message: string, ...args: any[]): void {\n    if (this.shouldLog('warn')) {\n      console.warn(`${this.getPrefix()} ${message}`, ...args);\n    }\n  }\n\n  error(message: string, ...args: any[]): void {\n    if (this.shouldLog('error')) {\n      console.error(`${this.getPrefix()} ${message}`, ...args);\n    }\n  }\n\n  private shouldLog(level: string): boolean {\n    const levels = ['debug', 'info', 'warn', 'error'];\n    const configLevelIndex = levels.indexOf(this.config.level);\n    const logLevelIndex = levels.indexOf(level);\n    return logLevelIndex >= configLevelIndex;\n  }\n\n  private getPrefix(): string {\n    return this.config.prefix ? `[${this.config.prefix}]` : '';\n  }\n}\n\n// components/logger/services/index.ts\nexport * from './console-logger';\n"})}),"\n",(0,s.jsx)(e.h3,{id:"4-create-component-class",children:"4. Create Component Class"}),"\n",(0,s.jsx)(e.p,{children:"Now, create the component class following LoopBack 4's component pattern:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// src/components/logger/component.ts\nimport { createBindingFromClass, Binding, injectable } from 'contexify';\nimport { ConsoleLogger } from './services';\nimport { LoggerBindings } from './keys';\nimport { LoggerConfig } from './types';\n\n/**\n * Logger Component for providing logging capabilities\n */\n@injectable({ tags: ['component'] })\nexport class LoggerComponent {\n  /**\n   * Bindings provided by this component\n   */\n  bindings: Binding[] = [];\n\n  /**\n   * Constructor for creating a LoggerComponent instance\n   * @param config - Configuration for the logger\n   */\n  constructor(config: LoggerConfig = { level: 'info' }) {\n    this.bindings = [\n      // Bind the component itself\n      Binding.create(LoggerBindings.COMPONENT)\n        .to(this)\n        .tag('component'),\n\n      // Bind the logger service\n      createBindingFromClass(ConsoleLogger, {\n        key: LoggerBindings.SERVICE,\n      }).tag('service'),\n\n      // Bind the configuration\n      Binding.create(LoggerBindings.CONFIG)\n        .to(config)\n        .tag('config'),\n    ];\n  }\n}\n\n// src/components/logger/index.ts\nexport * from './component';\nexport * from './keys';\nexport * from './types';\nexport * from './services';\n"})}),"\n",(0,s.jsxs)(e.p,{children:["This follows LoopBack 4's pattern of using the ",(0,s.jsx)(e.code,{children:"@injectable"})," decorator with a 'component' tag and providing clear documentation for the component class and its methods."]}),"\n",(0,s.jsx)(e.h2,{id:"using-the-component",children:"Using the Component"}),"\n",(0,s.jsx)(e.p,{children:"Once component support is implemented, you will be able to use the component in your application like this:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"import { Application } from 'contexify';\nimport { LoggerComponent, LoggerBindings, Logger } from './components/logger';\n\n// Create an application\nconst app = new Application();\n\n// Add the logger component with configuration\napp.component(LoggerComponent, { level: 'debug', prefix: 'MyApp' });\n\n// Use the logger in your application\nasync function run() {\n  // Get the logger from the application context\n  const logger = await app.get<Logger>(LoggerBindings.SERVICE);\n\n  // Use the logger\n  logger.debug('This is a debug message');\n  logger.info('This is an info message');\n  logger.warn('This is a warning message');\n  logger.error('This is an error message');\n}\n\nrun().catch(err => console.error(err));\n"})}),"\n",(0,s.jsxs)(e.p,{children:["This simplified approach follows LoopBack 4's pattern of using the ",(0,s.jsx)(e.code,{children:"component()"})," method to register components with an application."]}),"\n",(0,s.jsx)(e.h2,{id:"component-with-providers",children:"Component with Providers"}),"\n",(0,s.jsx)(e.p,{children:"Providers are a special type of binding that can be used to create values dynamically. They are useful for creating dependencies that require complex initialization."}),"\n",(0,s.jsx)(e.p,{children:"Let's add a file logger provider to our logger component:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// components/logger/providers/file-logger.provider.ts\nimport { Provider, injectable, config } from 'contexify';\nimport { Logger, LoggerConfig } from '../types';\nimport { LoggerBindings } from '../keys';\nimport * as fs from 'fs';\nimport * as path from 'path';\n\nexport interface FileLoggerConfig extends LoggerConfig {\n  file: string;\n}\n\n@injectable()\nexport class FileLoggerProvider implements Provider<Logger> {\n  constructor(\n    @config({\n      fromBinding: LoggerBindings.COMPONENT,\n      propertyPath: 'fileConfig',\n    })\n    private fileConfig: FileLoggerConfig\n  ) {}\n\n  value(): Logger {\n    // Create the log directory if it doesn't exist\n    const logDir = path.dirname(this.fileConfig.file);\n    if (!fs.existsSync(logDir)) {\n      fs.mkdirSync(logDir, { recursive: true });\n    }\n\n    return {\n      debug: (message: string, ...args: any[]) => {\n        this.log('DEBUG', message, args);\n      },\n      info: (message: string, ...args: any[]) => {\n        this.log('INFO', message, args);\n      },\n      warn: (message: string, ...args: any[]) => {\n        this.log('WARN', message, args);\n      },\n      error: (message: string, ...args: any[]) => {\n        this.log('ERROR', message, args);\n      },\n    };\n  }\n\n  private log(level: string, message: string, args: any[]): void {\n    const timestamp = new Date().toISOString();\n    const prefix = this.fileConfig.prefix ? `[${this.fileConfig.prefix}]` : '';\n    const logMessage = `${timestamp} ${level} ${prefix} ${message} ${args.length ? JSON.stringify(args) : ''}`;\n\n    fs.appendFileSync(this.fileConfig.file, logMessage + '\\n');\n  }\n}\n\n// components/logger/providers/index.ts\nexport * from './file-logger.provider';\n"})}),"\n",(0,s.jsx)(e.p,{children:"Now, update the component class to include the file logger provider:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// components/logger/index.ts\nimport { createBindingFromClass, Binding } from 'contexify';\nimport { ConsoleLogger } from './services';\nimport { FileLoggerProvider } from './providers';\nimport { LoggerBindings } from './keys';\nimport { LoggerConfig } from './types';\nimport { FileLoggerConfig } from './providers/file-logger.provider';\n\nexport class LoggerComponent {\n  bindings: Binding[] = [];\n\n  constructor(\n    config: LoggerConfig = { level: 'info' },\n    fileConfig?: FileLoggerConfig\n  ) {\n    this.bindings = [\n      // Bind the component itself\n      Binding.create(LoggerBindings.COMPONENT)\n        .to({ config, fileConfig })\n        .tag('component'),\n\n      // Bind the console logger service\n      createBindingFromClass(ConsoleLogger, {\n        key: LoggerBindings.SERVICE,\n      }).tag('service'),\n    ];\n\n    // Add the file logger provider if fileConfig is provided\n    if (fileConfig) {\n      this.bindings.push(\n        Binding.create(LoggerBindings.SERVICE + '.file')\n          .toProvider(FileLoggerProvider)\n          .tag('service')\n      );\n    }\n  }\n}\n\n// Re-export everything\nexport * from './keys';\nexport * from './types';\nexport * from './services';\nexport * from './providers';\n"})}),"\n",(0,s.jsx)(e.h2,{id:"component-with-extension-points",children:"Component with Extension Points"}),"\n",(0,s.jsx)(e.p,{children:"Extension points allow other components to extend your component's functionality. Let's add an extension point to our logger component:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// components/logger/keys.ts\nexport namespace LoggerBindings {\n  export const COMPONENT = 'components.Logger';\n  export const SERVICE = 'services.Logger';\n  export const CONFIG = 'config.logger';\n  export const EXTENSIONS = 'extensions.logger';\n}\n\n// components/logger/types.ts\nexport interface LoggerExtension {\n  name: string;\n  log(level: string, message: string, args: any[]): void;\n}\n\n// components/logger/services/console-logger.ts\nimport { injectable, config, inject } from 'contexify';\nimport { Logger, LoggerConfig, LoggerExtension } from '../types';\nimport { LoggerBindings } from '../keys';\n\n@injectable()\nexport class ConsoleLogger implements Logger {\n  constructor(\n    @config({\n      fromBinding: LoggerBindings.COMPONENT,\n      propertyPath: 'config',\n    })\n    private config: LoggerConfig = { level: 'info' },\n\n    @inject.tag(LoggerBindings.EXTENSIONS)\n    private extensions: LoggerExtension[] = []\n  ) {}\n\n  debug(message: string, ...args: any[]): void {\n    if (this.shouldLog('debug')) {\n      console.debug(`${this.getPrefix()} ${message}`, ...args);\n      this.notifyExtensions('debug', message, args);\n    }\n  }\n\n  info(message: string, ...args: any[]): void {\n    if (this.shouldLog('info')) {\n      console.info(`${this.getPrefix()} ${message}`, ...args);\n      this.notifyExtensions('info', message, args);\n    }\n  }\n\n  warn(message: string, ...args: any[]): void {\n    if (this.shouldLog('warn')) {\n      console.warn(`${this.getPrefix()} ${message}`, ...args);\n      this.notifyExtensions('warn', message, args);\n    }\n  }\n\n  error(message: string, ...args: any[]): void {\n    if (this.shouldLog('error')) {\n      console.error(`${this.getPrefix()} ${message}`, ...args);\n      this.notifyExtensions('error', message, args);\n    }\n  }\n\n  private shouldLog(level: string): boolean {\n    const levels = ['debug', 'info', 'warn', 'error'];\n    const configLevelIndex = levels.indexOf(this.config.level);\n    const logLevelIndex = levels.indexOf(level);\n    return logLevelIndex >= configLevelIndex;\n  }\n\n  private getPrefix(): string {\n    return this.config.prefix ? `[${this.config.prefix}]` : '';\n  }\n\n  private notifyExtensions(level: string, message: string, args: any[]): void {\n    for (const extension of this.extensions) {\n      try {\n        extension.log(level, message, args);\n      } catch (error) {\n        console.error(`Error in logger extension ${extension.name}:`, error);\n      }\n    }\n  }\n}\n"})}),"\n",(0,s.jsx)(e.p,{children:"Now, other components can extend the logger component:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"// components/metrics/index.ts\nimport { Binding } from 'contexify';\nimport { LoggerBindings, LoggerExtension } from '../logger';\n\nexport class MetricsLoggerExtension implements LoggerExtension {\n  name = 'metrics';\n\n  log(level: string, message: string, args: any[]): void {\n    // Track metrics for log events\n    if (level === 'error') {\n      // Increment error counter\n      this.incrementErrorCounter();\n    }\n  }\n\n  private incrementErrorCounter(): void {\n    // Implementation details\n  }\n}\n\nexport class MetricsComponent {\n  bindings: Binding[] = [\n    Binding.create(`${LoggerBindings.EXTENSIONS}.metrics`)\n      .to(new MetricsLoggerExtension())\n      .tag(LoggerBindings.EXTENSIONS),\n  ];\n}\n"})}),"\n",(0,s.jsx)(e.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,s.jsx)(e.p,{children:"Following LoopBack 4's component design principles, here are some best practices for creating components:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Single Responsibility"}),": Each component should have a single, well-defined responsibility"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Clear Interfaces"}),": Define clear interfaces for your component's services and extension points"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Configuration"}),": Make your component configurable with sensible defaults"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Extension Points"}),": Provide well-documented extension points for other components"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Documentation"}),": Document your component's API, configuration options, and usage examples"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Testing"}),": Write comprehensive tests for your component, including unit and integration tests"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Versioning"}),": Use semantic versioning for your component"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Discoverability"}),": Use appropriate tags for bindings to make them discoverable"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Naming Conventions"}),": Follow consistent naming conventions for binding keys"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Dependency Declaration"}),": Clearly declare dependencies on other components"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.strong,{children:"Lifecycle Management"}),": Properly handle component initialization and cleanup"]}),"\n"]}),"\n",(0,s.jsxs)(e.blockquote,{children:["\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"Note:"})," Remember that component support is planned for the second phase of development. The current version of Contexify does not yet support components as described in this guide."]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,s.jsx)(e.p,{children:"Now that you understand how to create components, you can learn about:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"./application-structure",children:"Application Structure"})," - How to structure your application"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"./testing",children:"Testing"})," - How to test your components"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"../category/core-concepts",children:"Core Concepts"})," - Learn about the core concepts of Contexify"]}),"\n"]})]})}function p(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(l,{...n})}):l(n)}}}]);