import assign from 'object-assign';
import RcTree from 'rc-tree';

class Tree extends RcTree {
    constructor(props){
        super(props);
    }
}
Tree.displayName = 'Tree';
Tree.propTypes = RcTree.propTypes;
Tree.defaultProps = assign(RcTree.defaultProps, {
    prefixCls: 'kuma-tree',
    showIcon: false
});

Tree.TreeNode = RcTree.TreeNode;

export default Tree;
