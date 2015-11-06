# uxcore-tree
---

## TL;DR
tree ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-tree
$ cd uxcore-tree
$ npm install
$ gulp server
```

## Usage

```js
var Tree = require('uxcore-tree');
var TreeNode = Tree.TreeNode;
React.render(
  <Tree>
    <TreeNode>leaf </TreeNode>
    <TreeNode>leaf </TreeNode>
  <Tree/>, container);
```

### demo
http://uxcore.github.io/uxcore/components/tree/

## API

### Tree props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|className | additional css class of root dom node | String | '' |
|prefixCls | prefix class | String | 'kuma-tree' |
|showLine | whether show line | bool | false |
|multiple | whether multiple select | bool | false |
|checkable | whether support checked | bool/React Node | false |
|defaultExpandAll | expand all treeNodes | bool | false |
|defaultExpandedKeys | expand specific treeNodes | String[] | false |
|defaultCheckedKeys | default checked treeNodes | String[] | [] |
|checkedKeys | Controlled checked treeNodes(After setting, defaultCheckedKeys will not work) | String[] | [] |
|defaultSelectedKeys | default selected treeNodes | String[] | [] |
|selectedKeys | Controlled selected treeNodes(After setting, defaultSelectedKeys will not work) | String[] | [] |
|onCheck | click the treeNode/checkbox to fire | function(e:{checked:bool,node,checkedKeys,event}) | - |
|onSelect | click the treeNode to fire | function(e:{selected:bool,node,checkedKeys,event}) | - |
|onDataLoaded | load data asynchronously and the return value should be a promise | function(node) | - |
|onRightClick | select current treeNode and show customized contextmenu | function({event,node}) | - |

### TreeNode props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|className | additional class to treeNode | String | '' |
|disabled | whether disabled the treeNode | bool | false |
|title | tree/subTree's title | String | '---' |
|key | it's used with tree props's defaultExpandedKeys/defaultCheckedKeys/defaultSelectedKeys | String | treeNode's position |
