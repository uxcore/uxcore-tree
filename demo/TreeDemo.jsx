import React from 'react';
import PropTypes from 'prop-types';
import { gData, gDropDownData, getRadioSelectKeys } from './util';
import Tree from '../src/index';
import '../style';
import 'kuma-base/core.less';

const { TreeNode, ActionTreeNode } = Tree;

function generateTreeNodes(treeNode) {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 3; i++) {
    arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
  }
  return arr;
}

function setLeaf(treeData, curKey, level) {
  const loopLeaf = (data, lev) => {
    const l = lev - 1;
    data.forEach((item) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0
        : curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}

class Demo extends React.Component {
  static propTypes = {
    multiple: PropTypes.bool,
  }

  static defaultProps = {
    multiple: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['0-0-0-key'],
      autoExpandParent: true,
      // checkedKeys: ['0-0-0-0-key', '0-0-1-0-key', '0-1-0-0-key'],
      checkedKeys: [],
      checkStrictlyKeys: {},
      selectedKeys: [],
      gData,
      treeData: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          { name: 'pNode 01', key: '0-0' },
          { name: 'pNode 02', key: '0-1' },
          { name: 'pNode 03', key: '0-2', isLeaf: true },
        ],
        // checkedKeys: ['0-0'],
      });
    }, 100);
  }

  onDragStart = (info) => {
    console.log('start', info);
  }

  onDragEnter = (info) => {
    console.log('enter', info);
    this.setState({
      expandedKeys: info.expandedKeys,
    });
  }

  onDragEnd = (info) => {
    console.log('end', info);
    this.setState({
      expandedKeys: info.expandedKeys,
    });
  }

  onDrop = (info, ...args) => {
    console.log('drop', info, args);
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
  }

  onExpand = (expandedKeys, ...args) => {
    console.log('onExpand', args);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded chilren keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({
      checkedKeys,
    });
  }

  onLoadData = (treeNode) => {
    console.log('load data...');
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
        this.setState({ treeData });
        resolve();
      }, 500);
    });
  }

  onCheckStrictly = (checkedKeys, ...args /* extra */) => {
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
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', selectedKeys, info);
    this.setState({
      selectedKeys,
    });
  }

  onRbSelect = (selectedKeys, info) => {
    console.log('onRbSelect');
    let newSelectedKeys = selectedKeys;
    if (info.selected) {
      newSelectedKeys = getRadioSelectKeys(gData, selectedKeys, info.node.props.eventKey);
    }
    this.setState({
      selectedKeys: newSelectedKeys,
    });
  }

  render() {
    console.log('render dragOverGapBottom', gData);
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.key} title={item.title} dragOverGapBottom>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={`${item.title} Bottom`} disabled={item.key === '0-0-0-1-key'} dragOverGapBottom={true} />;
    });
    const loopLoading = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.key}>
            {loopLoading(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={item.name}
          key={item.key}
          isLeaf={item.isLeaf}
          disabled={item.key === '0-0-0'}
        />
      );
    });
    const treeNodes = loopLoading(this.state.treeData);
    // -----

    const loopDropDown = data => data.map((item) => {
      if (item.children) {
        return (
          <ActionTreeNode
            key={item.key}
            title={item.title}
            actionAble
            selectable
            actions={[{
              text: '新增',
              onClick: () => { console.log('多个 Action 回调'); },
              icon: 'dingding',
            }, {
              text: '新增',
              onClick: () => { },
              icon: 'fujian',
            }, {
              text: '新增',
              onClick: () => { },
              icon: 'ren',
            }]}
          >
            {loopDropDown(item.children)}
          </ActionTreeNode>
        );
      }
      return (
        <ActionTreeNode
          actionAble
          key={item.key}
          title={item.title}
          actions={{
            text: '单个',
            onClick: () => { console.log('单个 Action 点击'); },
            icon: 'weizhi',
          }}
        />
      );
    });

    return (
      <div style={{ padding: '0 20px' }}>
        <h2>
          dropDown
        </h2>
        <Tree
          selectable
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
          autoExpandParent
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          onSelect={() => { console.log('onSelect 回调'); }}
          onDoubleClick={(e, _this) => console.log('onDoubleClick', e, _this)}
        >
          {loopDropDown(gDropDownData)}
        </Tree>
        <button onClick={() => {
          this.setState({
            expandedKeys: ['0-0-1-1-key'],
          });
        }}>手动展开</button>
        <h2>
          dragable
        </h2>
        <Tree
          expandedKeys={this.state.expandedKeys}
          onExpand={this.onExpand}
          autoExpandParent={this.state.autoExpandParent}
          draggable
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loop(this.state.gData)}
        </Tree>
        <h2>
          controlled
        </h2>
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
        <h2>
          Dynamic Render
        </h2>
        <Tree
          onSelect={this.onSelect}
          checkable
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          loadData={this.onLoadData}
        >
          {treeNodes}
        </Tree>
        <h2>
          checkStrictly
        </h2>
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
        <h2>
          {'radio\'s behavior select (in the same level)'}
        </h2>
        <Tree
          multiple={false}
          defaultExpandAll
          onSelect={this.onRbSelect}
          selectedKeys={getRadioSelectKeys(gData, this.state.selectedKeys)}
          selectedKeys={['0-0-0-0-key']}
        >
          {loop(gData)}
        </Tree>
        <Tree
          multiple={false}
          defaultExpandAll
          onSelect={this.onRbSelect}
          selectedKeys={getRadioSelectKeys(gData, this.state.selectedKeys)}
          selectedKeys={['0-0-0-0-key']}
        >
          {loop(gData)}
        </Tree>
      </div>);
  }
}


export default Demo;
