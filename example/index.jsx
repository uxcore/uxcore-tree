/**
 * example index
 */
import '../style/kuma/src/less/kuma-webpack.less';
import React from 'react';
import Tree, {TreeNode} from '../index';

function handleSelect(info) {
  console.log('selected', info);
}

function handleCheck(info) {
  console.log('check: ', info);
}

var demo = (
  <div>
    <h2>simple</h2>
    <Tree className="myCls" onSelect={handleSelect} defaultSelectedKeys={['0-1', '0-1-1']} multiple={true}
      defaultExpandAll={true} showIcon={false} showLine={true}>
      <TreeNode title="parent 1" key="0-1">
        <TreeNode title="parent 1-0" key="0-1-1">
          <TreeNode>leaf </TreeNode>
          <TreeNode>leaf </TreeNode>
        </TreeNode>
        <TreeNode title="parent 1-1">
          <TreeNode>leaf </TreeNode>
          <TreeNode>leaf </TreeNode>
        </TreeNode>
      </TreeNode>
    </Tree>
    <h2>checked</h2>
    <Tree defaultExpandAll={true} checkable={true}
      onCheck={handleCheck} defaultCheckedKeys={['p1', 'p22']}>
      <TreeNode title="parent 1" key="p1" >
        <TreeNode key="p10">leaf </TreeNode>
        <TreeNode title="parent 1-1" key="p11">
          <TreeNode title="parent 2-1" key="p21">
            <TreeNode><span>sss</span></TreeNode>
            <TreeNode>leaf </TreeNode>
          </TreeNode>
          <TreeNode key="p22">leaf</TreeNode>
        </TreeNode>
      </TreeNode>
      <TreeNode key="p12">leaf</TreeNode>
      <TreeNode>
        <TreeNode>
          <TreeNode>leaf </TreeNode>
          <TreeNode>leaf </TreeNode>
        </TreeNode>
        <TreeNode>leaf </TreeNode>
      </TreeNode>
    </Tree>
    <h2>expanded</h2>
    <Tree defaultExpandedKeys={['p1', 'p11']}>
      <TreeNode title="parent 1" key="p1">
        <TreeNode key="p10">leaf </TreeNode>
        <TreeNode title="parent 1-1" key="p11">
          <TreeNode title="parent 2-1" key="p21">
            <TreeNode>leaf </TreeNode>
            <TreeNode>leaf </TreeNode>
          </TreeNode>
          <TreeNode key="p22">leaf</TreeNode>
        </TreeNode>
      </TreeNode>
      <TreeNode key="p12">leaf</TreeNode>
    </Tree>
  </div>
);

React.render(demo, document.getElementById('content'));
