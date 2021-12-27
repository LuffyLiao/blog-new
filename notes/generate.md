---
title: 异步不可怕
date: 2021-12-27 22:25:30
sidebar: 'auto'
categories: 
 - 日常笔记
tags: 
 - promise
---

### 异步小案例
--- 

### 红绿灯任务
---

红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次，如何让3个灯不断重复交替地亮呢?
已知3个亮灯函数已经存在，如下
```javascript
function red() {
  console.log('红灯亮')
}

function green() {
  console.log('绿灯亮')
}

function yellow() {
  console.log('黄灯亮')
}
```

1. 首先从最简单、最容易理解的`callback`方案入手，代码如下

```javascript
const task = (timer, light, callback) =>{
  setTimeout(() => {
    switch (light) {
      case 'red':
        red()
        break;
      case 'yellow':
        yellow()
        break;
      case 'green':
        green()
        break;  
      default:
        break;
    }
    callback()
  }, timer)
}

const step = () => {
  task(3000, 'red', () => {
    task(1000, 'green', () =>{
      task(2000, 'yellow', step)
    })
  })
}

step()
```

2. 可以很明显地看到地域回调的痛苦，那么如果用`Promise`方案实现的话，可以将回调移除，在一次亮灯结束后，对当前`Promise`进行决议，最后使用递归，调用step函数，代码如下

```javascript
const task = (timer, light) =>{
  new Promise((resolve, reject) =>{
    setTimeout(() => {
      switch (light) {
        case 'red':
          red()
          break;
        case 'yellow':
          yellow()
          break;
        case 'green':
          green()
          break;  
        default:
          break;
      }
      resolve()
    }, timer)
  })
}

const step = () => {
  task(3000, 'red')
    .then(() => task(1000, 'green'))
    .then(() => task(2000, 'yellow'))
    .then(step)
}

step()
```

3. 用`async/await`接着优化一下，代码如下

```javascript
const step = async () => {
  await task(3000, 'red')
  await task(1000, 'green')
  await task(2000, 'yellow')
  step()
}

step()
```

### 请求图片进行预先加载
