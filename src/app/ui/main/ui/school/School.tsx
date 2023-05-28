import React, { useState } from "react";
import cn from "classnames";
import { Component } from '../../../../../share/react';
import { Form } from '../form';
import { SwitchContainer, TabItem, Tabs } from '../../../../../share/ui';
import { BookOutlined } from '@ant-design/icons';

import styles from './School.module.less';
import { Cources, Library } from './ui';

export interface SchoolProps extends Component {

}

const tabsItems: TabItem[] = [
  {
    key: 'lib',
    uuid: '',
    renderer: () => (<><BookOutlined /><span>Библиотека</span></>),
  },
  {
    key: 'cources',
    uuid: '',
    renderer: () => (<><BookOutlined /><span>Курсы</span></>),
  }
];

export const School: React.FC<SchoolProps> = ({ className, children }) => {
  const [activeKey, setActiveKey] = useState('lib');

  return (
    <Form className={styles.layout} title='Школа' color='#d6bb41'>
      <div className={styles.wrapper}>
        <Tabs className={styles.tabs} items={tabsItems} activeKey={activeKey} onActiveKeyChanged={setActiveKey} />
        <SwitchContainer className={styles.content} activeKey={activeKey}>
          <Library key='lib' />
          <Cources key='cources' />
        </SwitchContainer>
      </div>
    </Form>
  );
}