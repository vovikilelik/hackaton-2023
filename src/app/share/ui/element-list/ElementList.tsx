import cn from "classnames";
import { useMemo } from "react";
import { Action } from "../../../../share/ui";

import styles from './ElementList.module.less';

export interface ItemRenderer<I = any> {
  (item: I, arrange: 'list' | 'grid'): React.ReactNode;
}

export interface ElementListProps<I = any> {
  items: I[];
  className?: string;
  arrange?: 'list' | 'grid';
  itemRenderer: ItemRenderer<I>;
  onItemClick?: (item: I) => void;
}

export const ElementList: React.FC<ElementListProps> = ({ items, arrange = 'list', className, onItemClick, itemRenderer }) => {
  const elements = useMemo(() => {
    return items.map(
      (item, index) => (
        onItemClick ? (
          <Action key={index} onClick={() => onItemClick(item)}>
            { itemRenderer(item, arrange) }
          </Action>
        ) : itemRenderer(item, arrange)
      )
    );
  }, [items, arrange, onItemClick, itemRenderer]);

  return (
    <div className={cn({[styles.grid]: arrange === 'grid', [styles.list]: arrange === 'list'}, className)}>
      {elements}
    </div>
  );
}