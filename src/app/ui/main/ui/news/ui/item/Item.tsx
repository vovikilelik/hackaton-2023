import React, { useState } from "react";
import cn from "classnames";
import { ClassName } from '../../../../../../../share/react';
import { NewsItemDto } from '../../../../../../../api/v1/dto';

import styles from './Item.module.less';
import { Image } from '../../../../../../../share/ui';

export interface ItemProps extends ClassName {
  value: NewsItemDto;
}

export const Item: React.FC<ItemProps> = ({ className, value }) => {
  const { title, image, author } = value;


  return (
    <div className={cn(styles.layout, className)}>
      <div className={styles.title}>{title}</div>
      <Image className={styles.image} src={image || ''} />
      <div className={styles.author}>@{author}</div>
    </div>
  );
}
