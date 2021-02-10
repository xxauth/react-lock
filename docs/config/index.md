---
title: 配置
nav:
  order: 1
  title: 配置
toc: menu
---

## Props

### transformer

- type: `object`

默认值为

```js
{
  from: schema => schema,
  to: schema => schema
}
```

`from` 写从你需要的 schema 到 form-render 的 schema 的转换函数  
`to` 写反向的转换函数

### extraButtons

- type: `array`

例如：

```js
[
  {
    text: '保存',
    onClick: () => {
      alert(1);
    },
  },
  {
    text: '跳转',
    onClick: () => {
      window.open('https://www.taobao.com');
    },
  },
];
```

1. 自定义按钮接受所有 antd 的 props，同时还支持 text 参数用于简单设置按钮文案
2. 在编辑区顶部添加更多的自定义按钮。可能你也希望能去掉一些默认展示的按钮，例如我不想要“导入”这个按钮，这也可以通过这个 props 实现，“导入”是默认展示里的第三个按钮，那么如下配置：

```js
extraButtons: [true, true, false, true, { text: '测试' }];
```

简单的说，将不需要的按钮配为`false`，需要的按钮配为`true`。注意只有这两个值会被读取。

### settings | commonSettings | globalSettings

- type: `array` | `object` | `object`

### widgets

- type: 'object'

简单的说：

1. 写一个自定义组件

```js
const A = () => <div>hello</div>;
```

## 方法

### getValue

- type: `function`

可以从 ref 中取到 getValue 方法，获取导出的 schema 值，详见“开始使用”中的现实样例

### setValue

- type: `function`

(schema) => void。从外部强制修改表单设计器的现有 schema

### copyValue

- type: `function`

调用可将现有 schema 拷贝到剪贴板

## 注意

使用此组件时，外层要包裹的 div **一定要给一个高度**，否则会默认 min-height: 30vh
