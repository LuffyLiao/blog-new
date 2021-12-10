---
title: git提交规范
date: 2021-12-10 10:37:45
sidebar: 'auto'
categories: 
 - Enter categories
tags: 
 - Enter categories
---
### git提交规范

### 一、目的
--- 
1. 统一代码风格，提交前会强制检验更改文件是否符合eslint规范
2. 优化 commit log记录，便于后续复查

### 二、commit提交规范：
--- 

#### 2.1 提交格式
 **`git commit -m "<type>[scope]: 提交的主题"`**

#### 2.2 参数说明：
- tpye: **必填项**，具体如下：
  - feature: 新功能
  - update: 更新某功能
  - fix: 修补某功能的bug
  - refactor: 重构某个功能
  - optimize: 优化构建工具或运行时性能
  - style: 仅样式改动
  - docs: 仅文档新增/改动
  - chore: 构建过程或辅助工具的变动
- scope：**可选项**：为每个专题的名称, 目前有`今日深圳`和`二十大`，后续可增加配置
- 以上参数如需新增或更改，可在`commitlint.config.js`配置

#### 2.3 注意事项：
- 冒号后有一个空格
- 括号与冒号为英文字符
- 使用命令行提交，log 需用双引号而非单引号

#### 2.4 示例：
  - 错误提交：
    - `git commit -m "增加翻页功能"` ，错误原因：缺乏 **type**
    - `git commit -m "add:增加翻页功能"`，错误原因：**type 值：add** 不存在于配置文件commitlint.config.js type-enum 的枚举范围内
    - `git commit -m "feature(专题三): 增加翻页功能"`，错误原因：**scope 值：专题三** 不存在于配置文件 scope-enum 的枚举范围内
  - 正确提交：
    - `git commit -m "feature: 增加翻页功能"` // scope 为可选项，不填写 scope 也可以
    - `git commit -m "feature(今日深圳): 增加翻页功能"` // 标准格式

### 三、其他
  1. **语法校验**会在提交时自动执行，具体判断规则可在 .eslintrc.js 查看
  2. **风格格式化**会自动执行，具体判断规则可在 .prettierrc.js 查看
  3. 当代码校验不通过时，终端会报某行违反某字段，**请根据提示手动更改代码**
  4. 如需详细说明或者新增语法校验的规则可查看[Eslint 官方规则配置](https://eslint.org/docs/rules/)