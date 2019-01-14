import assign from 'object-assign';
import RcTree from 'rc-tree';
import classNames from 'classnames';
import React from 'react';
import cssAnimation from 'css-animation';
import ActionTreeNode from './ActionTreeNode';

/* eslint-disable no-param-reassign */
const animate = (node, show, done) => {
  let height;
  return cssAnimation(node, 'kuma-tree-collapse', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
        node.style.opacity = 1;
      } else {
        height = node.offsetHeight;
        node.style.height = '0';
        node.style.opacity = '0';
      }
    },
    active() {
      node.style.height = `${show ? height : 0}px`;
      node.style.opacity = show ? 1 : 0;
    },
    end() {
      node.style.height = '';
      node.style.opacity = '';
      done();
    },
  });
};

const animation = {
  enter(node, done) {
    return animate(node, true, done);
  },
  leave(node, done) {
    return animate(node, false, done);
  },
  appear(node, done) {
    return animate(node, true, done);
  },
};

class Tree extends RcTree {
  render() {
    const {
      prefixCls, className, focusable,
      showLine,
      children,
    } = this.props;
    let supportSVG = false;
    if (document) {
      supportSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
    }
    const domProps = {
      className: classNames(className, prefixCls, {
        'use-svg': supportSVG,
        'no-svg': !supportSVG,
        [`${prefixCls}-show-line`]: showLine,
      }),
      role: 'tree-node',
    };
    if (focusable) {
      domProps.tabIndex = '0';
      domProps.onKeyDown = this.onKeyDown;
    }

    return (
      <ul
        {...domProps}
        unselectable="on"
        ref={(c) => { this.tree = c; }}
      >
        {React.Children.map(children, this.renderTreeNode, this)}
      </ul>
    );
  }
}
Tree.displayName = 'Tree';
Tree.propTypes = RcTree.propTypes;
Tree.defaultProps = assign(RcTree.defaultProps, {
  prefixCls: 'kuma-tree',
  showIcon: false,
  openAnimation: animation,
});

Tree.TreeNode = RcTree.TreeNode;
Tree.ActionTreeNode = ActionTreeNode;

export default Tree;
