import React, { useMemo, useState } from "react";
import cn from "classnames";
import { ClassName } from '../../../../../../../share/react';
import { NewsItemDto, PosterDto } from '../../../../../../../api/v1/dto';
import { Image } from '../../../../../../../share/ui';
import { Badge, Button, Input, Rate, Segmented, Upload } from 'antd';
import { CommentOutlined, FileImageOutlined, FileWordOutlined, InboxOutlined, SoundOutlined, VideoCameraOutlined } from '@ant-design/icons';

import styles from './AddForm.module.less';
import { SegmentedLabeledOption } from 'antd/es/segmented';


export interface AddFormProps extends ClassName {
  defaultValue: PosterDto;
  onValueChanged?: (value: PosterDto) => void
}

const typeOptions: SegmentedLabeledOption[] = [
  {
    icon: <FileImageOutlined />,
    title: 'Графика',
    value: 'picture'
  },
  {
    icon: <VideoCameraOutlined />,
    title: 'Видео',
    value: 'video',
  },
  {
    icon: <SoundOutlined />,
    title: 'Музыка',
    value: 'sound',
  },
  {
    icon: <FileWordOutlined />,
    title: 'Сочинение',
    value: 'text',
  }
];

export const AddForm: React.FC<AddFormProps> = ({ className, defaultValue }) => {

  const [innerValue, setInnerValue] = useState<PosterDto>(defaultValue);

  const { title, description } = innerValue;

  const supportFiles = 'png, jpeg';

  return (
    <div className={cn(styles.layout, className)}>
      <Input placeholder='Название работы' value={title} />
      <Input placeholder='Описание работы' value={description}  multiple />
      <Segmented className={styles.segmented} options={typeOptions} />
      <div>
        Содержание работы
      </div>
      <Upload.Dragger
        name='file'
      >
        <p>
          <InboxOutlined style={{ fontSize: '48px' }} />
        </p>
        <p><strong>Перетащите работу для загрузки</strong></p>
        <p>
          {supportFiles}
        </p>
      </Upload.Dragger>
    </div>
  );
}
