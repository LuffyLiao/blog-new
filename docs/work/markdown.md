---
title: MD语法入门
date: 2021-08-16 17:31:10
sidebar: 'auto'
categories: 
 - 应届生培训
tags: 
 - 应届生培训
---

####  一、什么是markdown
> Markdown 是一种轻量级标记语言，创始人为 John Gruber。它允许人们「使用易读易写的纯文本格式编写文档，然后转换成有效的 XHTML（或者 HTML）文档」。——维基百科
说人话，Markdown 与 HTML 语言一样，使用一些符号就代替样式。但是它比 HTML 语言更加简单。例如我想要实现标题样式，那么你可以这么做：
```markdown
# 一级标题  -> h1
## 二级标题 -> h2
### 三级标题 -> h3
#### 四级标题  -> h4
```
#### 二、 markdown语法
####  2.1.1 标题 （略）
参考上面
####  2.1.2 加粗、斜体
使用`*`代表斜体，`**`代表加粗，`***`代表斜体并加粗
```markdown
*斜体*  -> i
**加粗**  -> b
***加粗斜体***  -> b&i
```
*斜体*  -> i
**加粗**  -> b
***加粗斜体***  -> b&i
####  2.1.3 无序列表
使用`-`或`*`
```markdown
- 使用中划线
* 使用星号
```
- 使用中划线
* 使用星号
####  2.1.4 有序列表
使用`数字`+`.`
```markdown
1. 是的
2. 好的
```
1. 是的
2. 好的
####  2.1.5 代码块
```markdown
使用 ```代表代码块引用```
```
####  2.1.6 引用
使用`>`表示引用
```
> 这是引用
```
> 这是引用

####  2.1.7 超链接

 使用`[]()`来表示超链接，中括号表示链接文字，小括号表示链接地址
  [百度](www.baidu.com)
 ####  2.1.8 图片

图片的样式与超链接非常相似，只需在前面加个感叹号就可以了，即用`![]()`表示图片。其中中括号表示图片未加载时的提示文字，小括号表示图片地址。
```markdown


![]
https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3491944620,2591964170&fm=58)
```
![](
https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3491944620,2591964170&fm=58)

####  2.1.9 水平分割线

使用 `---` 来表示分割线
```markdown
下面是分割线
---
```
  ###### 下面是分割线
---
####  2.1.10 表格

使用一根竖线来分隔各个单元格，使用冒号来决定单元格的对齐方向。
左对齐`:---`，右对齐`---:`, 居中对齐`:---:`
```
| 序号 | 内容 |
| :--- | ---: |
| 01 | 小明少时诵诗书 |
| 02 | 小红是是是是 |

居中
| 序号 | 内容 |
| :---: | :---: |
| 01 | 小明少时诵诗书 |
| 02 | 小红是是是是 |
```
| 序号 | 内容 |
| :--- | ---: |
| 01 | 小明少时诵诗书 |
| 02 | 小红是是是是 |

居中
| 序号 | 内容 |
| :---: | :---: |
| 01 | 小明少时诵诗书 |
| 02 | 小红是是是是 |
####  三、使用场景
对于页面结构看起来清爽的页面，例如博客：github 简书 语雀 showDoc ...

####  四、编辑工具
vscode、Typora、印象笔记、有道云笔记