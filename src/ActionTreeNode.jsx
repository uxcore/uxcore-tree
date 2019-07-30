import React from 'react';
import RcTree from 'rc-tree';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropdown from 'uxcore-dropdown';
import Icon from 'uxcore-icon';
import Menu from 'uxcore-menu';

const LOAD_STATUS_LOADING = 1;

class ActionTreeNode extends RcTree.TreeNode {
  actionClickBlocker = false;

  // Icon + Title
  renderSelector = () => {
    const { loadStatus, dragNodeHighlight } = this.state;
    const { title, selected, icon } = this.props;
    const { rcTree: { prefixCls, showIcon, icon: treeIcon, draggable, loadData, onNodeDoubleClick } } = this.context;
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
          (!disabled && draggable) && 'draggable',
        )}
        draggable={(!disabled && draggable) || undefined}
        aria-grabbed={(!disabled && draggable) || undefined}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onContextMenu={this.onContextMenu}
        onClick={(e) => {
          // the event stop propagation will fial in popover under react@15 or smaller, so try to
          // block it by logic code
          if (e.target && e.target.closest) {
            this.actionClickBlocker = false;
            if (e.target.closest('.uxcore-tree-node-actions-blocker')) {
              return;
            }
          } else if (this.actionClickBlocker) {
            this.actionClickBlocker = false;
            return;
          }

          this.onSelectorClick(e);
        }}
        onDragStart={this.onDragStart}
        onDoubleClick={e => onNodeDoubleClick(e, this)}
      >
        {$icon}{$title}
      </span>
    );
  };

  renderTitle() {
    const { title, actionAble, actionIcon, actions } = this.props;
    const { rcTree: { prefixCls } } = this.context;

    if (actionAble) {
      let renderActionContent = '';

      // bad smell: while call the onClick, haven't passed event as the first param at the
      // beginning, and now for the compatibility, we can't change the order
      if (Array.isArray(actions)) {
        const menuContent = [];
        actions.forEach((value, index) => {
          menuContent.push(<Menu.Item key={`${index + 1}`}>
            <div onClick={(e) => {
              e.stopPropagation();
              this.actionClickBlocker = true;

              value.onClick(value, index, e);
            }}
            >
              {value.icon ? <Icon usei name={value.icon} className="kuma-tree-icon-valign" /> : null}
              {value.text}
            </div>
          </Menu.Item>);
        });

        renderActionContent = (<Dropdown
          overlayClassName={classNames(
            `${prefixCls}-dropdown-menu`,
            'uxcore-tree-node-actions-blocker',
          )}
          overlay={<Menu>{menuContent}</Menu>}
          getPopupContainer={node => node.parentNode}
        >
          <Icon
            usei
            className={classNames(
              `${prefixCls}-dropdown-section-icon`,
            )}
            name={actionIcon}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </Dropdown>);
      } else if (actions.icon) {
        renderActionContent = (<Icon
          usei
          className={classNames(
            `${prefixCls}-dropdown-section-icon`,
          )}
          name={actions.icon}
          title={actions.text}
          onClick={(e) => {
            e.stopPropagation();
            actions.onClick(e);
          }}
        />);
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
  ...RcTree.TreeNode.propTypes,
  actionAble: PropTypes.bool,
  actionIcon: PropTypes.string,
  actions: PropTypes.any,
};

ActionTreeNode.defaultProps = {
  ...RcTree.TreeNode.defaultProps,
  actionAble: false,
  actionIcon: 'more-dot',
  actions: {
    text: '',
    onClick: () => {},
    icon: '',
  },
};

export default ActionTreeNode;
