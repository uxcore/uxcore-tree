import assign from 'object-assign';
import RcTree from 'rc-tree';

let supportSVG = document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");

class Tree extends RcTree {
    constructor(props){
        super(props);
    }
}
Tree.displayName = 'Tree';
Tree.propTypes = RcTree.propTypes;
Tree.defaultProps = assign(RcTree.defaultProps, {
    prefixCls: 'kuma-tree',
    showIcon: false,
    className: supportSVG ? 'use-svg': 'no-svg'
});

Tree.TreeNode = RcTree.TreeNode;

export default Tree;
