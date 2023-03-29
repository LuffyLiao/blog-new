---
title: vue
date: 2023-03-20 11:00:48
sidebar: 'auto'
categories: 
 - 面试
tags: 
 - vue
---

### 如何避免不必要的组件渲染
1. 使用 `v-if` 和 `v-show` 来避免不必要的组件渲染。`v-if`在条件为假时不会渲染组件，而 `v-show` 在条件为假时只是将组件隐藏起来，不会销毁它。因此，在需要经常切换显示和隐藏的元素上使用 `v-show`，而在需要根据条件动态创建或销毁组件的情况下使用 `v-if`
2. 避免在模板中使用复杂的表达式，可以将其提取到计算属性中。这样可以避免在每次重新渲染组件时都重新计算表达式，从而提高性能。
3. 对于大型列表，可以使用虚拟滚动技术来提高性能。这种技术会根据滚动位置动态生成组件，而不是一次性渲染整个列表。
4. 合理使用 `v-for` 的 `key` 属性，避免渲染重复元素。`key` 属性用于帮助 `Vue` 跟踪每个节点的身份，从而避免重复渲染相同的节点。
5. 对于频繁触发的事件，可以使用防抖或节流来减少触发次数。防抖和节流是常用的性能优化技术，可以帮助我们避免在短时间内频繁触发事件，从而减少不必要的组件渲染。
6. 合理使用 `keep-alive` 缓存组件，避免重复渲染。`keep-alive` 可以将需要缓存的组件包裹起来，在组件切换时保留其状态，从而避免重复渲染。

### 什么是虚拟滚动
虚拟滚动是一种优化大型列表的技术，可以在保持流畅滚动的同时，减少对DOM的操作和渲染次数，从而提高性能和用户体验。
1. 手写虚拟滚动：
```vue
<template>
  <div class="container" ref="container" @scroll="onScroll">
    <div class="content" :style="{ height: totalHeight + 'px' }">
      <div v-for="(item, index) in visibleItems" :key="index" class="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // 所有的数据项
      visibleItems: [], // 当前可见的数据项
      itemHeight: 50, // 每个数据项的高度
      visibleCount: 10, // 可见区域内最多显示的数据项数量
      scrollTop: 0, // 当前滚动条位置
    }
  },
  computed: {
    totalHeight() {
      return this.items.length * this.itemHeight
    },
    startIndex() {
      return Math.floor(this.scrollTop / this.itemHeight)
    },
    endIndex() {
      return Math.min(
        this.startIndex + this.visibleCount,
        this.items.length
      )
    },
  },
  methods: {
    onScroll() {
      this.scrollTop = this.$refs.container.scrollTop
      this.updateVisibleItems()
    },
    updateVisibleItems() {
      this.visibleItems = this.items.slice(
        this.startIndex,
        this.endIndex
      )
    },
  },
  created() {
    // 初始化数据项
    for (let i = 0; i < 1000; i++) {
      this.items.push(`Item ${i + 1}`)
    }
    // 初始化可见数据项
    this.updateVisibleItems()
  },
}
</script>

<style>
.container {
  height: 500px;
  overflow-y: auto;
}

.content {
  position: relative;
}

.item {
  height: 50px;
  line-height: 50px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>
```

2. 使用第三方虚拟滚动库：例如 `vue-virtual-scroller`
```vue
<template>
  <div class="container">
    <div class="header">Header</div>
    <vue-virtual-scroller class="list" :items="items" :item-size="40">
      <div class="item" slot-scope="{ item }">{{ item.text }}</div>
    </vue-virtual-scroller>
    <div class="footer">Footer</div>
  </div>
</template>

<script>
import VueVirtualScroller from 'vue-virtual-scroller';

export default {
  components: {
    VueVirtualScroller,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    // 模拟生成大型列表数据
    this.items = Array.from({ length: 100000 }, (_, index) => ({ id: index, text: `Item ${index}` }));
  },
};
</script>

<style>
.container {
  height: 500px;
  overflow: auto;
}

.header,
.footer {
  height: 100px;
  background-color: #f0f0f0;
}

.list {
  height: calc(100% - 200px);
}

.item {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #e0e0e0;
}
</style>
```