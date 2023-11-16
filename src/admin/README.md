## 项目简介

    admin配置中心客户端项目

## 技术依赖

-   React -（UI 框架）
-   Ant-Design -（组件库）
-   TypeScript -（静态类型）
-   axios -（ajax）
-   vite - 热更新
-   zustand -数据状态管理

## 目录结构

```
|-- docs                文档
|-- src                 源码目录
|	|-- service           接口
|	|-- assets                静态资源文件，会被webpack解析为模块依赖
|		|-- img                     图片
|		|-- fonts                   字体
|	|-- components            全局公共组件
|	|-- hooks                 React hooks
|	|-- layouts               基础布局
|	|-- mock                  数据模拟
|	|-- pages                 页面级组件
|	|-- router                路由管理
|	|-- store                 状态管理
|	|-- utils                 全局公用方法
|	|-- App.tsx								根组件
|	|-- index.tsx							入口文件
|-- static              第三方纯静态资源
|-- .eslintignore
|-- .eslintrc.js
|-- jest.config.js
|-- .editorconfig       IDE配置
|-- .gitignore          git提交时忽略的文件
|--	package.json        项目基本信息
|-- vite.config.js
```

## 使用

### 运行

```
pnpm dev
yarn dev
npm run dev
```

### 构建

```
pnpm build
yarn build
npm run build
```
