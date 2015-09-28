import React from 'react';
import assign from 'object-assign';
import RcTree from 'rc-tree';
import {classSet} from 'rc-util';
const RcTreeNode = RcTree.TreeNode;

export default class Tree extends RcTree {
    constructor(props){
        super(props);
    }
}
Tree.displayName = 'uxcore-tree';
Tree.propTypes = RcTree.propTypes;
assign(RcTree.defaultProps, {
  prefixCls: 'kuma-tree',
  showIcon: false
});

export class TreeNode extends RcTreeNode {
    constructor(props){
        super(props);
    }
}
TreeNode.displayName = 'uxcore-treenode';
TreeNode.propTypes = RcTreeNode.propTypes;
assign(RcTreeNode.defaultProps, {
});
