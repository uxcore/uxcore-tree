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
  prefixCls: 'kuma-tree'
});

export class TreeNode extends RcTreeNode {
    constructor(props){
        super(props);
    }
    renderChildren(props) {
      const children = props.children;
      let newChildren = children;
      if (children.type === TreeNode || Array.isArray(children) &&
          children.every((item) => {
            return item.type === TreeNode;
          })) {
        const cls = {
          [`${props.prefixCls}-child-tree`]: true,
          [`${props.prefixCls}-child-tree-open`]: props.expanded,
        };
        if (props.showLine) {
          cls[`${props.prefixCls}-line`] = this.getPosition(props.pos).center;
        }
        newChildren = this.newChildren = (
            <ul className={classSet(cls)} expanded={props.expanded}>
              {React.Children.map(children, (item, index) => {
                return props.root.renderTreeNode(item, index, props.pos);
              }, props.root)}
            </ul>
        );
      }
      return newChildren;
    }
}
TreeNode.displayName = 'uxcore-treenode';
TreeNode.propTypes = RcTreeNode.propTypes;
assign(RcTreeNode.defaultProps, {
});
