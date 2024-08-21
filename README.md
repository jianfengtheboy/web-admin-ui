# Arco Admin Pro

## Arco Design + Vue3 + TypeScript + Vite 管理系统项目模版

## Build Setup

```bash
# install dependencies
pnpm install

# serve with hot reload at localhost:8080
pnpm dev

# build for production with minification
## 本地包
pnpm build
## 开发环境包
pnpm build:dev
## 生产环境包
pnpm build:prod
## 预生产环境包
pnpm build:staging
## 测试环境包
pnpm build:test
```

### 一、系统简介

#### 1.1、概述

vue3 管理系统项目模版

#### 1.2 服务维护者

- name: jianfengtheboy email: jianfengtheboy@163.com

### 二、系统介绍

#### 2.1、主要技术

- 1、vite@^4.5.0
- 2、vue@^3.3.7
- 3、vue-router@^4.0.13
- 4、pinia@^2.1.7
- 5、typescript@^5.2.2
- 6、axios@^1.6.0
- 7、arco-design/web-vue@^2.56.0
- 8、arco-design/color@^0.4.0
- 9、codemirror/lang-javascript@^6.2.2
- 10、codemirror/lang-vue@^0.1.3
- 11、codemirror/theme-one-dark@^6.1.2
- 12、vueuse/core@^10.6.1
- 13、codemirror@^6.0.1
- 14、dayjs@^1.11.10
- 15、js-base64@^3.7.6
- 16、js-cookie@^3.0.5
- 17、lodash@^4.17.21
- 18、mitt@^3.0.1
- 19、mockjs@^1.1.0
- 20、nprogress@^0.2.0
- 21、pinia-plugin-persistedstate@^3.2.0
- 22、vue-codemirror6@^1.2.5
- 23、vue-color-kit@^1.0.6
- 24、xe-utils@^3.5.14
- 25、commitlint/cli@^19.3.0
- 26、commitlint/config-conventional@^19.2.2
- 27、compare-func@^2.0.0
- 28、conventional-changelog-cli@^2.2.2
- 29、conventional-changelog-custom-config@^0.3.1
- 30、husky@^8.0.3
- 31、less@^4.2.0
- 32、tailwindcss@3.1.4
- 33、vue-draggable-plus^0.5.3

#### 2.2、项目结构

##### 文件说明

| 文件名称       | 说明                             |
| -------------- | -------------------------------- |
| src            | 项目配置项目开发的所有内容页面   |
| src/apis       | 配置项目所有的接口资源           |
| src/assets     | 配置项目所需的公共的静态资源页面 |
| src/components | 配置项目业务相关的公共组件       |
| src/config     | 配置项目的一些全局公共配置       |
| src/directives | 配置全局自定义指令               |
| src/hooks      | 配置全局自定义 hooks             |
| src/layouts    | 全局布局页面                     |
| src/mock       | 全局模拟接口及模拟数据           |
| src/model      | 全局数据模型                     |
| src/request    | 封装 axios 方法                  |
| src/router     | 项目路由配置                     |
| src/store      | 配置 pinia 做全局状态管理        |
| src/utils      | 全局共用方法                     |
| src/views/     | 配置业务的所有页面               |
| src/App        | 入口页面                         |
| src/main.ts    | 打包入口文件                     |
| vite.config.ts | vite 自定义配置和开发代理配置等  |
