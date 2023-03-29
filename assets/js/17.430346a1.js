(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{535:function(t,i,v){"use strict";v.r(i);var a=v(7),s=Object(a.a)({},(function(){var t=this,i=t.$createElement,v=t._self._c||i;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h3",{attrs:{id:"使用css3-transform-translate-50-50-居中时-为什么有时会导致像素模糊"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#使用css3-transform-translate-50-50-居中时-为什么有时会导致像素模糊"}},[t._v("#")]),t._v(" 使用CSS3 transform: (translate(50%,50%)居中时，为什么有时会导致像素模糊")]),t._v(" "),v("ul",[v("li",[t._v("原因：\n"),v("ul",[v("li",[t._v("当前设置tansform: translate(50%,50%)元素的高度与宽度设置的为奇数\n"),v("ul",[v("li",[t._v("就会导致translate转换的为0.5的小数（例：width为199px；那么50%的width就是99.5px）")])])]),t._v(" "),v("li",[t._v("当元素进入GPU渲染时，此时若transform的值为非整数，就会导致字体和图片模糊")])])]),t._v(" "),v("li",[t._v("解决：\n"),v("ul",[v("li",[t._v("在已知宽高的情况下：给当前需要居中的宽高设置为偶数位；不用trasform来居中，用margin\n"),v("ul",[v("li",[t._v("在不知道宽高的情况：可以用flex布局；在translate XY方法各加0.5px，用calc函数计算")])])])])]),t._v(" "),v("li",[t._v("另外测试中还发现如果是接近整数的小数(1.99,1.88)就不会出现模糊")])]),t._v(" "),v("h3",{attrs:{id:"css3伪类选择器"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#css3伪类选择器"}},[t._v("#")]),t._v(" CSS3伪类选择器")]),t._v(" "),v("ul",[v("li",[t._v("写法特点：前面有个冒号")]),t._v(" "),v("li",[v("code",[t._v(":first-child")]),t._v("：找到第一个子元素，last则为找到最后一个子元素")]),t._v(" "),v("li",[v("code",[t._v("p:first-of-type")]),t._v("：找到第一个p，不需要是第一个子元素，只是要找到父元素中第一个p")]),t._v(" "),v("li",[v("code",[t._v(":nth-child-even")]),t._v("：找到所有偶数子元素，"),v("code",[t._v(":first-child-odd")]),t._v("：找到所有奇数子元素")]),t._v(" "),v("li",[v("code",[t._v(":not()")]),t._v("：除了括号中的元素")]),t._v(" "),v("li",[v("code",[t._v(":checked")]),t._v("：单选框或复选框被选中")]),t._v(" "),v("li",[v("code",[t._v("::before")]),t._v(": 在元素之前添加内容，"),v("code",[t._v("::after")]),t._v("在元素之后添加内容")])]),t._v(" "),v("h3",{attrs:{id:"分析比较-opacity-0、visibility-hidden、display-none"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分析比较-opacity-0、visibility-hidden、display-none"}},[t._v("#")]),t._v(" 分析比较 opacity: 0、visibility: hidden、display: none")]),t._v(" "),v("ul",[v("li",[v("code",[t._v("display: none")]),t._v(" （不占空间，不能点击，回流+重绘）（场景，显示出原来这里不存在的结构）")]),t._v(" "),v("li",[v("code",[t._v("visibility: hidden")]),t._v("（占据空间，不能点击，重绘）（场景：显示不会导致页面结构发生变动，不会撑开）")]),t._v(" "),v("li",[v("code",[t._v("opacity: 0")]),t._v("（占据空间，可以点击，重建图层，性能较高）（场景：可以跟transition搭配，自定义图片上传按钮）")])]),t._v(" "),v("h3",{attrs:{id:"什么是重绘和回流"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#什么是重绘和回流"}},[t._v("#")]),t._v(" 什么是重绘和回流")]),t._v(" "),v("ul",[v("li",[t._v("重绘：DOM节点元素"),v("strong",[t._v("没有删除，增加，移动，尺寸改变的情况，元素只有样式上的改变")]),t._v("，浏览器针对样式的改变对视图进行一个重新绘制，比如"),v("code",[t._v("color，backgroud")]),t._v("的改变，就是典型的重绘")]),t._v(" "),v("li",[t._v("回流：也叫重排，指DOM节点元素出现"),v("strong",[t._v("删除，增加，移动，尺寸改变的情况")]),t._v("，浏览器需要针对元素进行重新构建和渲染，这个过程就是回流")])])])}),[],!1,null,null,null);i.default=s.exports}}]);