import React from 'react';
import { gData, gDropDownData, getRadioSelectKeys } from './util';
import Tree from '../src/index';
import Menu from 'uxcore-menu';

const { TreeNode, DropdownTreeNode } = Tree;

const Demo = React.createClass({
  propTypes: {
    multiple: React.PropTypes.bool,
  },
  getDefaultProps() {
    return {
      multiple: true,
    };
  },
  getInitialState() {
    return {
      // expandedKeys: getFilterExpandedKeys(gData, ['0-0-0-key']),
      expandedKeys: ['0-0-0-key'],
      autoExpandParent: true,
      // checkedKeys: ['0-0-0-0-key', '0-0-1-0-key', '0-1-0-0-key'],
      checkedKeys: ['0-0-key'],
      checkStrictlyKeys: {},
      selectedKeys: [],
      gData,
    };
  },
  onDragStart(info) {
    console.log('start', info);
  },
  onDragEnter(info) {
    console.log('enter', info);
    this.setState({
      expandedKeys: info.expandedKeys,
    });
  },
  onDrop(info) {
    console.log('drop', info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    }
    this.setState({
      gData: data,
    });
  },
  onExpand(expandedKeys, ...args) {
    console.log('onExpand', args);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded chilren keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  },
  onCheck(checkedKeys) {
    console.log('onCheck', checkedKeys);
    this.setState({
      checkedKeys,
    });
  },
  onCheckStrictly(checkedKeys, ...args /* extra */) {
    console.log('onCheckStrictly');
    console.log(args);
    // const { checkedNodesPositions } = extra;
    // const pps = filterParentPosition(checkedNodesPositions.map(i => i.pos));
    // console.log(checkedNodesPositions.filter(i => pps.indexOf(i.pos) > -1).map(i => i.node.key));
    const cks = {
      checked: checkedKeys.checked || checkedKeys,
      halfChecked: [`0-0-${parseInt(Math.random() * 3, 10)}-key`],
    };
    this.setState({
      // checkedKeys,
      checkStrictlyKeys: cks,
      // checkStrictlyKeys: checkedKeys,
    });
  },
  onSelect(selectedKeys, info) {
    console.log('onSelect', selectedKeys, info);
    this.setState({
      selectedKeys,
    });
  },
  onRbSelect(selectedKeys, info) {
    console.log('onRbSelect');
    let newSelectedKeys = selectedKeys;
    if (info.selected) {
      newSelectedKeys = getRadioSelectKeys(gData, selectedKeys, info.node.props.eventKey);
    }
    this.setState({
      selectedKeys: newSelectedKeys,
    });
  },
  render() {
    console.log('render', gData);
    const loop = data => {
      return data.map((item) => {
        if (item.children && item.children.length) {
          return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.title} />;
      });
    };
    // -----
    const menu = (<Menu>
      <Menu.Item>
        添加
      </Menu.Item>
      <Menu.Item>
        删除
      </Menu.Item>
      <Menu.Item>
        重命名
      </Menu.Item>
    </Menu>);

    const loopDropDown = data => data.map((item) => {
      if (item.children) {
        // return DropdownTreeNode({ key: item.key, title: item.title, disableCheckbox: item.key === '0-0-0-key', children: loopDropDown(item.children) });
        return (
          <DropdownTreeNode
            key={item.key}
            title={item.title}
            dropDownTitle={item.dropDownTitle}
            onDropDownClick={e => e}
            dropDownOverlay={menu}
            dropDownable
          >
            {loopDropDown(item.children)}
          </DropdownTreeNode>
        );
      }
      return <DropdownTreeNode key={item.key} title={item.title} dropDownable dropDownTitle={item.dropDownTitle} onDropDownClick={e => e} />;
      // return <DropdownTreeNode key={item.key} title={item.title} dropDownTitle={item.dropDownTitle} onDropDownClick={e => e} dropDownOverlay={menu} disabled={item.key === '0-2-key'} />;
    });
    console.log('looping', loop(gData));
    console.log(gDropDownData);
    // console.log(getRadioSelectKeys(gData, this.state.selectedKeys));
    return (
      <div style={{ padding: '0 20px' }}>
        <h2>dropDown</h2>
        <Tree
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
          autoExpandParent={this.state.autoExpandParent}
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loopDropDown(gDropDownData)}
        </Tree>
        <h2>dragable</h2>
        <Tree
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
          autoExpandParent={this.state.autoExpandParent}
          draggable
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loop(this.state.gData)}
        </Tree>
        <h2>controlled</h2>
        <Tree
          checkable
          multiple={this.props.multiple}
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {loop(gData)}
        </Tree>
        <h2>checkStrictly</h2>
        <Tree
          checkable
          multiple={this.props.multiple}
          defaultExpandAll
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          onCheck={this.onCheckStrictly}
          checkedKeys={this.state.checkStrictlyKeys}
          checkStrictly
        >
          {loop(gData)}
        </Tree>
        <h2>{'radio\'s behavior select (in the same level)'}</h2>
        <Tree
          multiple
          defaultExpandAll
          onSelect={this.onRbSelect}
          selectedKeys={getRadioSelectKeys(gData, this.state.selectedKeys)}
        >
          {loop(gData)}
        </Tree>
      </div>);
  },
});


export default Demo;
