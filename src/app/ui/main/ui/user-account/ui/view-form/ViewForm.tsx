import React, { useMemo, useState } from "react";
import cn from "classnames";
import { ClassName } from '../../../../../../../share/react';
import { PosterDto } from '../../../../../../../api/v1/dto';
import { Image } from '../../../../../../../share/ui';
import { Rate } from 'antd';
import { MarkDto } from '../../../../../../../api/v1/dto/mark';

import styles from './ViewForm.module.less';

export interface ViewFormProps extends ClassName {
  value: PosterDto;
}

const getMarkRenderer = (selectedIndex, onSelect) => ({ text, timestamp, author, mark }: MarkDto, index) => {
  return (
    <div
      key={index}
      className={cn(styles.commentsItem, selectedIndex === index && styles.commentsItemSelected)}
      onClick={() => onSelect(index)}
    >
      <div className={styles.commentsInfo}>{timestamp} @{author}</div>
      {text}
      <Rate value={mark} />
    </div>
  );
}

export const ViewForm: React.FC<ViewFormProps> = ({ className, value }) => {
  const { title, image, marks } = value;

  const [selectedMark, setSelectedMark] = useState(0);

  const points = useMemo(() => {
    return marks?.map((mark, index) => {
      const left = `${Math.random() * 75}%`;
      const top = `${Math.random() * 75}%`;

      return (
        <div
          style={{ left, top }}
          className={cn(styles.pointsItem, selectedMark === index && styles.pointsItemSelected)}
          onClick={() => setSelectedMark(index)}
        />
      );
    });
  }, [marks, selectedMark]);

  const markRenderer = useMemo(() => {
    return getMarkRenderer(selectedMark, setSelectedMark);
  }, [selectedMark]);

  return (
    <div className={cn(styles.layout, className)}>
      <p><strong>{title}</strong></p>
      <div className={styles.points}>
        <Image className={styles.image} src={image || ''} />
        <div className={styles.pointsArea}>
          {points}
        </div>
      </div>
      <p><strong>Оченки и комментарии:</strong></p>
      <div className={styles.comments}>
        { marks?.map(markRenderer) }
      </div>
    </div>
  );
}
