---
title: 算法题day01
date: 2023-02-27 23:26:31
sidebar: 'auto'
categories: 
 - 算法题
tags: 
 - 算法
---

### 两数之和
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

```html
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

```html
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```
```html
输入：nums = [3,2,4], target = 6
输出：[1,2]
```
```html
输入：nums = [3,3], target = 6
输出：[0,1]
```

### 解答思路
核心思路：
1. 遍历nums
2. 使用target减去nums的每一项，如果有则返回下标，无则添加
拆解：
1. 可以new 一个Map映射 `let map = new Map({ num1:index1, num2:index2 })`
2. 使用map.has判断是否存在对应属性的值
3. 如果有值就map.get 获取对应属性的下标
4. 如果没有值就map.set 设置无对象属性的值以及下标

### 答案
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) { 
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if(map.has(target - nums[i])){
      return [map.get(target - nums[i]), i ]
    }else{
      map.set(nums[i], 1)
    }
  }

  return [] 
};
```