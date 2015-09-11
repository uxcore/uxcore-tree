import RcTree from 'rc-tree';
import assign from 'object-assign';

export default class Tree extends RcTree {
	constructor(props){
		super(props);
	}
}
Tree.defaultProps = assign(RcTree.defaultProps, {
	prefixCls: 'kuma-tree'
});
Tree.propTypes = RcTree.propTypes;
