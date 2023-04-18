---
title: 微前端实践之qiankun
date: 2021-12-16 15:18:57
sidebar: 'auto'
categories: 
 - 日常笔记
tags: 
 - 微前端
---

### 前言
> 笑傲江湖：使用了vue3启动框架，配置了webpack各项优化，项目架构没有问题，hiahiahiahia...
> 风起云涌：几千个页面不停上，几百个路由使劲堆，项目越堆越大，直到某天，电闪雷鸣，暴虐的风雪如同一头游荡在荒原上的饿狼，正撕咬着我的皮肉、啃噬着我的筋骨...
> 刀光剑影：产品：我就改个文字，怎么还要等这么久打包项目？测试：怎么改动一个地方会影响那么多处？我：牵一发而动全身，只怪我的头发太茂密！
> 华山论剑：迫于兴趣（~~yinwei~~），开始折腾qiankun，single-spa，多页面应用等方式拆分项目打包上线。

### 一、什么是微前端？
--- 

> Techniques, strategies and recipes for building a modern web app with multiple teams that can ship features independently. -- [Micro Frontends](https://micro-frontends.org/)
> 微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。

说人话，微前端就是将不同的功能按照不同的维度拆分成多个子应用。通过主应用（基座）来加载这些子应用。各应用可以独立开发、测试、部署。微前端的核心在于拆，拆完后在合。
![avatar](https://luffycoding.com/assets/img/micro.f96e63e3.png)

### 二、微前端的优势
---

- 独立开发、测试、部署
- 各应用技术栈可以使用不同的技术栈
- 解决协同开发出现的冲突、笨重等痛点

### 三、微前端的方案
--- 

|  方案   | 描述  |  优点 |  缺点  |
|  ----  | ----  | ----  |  ----  |
| iframe嵌套  | 每个子应用使用iframe嵌套 |  实现简单，子应用自带沙箱，相互不会被影响  |  通信麻烦，太过简单(~~low~~)，安全性不高  |
| npm包  | 子应用通过npm包形式发布，在主应用安装使用 | 只能满足独立开发  | 不能单独部署  ----  |
| 中心路由基座 | 统一由基座工程进行管理，按照DOM节点的注册、挂载、卸载来完成。 | 子应用完全独立，测试，部署，可以使用不同技术栈， | 通信方式不够灵活  ----  |

### 四、主流框架
---

1. single-spa：[官网链接](https://single-spa.js.org/docs/getting-started-overview)
- 顾名思义，就是单人水疗的意思。其实！并不是！官方文档特别难懂，喜欢造概念，而且GitHub的demo也特别复杂。
- 有兴趣的可以自行了解，略~
2. qiankun：[官网链接](https://qiankun.umijs.org/zh/guide)
- 乾坤，阿里大神们基于single-spa写的一套微前端框架。中文文档，通俗易懂，github也很生态活跃。

###  五、主应用配置
--- 

此次实践，主应用、子应用都是vue3框架，先介绍主应用配置
#### 5.1 安装qiankun
```shell
yarn add qiankun
```
#### 5.2 改造`main.js`，注册微应用
```javascript
// main.js
import { registerMicroApps, start } from 'qiankun'
const { VUE_APP_ENTRY_URL } = process.env
const pages = [
  {
    name: 'app-police', 
    entry: VUE_APP_ENTRY_URL, // 子应用入口,env变量，根据环境配置
    container: '#appContainer', // 子应用容器，与App.vue对应
    activeRule: '/app-police' // 访问子应用的路径
  }
]

// 注册子应用
registerMicroApps(pages)

// 启动
start()
```
#### 5.3 改造`env`文件，设置对应的环境变量
```javascript
// 生产环境env.production env.uat
VUE_APP_ENTRY_URL = '/child/police/' 

// 开发环境env.development
VUE_APP_ENTRY_URL = '//localhost:7100'
```
#### 5.4 改造App.vue，创建子应用容器
```javascript
// App.vue
<div>
  <router-view />

  <!-- 子应用容器 -->
  <div id="appContainer" />
</div>
```
###  六、子应用配置
---

#### 6.1 使用 webpack 运行时, 配置publicPath 
如果是在qiankun下运行，则qiankun会在微应用bootstrap之前注入一个运行时的publicPath 变量，你需要做的是在微应用的main.js的`顶部`添加如下代码：
```javascript
__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
```
为了优化`main.js`,特在根目录创建`public-path.js`文件
```javascript
//public-path.js

if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

#### 6.2 改造子应用main.js，暴露生命周期
子应用必须在入口文件`main.js`中暴露`bootstrap`,`mount`,`unmount`三个生命周期

```javascript
import '@/hooks/public-path' // publicPath配置注入
import { app } from '@/plugins/app' // vue实例
import router from './router'
import store from './store'
app.config.productionTip = false

let instance = null
function render (props) {
  app.use(store).use(router).mount('#app-police')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: '#app-police' })
}

// 暴露主应用生命周期钩子

// 入口 
export async function bootstrap (props) {
  // 就算没有逻辑，也的暴露这个生命周期
}

// 挂载
export async function mount (props) {
  render(props)
}

// 销毁
export async function unmount (props) {
  instance.$destory()
  instance.$el.innerHTML = ''
  instance = null
}

```
#### 6.3，改造router.js, 子应用路由设置
```javascript
// route/index.js
import { createRouter, createWebHistory } from 'vue-router'

const index = () => import(/* webpackChunkName: "index" */ '@/views/index')
const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  }
]

// 子应用单独运行时，去child/police中获取资源，nginx配置后续介绍
const router = createRouter({
  history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/app-police/' : '/child/police/'),
  routes
})

export default router
```

#### 6.4 改造vue.config.js 部署及跨域配置
```javascript
// vue.config.js
const { name }  = require('./package')
const resolve = dir => path.join(__dirname, dir)
const port = 7100
const { VUE_APP_PUBLIC_PATH } = process.env

const config = {
    filenameHashing: true,
    publicPath: VUE_APP_PUBLIC_PATH,
    devServer: {
        port, // 需要和主应用中注册子应用的端口号相同
        headers: {
            'Access-Control-Allow-Origin': '*' // 解决应用之间跨越
        }
        // ...
    },
    configureWebpack: {
        output: {
            // 把子应用打包成 umd 库格式
            library: name, // 这个name需要和主应用中注册子应用的name相同
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        }
    },
}
// 相应的env文件配置publicPath
VUE_APP_PUBLIC_PATH = '/child/police/' // 开发环境则为 '/'
```
### 七、nginx配置
--- 

#### 7.1 服务器文件目录
```
data                              源码目录
|-- front                         
|   |-- ioc-bigscreen-dev         项目地址
|   |-- |-- static                
|   |-- |-- jsons
|   |-- |-- assets
|   |-- |-- index.html
|   |-- |-- favicon.ico
|   |-- |-- child                  子应用都放在二级目录的child
|   |-- |-- |-- police             警务专题子应用
|   |-- |-- |-- economy            经济专题子应用
|   |-- |-- |-- ...
```
#### 7.2 nginx配置
```shell
server {
  listen       8888;
  server_name localhost ;

  location / {
    root   /data/front/ioc-bigscreen-dev/;
    index  index.html index.htm;
    # history路由模式刷新找不到资源的配置，161/162也加上
    try_files $uri $uri/ /index.html =404; 
  }

  location /child/police {
    root /data/front/ioc-bigscreen-dev/;
    index index.html index.htm;
    # history路由模式刷新找不到资源的配置，161/162也加上
    try_files $uri $uri/ /child/police/index.html;
  }
```

###  八、注意事项
---

在实战中踩到一些坑点，记录如下：

1. 主应用和子应用的路由方式建议保持一致，建议都使用`history`模式
如果使用hash模式，需要增加如下代码，否则不会生效
```javascript
const getActiveRule = (hash) => (location) => location.hash.startsWith(hash);
registerMicroApps([
  {
    name: 'app-hash',
    entry: 'http://localhost:8080',
    container: '#container',
    activeRule: getActiveRule('#/app-hash'),
    // 这里也可以直接写 activeRule: '#/app-hash'，但是如果主应用是 history 模式或者主应用部署在非根目录，这样写不会生效。
  },
]);
```

2. 子应用的publicPath配置需要写在入口文件的顶部，否则会找不到资源

3. 主应用注册子应用入口时,如`/child/police/`，结尾的`/`不能省略，否则无效

4. 控制台报错`Application died in status LOADING_SOURCE_CODE: You need to export the functional lifecycles in xxx entry`
原因：无法从微应用的 entry js 中识别出其导出的生命周期钩子。所以就算子应用对应生命周期没有内容，也不能省略

5. 控制台报错`Application died in status NOT_MOUNTED: Target container with #container not existed after xxx mounted!`
原因：微应用加载后容器 DOM 节点不存在了。可能是和其他id冲突了，所以子应用id建议'app-police'这种格式


###  九、未完成工作
--- 

由于本次探路采用了一个比较简单的警务专题，还有以下工作带完善
1. 主、子应用传参，比如路由，通信
2. 公共组件的封装后上传到npm，各子应用自行`npm install`
3. 虽然qiankun内部有做沙箱处理，但也可能会js/css隔离的问题
....
###  十、遇到的问题及解决方法
1. 子应用的跨域问题
解决办法：在主应用的`config`配置中添加`proxy`
```javascript
export default {
  apps: [
    {
      name: 'app1',
      entry: '//localhost:8081',
      container: '#app1',
      activeRule: '/app1',
    },
    {
      name: 'app2',
      entry: '//localhost:8082',
      container: '#app2',
      activeRule: '/app2',
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // 主应用的启动端口号
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};
```
2. 子应用共享主应用`store`
在注册子应用的时候，通过传`props`给子应用
```javascript

import { loadMicroApp } from 'qiankun';
import store from './store';

loadMicroApp({
  name: 'app1',
  entry: '//localhost:8081',
  container: '#app1',
  props: {
    store,
  },
});
```
在子应用接收prop并在需要的时候进行更新或者使用
```vue
<!-- 子应用文件 -->

<template>
  <div>
    <h1>子应用</h1>
    <p>count: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: ['store'],
  computed: {
    count() {
      return this.store.state.count;
    },
  },
  methods: {
    increment() {
      this.store.commit('increment');
    },
    decrement() {
      this.store.commit('decrement');
    },
  },
};
</script>
```
3. 