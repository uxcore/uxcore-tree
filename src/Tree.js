import React from 'react';
import assign from 'object-assign';
import RcTree from 'rc-tree';

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
