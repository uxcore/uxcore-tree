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
Tree.displayName = 'Tree';
Tree.propTypes = RcTree.propTypes;
assign(RcTree.defaultProps, {
    prefixCls: 'kuma-tree',
    showIcon: false
});
