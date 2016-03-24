import React from 'react';
import Tree from '../src/index';
let TreeNode = Tree.TreeNode;
let deepcopy = require('deepcopy');

class CheckedDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: []
    };
  }
  handleCheck(keys) {

    
    this.setState({
      checkedKeys: keys
    });
  }
  render() {
    return <div>
      <div>
        <h2>checked</h2>
        <Tree showLine={true} defaultExpandAll={true} checkable={true}
              onCheck={this.handleCheck.bind(this)} checkedKeys={this.state.checkedKeys}>
          <TreeNode title="parent 1" key="p1">
            <TreeNode key="p10" title="leaf"/>
            <TreeNode title="parent 1-1" key="p11">
              <TreeNode title="parent 2-1" key="p21">
                <TreeNode title="test" />
                <TreeNode title={<span>sss</span>}/>
              </TreeNode>
              <TreeNode key="p22" title="leaf"/>
            </TreeNode>
          </TreeNode>
          <TreeNode key="p12" title="leaf"/>
        </Tree>
      </div>
    </div>
  }
}

export default CheckedDemo;

