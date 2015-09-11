# uxcore-tree
---

- tags: uxcore, tree
- description: uxcore tree
- maintainers: vincent.bian
- version: 0.1.1
- lastupdate: 2015/9/11
- screenshots:

## TL;DR

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-tree
$ cd uxcore-tree
$ npm install
$ gulp server
```
nav http://localhost:9090/webpack-dev-server/example/ to see the demo

#### deploy to gh-pages
[refer to]( http://stackoverflow.com/questions/17643381/how-to-upload-my-angularjs-static-site-to-github-pages)
```sh
$ npm run build
$ git add build & git commit -m 'update deploy files'
$ npm run deploy
```

## Usage

```js
var React = require('react');
var Tree = require('uxcore-tree');
var TreeNode = Tree.TreeNode;
React.render(
  <Tree>
    <TreeNode>leaf </TreeNode>
    <TreeNode>leaf </TreeNode>
  <Tree/>, container);
```

### demo
http://uxcore.github.io/uxcore-tree/

## API

### Tree props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|className | additional css class of root dom node | String | '' |
|prefixCls | prefix class | String | 'kuma-tree' |
|showLine | whether show line | bool | true |
|showIcon | whether show icon | bool | true |
|multiple | whether multiple select | bool | false |
|checkable | whether support checked | bool/React Node | false |
|defaultExpandAll | expand all treeNodes | bool | false |
|defaultExpandedKeys | expand specific treeNodes | String[] | false |
|defaultCheckedKeys | default checked treeNodes | String[] | [] |
|defaultSelectedKeys | default selected treeNodes | String[] | [] |
|onCheck | click the treeNode/checkbox to fire | function(e:{checked:bool,node,checkedKeys,event}) | - |
|onSelect | click the treeNode to fire | function(e:{selected:bool,node,checkedKeys,event}) | - |

### TreeNode props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|className | additional class to treeNode | String | '' |
|disabled | whether disabled the treeNode | bool | false |
|title | tree/subTree's title | String | '---' |
|key | it's used with tree props's defaultExpandedKeys/defaultCheckedKeys/defaultSelectedKeys | String | treeNode's position |
