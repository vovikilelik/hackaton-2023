import React, { useCallback, useMemo } from "react";

import cn from "classnames";
import { CloseOutlined, PushpinOutlined } from "@ant-design/icons";
import { Drawer as AntDrawer, DrawerProps as AntDrawerProps } from "antd";

import { Action } from "../action";
import { Header } from "./header";

import styles from './Drawer.module.less';

type DrawerType = Omit<AntDrawerProps, 'open' | 'onClose' | 'headerStyle'>;

type EventType = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

const headerStyle: React.CSSProperties = { display: 'none' };
const bodyStyle: React.CSSProperties = { padding: 'unset', display: 'flex', flexDirection: 'column' };

export interface DrawerProps extends DrawerType {
  open?: 'sticky' | boolean;
  onOpenedChanged?: (visible: 'sticky' | boolean, e: EventType) => void;
}

const renderTitle = (title: React.ReactNode) => {
  switch (typeof title) {
    case 'string':
    case 'number':
      return <span className={styles.titleText}>{ title }</span>;
    default:
      return title;
  }
}

export const Drawer: React.FC<DrawerProps> = ({ className, children, open, onOpenedChanged, title, extra, placement, ...rest }) => {
  const opened = open === true;

  const closeHandler = useCallback(e => {
    onOpenedChanged?.(false, e);
  }, [onOpenedChanged]);

  const stickyHandler = useCallback(e => {
    onOpenedChanged?.('sticky', e);
  }, [onOpenedChanged]);

  const titleElement = useMemo(() => renderTitle(title), [title]);

  const element = useMemo(() => {
    return open === 'sticky'
      ? <aside className={cn(styles.aside, className)}>{ children }</aside>
      : (
          <AntDrawer open={opened} onClose={closeHandler} placement={placement} bodyStyle={bodyStyle} headerStyle={headerStyle} { ...rest }>
            <Header title={titleElement} extra={extra} placement={placement}>
              <Action className={styles.action} onClick={closeHandler}>
                <CloseOutlined />
              </Action>
              <Action className={styles.action} onClick={stickyHandler}>
                <PushpinOutlined />
              </Action>
            </Header>
            { children }
          </AntDrawer>
        );
  }, [open])

  return element;
}