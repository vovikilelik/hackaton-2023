import React, { useMemo, useState } from "react";
import cn from "classnames";
import { ClassName } from '../../../../../../../share/react';
import { NewsItemDto, PosterDto } from '../../../../../../../api/v1/dto';

import styles from './Poster.module.less';
import { Image } from '../../../../../../../share/ui';
import { Badge, Button, Rate } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

export interface PosterProps extends ClassName {
  value: PosterDto;
}

export const Poster: React.FC<PosterProps> = ({ className, value }) => {
  const { title, description, image, author, marks } = value;

  const rate = useMemo(() => {
    if (!marks) {
      return 0;
    }

    const exsistsMarks = marks.filter(({ mark }) => mark);
    return exsistsMarks.reduce((acc, mark) => acc + mark.mark, 0) / exsistsMarks.length;
  }, [marks]);

  return (
    <div className={cn(styles.layout, className)}>
      <Image className={styles.image} src={image || ''} />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.info}>
          <Badge count={marks?.length || 0}><CommentOutlined /></Badge>
          <Rate value={rate} />
        </div>
      </div>
    </div>
  );
}
