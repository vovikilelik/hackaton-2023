import React from 'react';

import styles from './Story.module.less';
import { Image } from '../../../share/ui';
import { shiskinPng } from '../../../fake/assets';
import { Button } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

export const Story: React.FC = ({}) => {

  return (
    <div className={styles.layout}>
      <p><Image className={styles.image} src={shiskinPng} /></p>
      <p>Меня зовут Иван Шишкин</p>
      <p>Я родился 13 (25) января 1832 года в городе Елабуга.</p>
      <p>В 12 лет был определён в Первую Казанскую мужскую гимназию, но проучившись в ней пять классов, вернулся домой, в Елабугу, где прожил четыре года</p>
      <p>Обо мне говорят, что я во всех своих произведениях являюсь знатоком растительных форм, воспроизводящим их с тонким пониманием, как общего характера, так и мельчайших отличительных черт любых деревьев, кустов и трав</p>
      <p><Button>Узнать больше</Button> <Button icon={<AppstoreAddOutlined />}>Курсы</Button></p>
    </div>
  );
};
