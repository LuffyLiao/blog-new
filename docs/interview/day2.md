---
title: 面试+基础 - 20230313
date: 2023-03-13 20:26:08
sidebar: 'auto'
categories: 
 - 面试
tags: 
 - css, js
---

### 水平居中的几种方式
- flex 布局
```css
.father {
  display: flex;
  justify-content: center;
  align-items: center;
}
.son{

}
```

- 绝对定位 + margin:auto
```css
.father{
  position: relative;
}

.son{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```

- 绝对定位 + transform
```css
.father {
  position: relative;
}

.son{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- 绝对定位 + 负margin（需要已知自身宽高）
```css
.father{
  width: 300px;
  height: 300px;
  position: relative;
}

.son{
  width: 100px;
  height: 100px;
  position: absolute;
  margin-left: -50px; // width的一半
  margin-top: - 50px; // height的一半
}
```

- 绝对定位 + calc函数（需要已知自身宽高）。需要兼容calc函数

```css
.father{
  width: 300px;
  height: 300px;
  position: relative;
}

.son{
  width: 100px;
  height: 100px;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  position: absolute;
}
```

- grid布局，需要兼容grid属性

```css
.father {
  display: grid;
  justify-content: center;
  align-items: center;
}

.son{
  
}
```

### 前端如何实现token加密
1. 前后端约定一个secret（随机数）
2. 在登录成功时，后端使用secret和加密算法生成一个字符串，返回token
3. 在request封装时，将每次request时在header中带上token
4. 后端用同样的方式解密

### 同一域名、不同端口的cookie和localStorage是否能共享
1. cookie 可以
  - Cookie的作用域仅仅有``domain`和`path`决定，与`协议`和`端口`无关
  - 相同域名下，不同端口，cookie名字、路径都相同的情况下，后面的cookie会覆盖前面的cookie
2. localStorage不可以

