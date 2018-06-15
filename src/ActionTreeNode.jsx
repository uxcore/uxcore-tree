import React from 'react';
import RcTree from 'rc-tree';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropdown from 'uxcore-dropdown';
import Icon from 'uxcore-icon';
import Menu from 'uxcore-menu';

const LOAD_STATUS_LOADING = 1;

class ActionTreeNode extends RcTree.TreeNode {

  // Icon + Title
  renderSelector = () => {
    const { loadStatus, dragNodeHighlight } = this.state;
    const { title, selected, icon } = this.props;
    const { rcTree: { prefixCls, showIcon, icon: treeIcon, draggable, loadData } } = this.context;
    const disabled = this.isDisabled();

    const wrapClass = `${prefixCls}-node-content-wrapper`;

    // Icon - Still show loading icon when loading without showIcon
    let $icon;

    if (showIcon) {
      const currentIcon = icon || treeIcon;

      $icon = currentIcon ? (
        <span
          className={classNames(
            `${prefixCls}-iconEle`,
            `${prefixCls}-icon__customize`,
          )}
        >
          {typeof currentIcon === 'function' ?
            React.createElement(currentIcon, this.props) : currentIcon}
        </span>
      ) : this.renderIcon();
    } else if (loadData && loadStatus === LOAD_STATUS_LOADING) {
      $icon = this.renderIcon();
    }

    // Title
    const $title = <span className={`${prefixCls}-title`}>{this.renderTitle()}</span>;

    return (
      <span
        ref={this.setSelectHandle}
        title={typeof title === 'string' ? title : ''}
        className={classNames(
          `${wrapClass}`,
          this.getNodeState() ? `${wrapClass}-${this.getNodeState() || 'normal'}` : '',
          (!disabled && (selected || dragNodeHighlight)) && `${prefixCls}-node-selected`,
          (!disabled && draggable) && 'draggable'
        )}
        draggable={(!disabled && draggable) || undefined}
        aria-grabbed={(!disabled && draggable) || undefined}

        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onContextMenu={this.onContextMenu}
        onClick={this.onSelectorClick}
        onDragStart={this.onDragStart}
      >
          {$icon}{$title}
      </span>
    );
  };

  renderTitle() {
    const { title, actionAble, actions } = this.props;
    const { rcTree: { prefixCls } } = this.context;

    if (actionAble) {
      let renderActionContent = '';

      if (Array.isArray(actions)) {
        let menuContent = [];

        actions.forEach((value, index) => {
          if (value.icon) {
            menuContent.push(<Menu.Item key={index}>
              <div onClick={() => value.onClick(value, index)}>
                {value.icon ?
                  <Icon name={value.icon} />
                : ''}
                {value.text}
              </div>
            </Menu.Item>);
          } else {
            menuContent.push(<Menu.Item key={value + index}><div onClick={() => value.onClick(value, index)}>{value.text}</div></Menu.Item>);
          }
        });

        renderActionContent = (<Dropdown
          overlayClassName={classNames(
            `${prefixCls}-dropdown-menu`,
          )} overlay={<Menu>{menuContent}</Menu>} getPopupContainer={(node) => node.parentNode}
        >
          <Icon
            className={classNames(
              `${prefixCls}-dropdown-section-icon`,
            )} name="shezhi"
          />
        </Dropdown>);
      } else {
        if (actions.icon) {
          renderActionContent = (<Icon
            className={classNames(
              `${prefixCls}-dropdown-section-icon`,
            )} name={actions.icon} title={actions.text} onClick={e => actions.onClick(e)}
          />);
        }
      }

      return (
        <span
          className={classNames(
            `${prefixCls}-dropdown-section`,
          )}
        >
          <span>{title}</span>
          <div
            className={classNames(
              `${prefixCls}-dropdown-section-right-section`,
            )}
          >
            {renderActionContent}
          </div>
        </span>
      );
    }

    return title;
  }
}

ActionTreeNode.propTypes = {
  ... RcTree.TreeNode.propTypes,
  onDropDownClick: PropTypes.func,
  dropDownOverlay: PropTypes.node,
  dropDownTitle: PropTypes.string,
  actionAble: PropTypes.bool,
  actions: PropTypes.any,
};

ActionTreeNode.defaultProps = {
  ... RcTree.TreeNode.defaultProps,
  actionAble: false,
  actions: {
    text: '',
    onClick: () => {},
    icon: '',
  },
};

export default ActionTreeNode;
