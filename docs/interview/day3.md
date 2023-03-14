---
title: 面试+基础 - 20230313
date: 2023-03-14 11:49:20
sidebar: 'auto'
categories: 
 - 面试
tags: 
 - css, js
---

### 怎么判断一个对象是否为空对象
1. ES6`Object.keys()`判断（**推荐**）
`Object.keys()`方法会返回一个由对象自身可枚举属性组成的数组，如果对象为空，则返回一个空数组
```JavaScript
Object.keys(obj).length === 0 ? '空对象': '不是空对象'
```

2. 根据`for...in`遍历对象，如果存在则返回true，否则返回false
```JavaScript
function isEmptyObj(object) {
  for (const key in object) {
    return true
  }

  return false
}
```

3. `JSON.stringify()`转成字符串再判断
```JavaScript
function isEmptyObj(object) {
  if(JSON.stringify(object) === '{}'){
    return true
  }
  return false
}
```

### 怎么判断是否为数组
1. ES6`Array.isArray`方法（**推荐**），需要考虑兼容性
```JavaScript
let arr = [1, 2, 3, 4]
Array.isArray(arr) // true
```

2. `Object.prototype.toString`方法：终极方法，简单粗暴
每个继承`Object`的对象都拥有`toString`的方法
```JavaScript
let arr = [1, 2, 3, 4]
Object.prototype.toString.call(arr) // '[object Array]'
```

所以可以延伸封装一个方法进行判断是否为空数组
```JavaScript
function myIsArray(array) {
  if(!Array.isArray){
    return Object.prototype.toString.call(array) === '[object Array]'
  }

  return Array.isArray(array)
}
```
3. `constructor`方法，不推荐
```JavaScript
let arr = [1,2]
arr.constructor  === Array // true
```

**注意**：此方法不是很准确，因为construtor可以被重写

```JavaScript
let str = 'str'
str.construtor = Array
str.construtor === Array // true
```

4. `instanceof`方法，不推荐
```JavaScript
let arr = [1, 2]
arr instanceof Array // true
```
使用此方法，必须要保证arr由原始的Array构造函数创建出来的才行
`instanceof`是用来检验构造函数的`prototype`属性是否出现在对象上的原型链中的任何位置
```JavaScript
let a = []
a instanceof Array // true 
let b = {}
b instanceof Array // false 
```

当代码拥有多个全局环境，例如html中有多个`iframe`对象。就可能导致错误

```JavaScript
let iframe = document.createElement("iframe")
document.body.appendChild(iframe)

// 取得iframe对象的构造数组方法
let xArray = window.frames[0].Array

// 通过构造函数获取一个实例
let arr = new xArray(1, 2, 3)

arr instanceof Array // false
```
因为arr 是iframe产生的新的全局环境，拥有自己的`Array.prototype`属性