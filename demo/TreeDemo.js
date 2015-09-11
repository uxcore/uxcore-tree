import React from 'react';
import Tree from '../src/index';
let TreeNode = Tree.TreeNode;

function handleSelect(e) {
  console.log(e.event, e.node, 'selected:', e.selected);
}

export default class Demo extends React.Component {
    render(){
        return (
            <div>
              <h2>tree</h2>

              <Tree className="myCls" onSelect={handleSelect} checkable={true}>
                <TreeNode title="parent 1" expanded={false} onSelect={handleSelect}>
                  <TreeNode>leaf </TreeNode>
                  <TreeNode title="parent 1-1">
                    <TreeNode title="parent 2-1">
                      <TreeNode>leaf </TreeNode>
                      <TreeNode>leaf </TreeNode>
                    </TreeNode>
                    <TreeNode>leaf </TreeNode>
                    <TreeNode>leaf </TreeNode>
                  </TreeNode>
                </TreeNode>
                <TreeNode>leaf </TreeNode>
                <TreeNode>
                  <TreeNode>leaf </TreeNode>
                </TreeNode>
              </Tree>

            </div>
        );
    }
}
