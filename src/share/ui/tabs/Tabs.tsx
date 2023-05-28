import React, { useCallback } from "react";
import cn from "classnames";
import { Children, ClassName } from '../../react';
import { Label } from '../label';
import { Action, ActionProps } from '../action';

import styles from './Tabs.module.less';


export type ViewRendererFactory = (props: { key: string }) => React.ReactNode;

export interface TabItem {
  key: string;
  uuid: string;
  renderer: ViewRendererFactory;
}

export interface Desktop {
  list: TabItem[]
  activeKey?: string;
}

interface AppGroup {
  uuid: string;
  appList: TabItem[];
};

const getGroups = (items: TabItem[]) => {
  return items.reduce<AppGroup[]>((groups, item) => {
    const uuid = item.uuid;
    const group = groups.find(g => g.uuid === uuid);

    if (group) {
      group.appList.push(item);
    } else {
      groups.push({ uuid, appList: [item] });
    }

    return groups;
  }, []);
}

const Group: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.group}>
      { children }
    </div>
  );
}

const Item: React.FC<ActionProps & Children> = ({ className, children, ...rest }) => {
  return (
    <Action className={cn(styles.item, className)} { ...rest }>
      <Label>
        {children}
      </Label>
    </Action>
  );
}

const getItemRenderer = (onAppSelect: (key: string) => void, activeKey?: string) => (item: TabItem) => {
  return (
    <Item
      key={item.key}
      className={cn({[styles.itemSelected]: activeKey === item.key})}
      onClick={() => onAppSelect(item.key)}
    >
      {item.renderer(item)}
    </Item>
  );
}

const getGroupRenderer = (onAppSelect: (key: string) => void, activeKey?: string) => (group: AppGroup, index: number) => {
  return (
    <Group key={group.uuid}>
      { group.appList.map(getItemRenderer(onAppSelect, activeKey)) }
    </Group>
  );
}

export interface TabsProps extends ClassName {
  items: TabItem[];
  activeKey: string;
  onActiveKeyChanged?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ className, items, activeKey, onActiveKeyChanged }) => {
  const groups = getGroups(items);

  const onAppSelect = useCallback(key => {
    onActiveKeyChanged?.(key);
  }, []);

  return (
    <div className={cn(styles.layout, className)}>
      { groups.map(getGroupRenderer(onAppSelect, activeKey)) }
    </div>
  );
}