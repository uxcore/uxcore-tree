import React from 'react';
import Tree from '../src/index';
let TreeNode = Tree.TreeNode;

function handleSelect(e) {
  console.log(e.event, e.node, 'selected:', e.selected);
}

function handleCheck(info) {
  console.log('check: ', info);
}

export class CheckedDemo extends React.Component {
  constructor(props) {
    super(props);
    ['handleClick'].forEach((m)=> {
      this[m] = this[m].bind(this);
    });
    this.state = {
      checkedKeys: [],
      selectedKeys: []
    };
  }
  handleClick() {
    this.setState({
      checkedKeys: ['p11'],
      selectedKeys: ['p21', 'p11']
    });
  }
  render() {
    return <div>
      <div>
        <h2>checked</h2>
        <Tree showLine={true} defaultExpandAll={true} checkable={true}
              onCheck={handleCheck} defaultCheckedKeys={['p1', 'p22']} checkedKeys={this.state.checkedKeys}
              defaultSelectedKeys={['p11']} selectedKeys={this.state.selectedKeys} multiple>
          <TreeNode title="parent 1" key="p1">
            <TreeNode key="p10" title="leaf"/>
            <TreeNode title="parent 1-1" key="p11">
              <TreeNode title="parent 2-1" key="p21">
                <TreeNode>test</TreeNode>
                <TreeNode title={<span>sss</span>}/>
              </TreeNode>
              <TreeNode key="p22" title="leaf"/>
            </TreeNode>
          </TreeNode>
          <TreeNode key="p12" title="leaf"/>
        </Tree>
      </div>
      <button onClick={this.handleClick}>check sth</button>
    </div>
  }
}

export let ExpandDemo = (<div>
    <h2>expanded</h2>
    <Tree defaultExpandAll={false}>
      <TreeNode title="parent 1" key="p1">
        <TreeNode key="p10" title="leaf"/>
        <TreeNode title="parent 1-1" key="p11">
          <TreeNode title="parent 2-1" key="p21">
            <TreeNode title="leaf"/>
            <TreeNode title="leaf"/>
          </TreeNode>
          <TreeNode key="p22" title="leaf"/>
        </TreeNode>
      </TreeNode>
    </Tree>
</div>);

export let SimpleDemo = (<div>
    <h2>simple</h2>
    <Tree className="myCls" onSelect={handleSelect} defaultSelectedKeys={['0-1', '0-1-1']} multiple={true}
      defaultExpandAll={true} showLine={true}>
      <TreeNode title="parent 1" key="0-1">
        <TreeNode title="parent 1-0" key="0-1-1">
          <TreeNode title="leaf" />
          <TreeNode title="leaf" />
        </TreeNode>
        <TreeNode title="parent 1-1">
          <TreeNode title="leaf" />
        </TreeNode>
      </TreeNode>
    </Tree>
</div>);
