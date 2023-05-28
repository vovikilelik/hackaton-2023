import React, { useMemo } from "react";

import cn from "classnames";

import styles from './List.module.less';

export type ListRenderableType = React.ReactNode | (() => React.ReactNode);

export interface Item {
  renderer: ListRenderableType;
}

export interface ListProps<I extends Item = Item> {
  items: I[];
  className?: string;
  arrange?: 'list' | 'grid';
  children?: React.ReactNode;
}

const getItemRenderer = () => (item: Item, index: number) => {
  const { renderer } = item;

  const element = typeof renderer === 'function'
    ? renderer()
    : renderer;

  return element;
}

export const List: React.FC<ListProps> = ({ className, items, arrange, children }) => {
  const content = useMemo(() => {
    return items.map(getItemRenderer())
  }, [items])

  return (
    <div className={cn(arrange ? styles[arrange] : styles, className)}>
      {content}
      {children}
    </div>
  );
}