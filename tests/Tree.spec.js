import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import createClass from 'create-react-class';
import cssAnimation from 'css-animation';
// import Enzyme, { mount, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';
import Tree from '../src';

const { TreeNode } = Tree;
import { gData, getRadioSelectKeys } from '../demo/util';

const loop = (data) => data.map((item) => {
  if (item.children) {
    return (
        <TreeNode
          key={item.key}
          title={item.title}
          disableCheckbox={item.key === '0-2-key'}
        >
          {loop(item.children)}
        </TreeNode>
      );
  }
  return <TreeNode key={item.key} title={item.title} disabled={item.key === '0-2-key'} />;
});

describe('Tree', () => {
  let instance;
  let div;
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('checkable', (done) => {
    const Demo = createClass({
      render() {
        return (<Tree ref="tree" checkable>
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    expect(formFieldNode.tree.getElementsByClassName('kuma-tree-checkbox ')).to.have.length(3);
    done();
  });

  it('should render svg', (done) => {
    const Demo = createClass({
      render() {
        return (<Tree ref="tree" checkable>
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    expect(formFieldNode.tree.getElementsByClassName('no-svg')).to.have.length(0);
    done();
  });

  it('should show icon when showIcon is true', (done) => {
    const Demo = createClass({
      render() {
        return (<Tree ref="tree" checkable showIcon>
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    expect(formFieldNode.tree.getElementsByClassName('kuma-tree-iconEle')).to.have.length(3);
    done();
  });
/*
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
*/
  it('should default checked ', (done) => {
    const Demo = createClass({
      render() {
        return (<Tree ref="tree" checkable checkedKeys={['0-0-key']}>
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    expect(formFieldNode.tree.getElementsByClassName('kuma-tree-checkbox-checked')).to.have.length(1);
    done();
  });


  it('onSelect', (done) => {
    const Demo = createClass({
      getInitialState() {
        return {
          selectedKeys: [''],
        };
      },
      onSelect(selectedKeys, info) {
        this.setState({
          selectedKeys,
        });
      },
      render() {
        return (<Tree ref="tree" checkable onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}>
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    formFieldNode.tree.getElementsByClassName('kuma-tree-title')[0].click();
    expect(formFieldNode.tree.getElementsByClassName('kuma-tree-node-selected')).to.have.length(1);
    done();
  });
  it('onCheck', (done) => {
    const Demo = createClass({
      getInitialState() {
        return {
          checkedKeys: [''],
        };
      },
      onCheck(checkedKeys) {
        this.setState({
          checkedKeys,
        });
      },
      render() {
        return (<Tree ref="tree" checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}>
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    formFieldNode.tree.getElementsByClassName('kuma-tree-checkbox')[0].click();
    expect(formFieldNode.tree.getElementsByClassName('kuma-tree-checkbox-checked')).to.have.length(1);
    done();
  });

  it('animation', (done) => {
    const Demo = createClass({
      render() {
        return (<Tree ref="tree" checkable >
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    formFieldNode.tree.getElementsByClassName('kuma-tree-switcher_close')[0].click();
    expect(formFieldNode.tree.getElementsByClassName('kuma-tree-switcher_open')).to.have.length(1);
    done();
  });

  it('checkStrictly', (done) => {
    const Demo = createClass({
      render() {
        return (<Tree ref="tree" checkable checkedKeys={['0-0-key']} checkStrictly focusable>
          {loop(gData)}
        </Tree>);
      },
    });
    instance = ReactDOM.render(<Demo />, div);
    const formFieldNode = instance.refs.tree;
    expect(formFieldNode.tree.getElementsByClassName('kuma-tree-checkbox-checked')).to.have.length(1);
    done();
  });
});
