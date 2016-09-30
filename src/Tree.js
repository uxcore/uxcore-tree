import assign from 'object-assign';
import RcTree from 'rc-tree';
import classNames from 'classnames';
import { 
    loopAllChildren, handleCheckState, 
    filterParentPosition, getCheck, arraysEqual, 
} from 'rc-tree/lib/util';

let supportSVG = document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");

class Tree extends RcTree {
    constructor(props){
        super(props);
    }

    render() {
        const props = this.props;
        const domProps = {
          className: classNames(props.className, props.prefixCls, {
            'use-svg': supportSVG,
            'no-svg': !supportSVG,
          }),
          role: 'tree-node',
        };
        if (props.focusable) {
          domProps.tabIndex = '0';
          domProps.onKeyDown = this.onKeyDown;
        }
        // console.log(this.state.expandedKeys, this._rawExpandedKeys, props.children);
        if (props.checkable && (this.checkedKeysChange || props.loadData)) {
          if (props.checkStrictly) {
            this.treeNodesStates = {};
            loopAllChildren(props.children, (item, index, pos, keyOrPos, siblingPosition) => {
              this.treeNodesStates[pos] = {
                siblingPosition,
              };
            });
          } else if (props._treeNodesStates) {
            this.treeNodesStates = props._treeNodesStates.treeNodesStates;
            this.halfCheckedKeys = props._treeNodesStates.halfCheckedKeys;
            this.checkedKeys = props._treeNodesStates.checkedKeys;
          } else {
            const checkedKeys = this.state.checkedKeys;
            let checkKeys;
            if (!props.loadData && this.checkKeys && this._checkedKeys &&
              arraysEqual(this._checkedKeys, checkedKeys)) {
              // if checkedKeys the same as _checkedKeys from onCheck, use _checkedKeys.
              checkKeys = this.checkKeys;
            } else {
              const checkedPositions = [];
              this.treeNodesStates = {};
              loopAllChildren(props.children, (item, index, pos, keyOrPos, siblingPosition) => {
                this.treeNodesStates[pos] = {
                  node: item,
                  key: keyOrPos,
                  checked: false,
                  halfChecked: false,
                  siblingPosition,
                };
                if (checkedKeys.indexOf(keyOrPos) !== -1) {
                  this.treeNodesStates[pos].checked = true;
                  checkedPositions.push(pos);
                }
              });
              // if the parent node's key exists, it all children node will be checked
              handleCheckState(this.treeNodesStates, filterParentPosition(checkedPositions), true);
              checkKeys = getCheck(this.treeNodesStates);
            }
            this.halfCheckedKeys = checkKeys.halfCheckedKeys;
            this.checkedKeys = checkKeys.checkedKeys;
          }
        }

        return (
          <ul {...domProps} unselectable ref="tree">
            {React.Children.map(props.children, this.renderTreeNode, this)}
          </ul>
        );
      }
}
Tree.displayName = 'Tree';
Tree.propTypes = RcTree.propTypes;
Tree.defaultProps = assign(RcTree.defaultProps, {
    prefixCls: 'kuma-tree',
    showIcon: false,
});

Tree.TreeNode = RcTree.TreeNode;

export default Tree;
