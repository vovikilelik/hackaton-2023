import React, { useEffect, useState } from "react";
import cn from "classnames";

import { ClassName } from '../../../../../share/react';

import { NewsItemDto } from '../../../../../api/v1/dto';
import { Item } from './ui';

import styles from './News.module.less';
import { ProgressBox } from '../../../../../share/ui';
import { newsApi } from '../../../../../api/modules';
import { Form } from '../form';


const renderNewsItem = (item: NewsItemDto, index) => {
  return (
    <Item key={index} value={item} />
  );
};

export const News: React.FC<ClassName> = ({ className }) => {
  const [items, setItems] = useState<NewsItemDto[]>();

  useEffect(() => {
    newsApi.getList().then(({ data }) => setItems(data));
  }, []);

  return (
    <Form className={styles.layout} title='Новости' color='#3a5b9e'>
      <ProgressBox className={cn(styles.content, className)} value={!items}>
        <div className={styles.wrapper}>
          {items && items.map(renderNewsItem)}
        </div>
      </ProgressBox>
    </Form>
  );
}