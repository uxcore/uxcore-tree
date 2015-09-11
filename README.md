<<<<<<< HEAD
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
=======
# tree

- tags: uxcore,component,tree
- description: tree ui component for react
- maintainers: vincent.bian
- version: 0.1.0
- lastupadate: 2015/8/22
- screenshots:

---

## TL;DR

tree ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/tree
$ cd tree
$ npm install
$ git submodule add git@github.com:uxcore/kuma style/kuma
$ git submodule init
$ git submodule update
$ npm run dev
```

>>>>>>> ccdd68308a684541e5b0ab5b278a32fb7c184d69
nav http://localhost:9090/webpack-dev-server/example/ to see the demo

#### deploy to gh-pages
[refer to]( http://stackoverflow.com/questions/17643381/how-to-upload-my-angularjs-static-site-to-github-pages)
```sh
$ npm run build
$ git add build & git commit -m 'update deploy files'
$ npm run deploy
```

## Usage

<<<<<<< HEAD
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
=======
### demo
http://uxcore.github.io/tree/

### props

#### Tree

|参数|说明|类型|默认值|
|---|----|---|------|
|className | additional css class of root dom node | String | '' |
|prefixCls | prefix class | String | '' |
>>>>>>> ccdd68308a684541e5b0ab5b278a32fb7c184d69
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

<<<<<<< HEAD
### TreeNode props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
=======
#### TreeNode

|参数|说明|类型|默认值|
|---|----|---|------|
>>>>>>> ccdd68308a684541e5b0ab5b278a32fb7c184d69
|className | additional class to treeNode | String | '' |
|disabled | whether disabled the treeNode | bool | false |
|title | tree/subTree's title | String | '---' |
|key | it's used with tree props's defaultExpandedKeys/defaultCheckedKeys/defaultSelectedKeys | String | treeNode's position |
