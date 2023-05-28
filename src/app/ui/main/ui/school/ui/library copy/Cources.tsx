import React, { useCallback, useState } from "react";
import cn from "classnames";
import { Component } from '../../../../../../../share/react';
import { SiderSection } from '../../../../../../share/ui';
import { AppsList } from '../../../../../../apps-store/ui';
import { FrameButton } from '../../../../../../../share/ui/frame';
import { AppstoreAddOutlined, LoadingOutlined, OrderedListOutlined, TeamOutlined } from '@ant-design/icons';
import { StandartDataProvider } from '../../../../../../../share/data-provider';
import { AppsStore } from '../../../../../../apps-store/AppsStore';
import { useLens } from '@vovikilelik/react-lens';
import { installedAppsLens } from '../../../../../../../store';
import { Button, Modal, Progress, Timeline } from 'antd';
import { Item, List } from '../../../../../../../share/ui';
import { Poster } from '../../../user-account/ui';
import { allIcons } from '../../../../../../../fake/icons';

import styles from './Cources.module.less';

export interface CourcesProps extends Component {

}

export const Cources: React.FC<CourcesProps> = ({ className, children }) => {
  const [apps] = useLens(installedAppsLens);

  const [appOpen, setAppOpen] = useState(false);

  const onAppOpen = useCallback(() => setAppOpen(true), []);
  const onAppClose = useCallback(() => setAppOpen(false), []);

  return (
    <div>
      <SiderSection title='Текущий курс'>
        <p>
          Живопись, техника быстрого мазка<br />
          <span style={{ opacity: 0.5 }}>Автор: Пушок Петрович</span><br />
          <span style={{ opacity: 0.5 }}>10 уроков, 3 теста</span>
        </p>
      </SiderSection>
      <SiderSection title='Завершено'>
        <p style={{ textAlign: 'center' }}>
          <Progress type="circle" percent={75} />
        </p>
      </SiderSection>
      <SiderSection title='Пройденные этапы'>
        <Timeline
          mode='left'
          items={[
            {
              label: '2015-09-01',
              children: 'Вводный урок',
            },
            {
              label: '2015-09-01',
              children: 'Колористика',
            },
            {
              children: <Button style={{ padding: 0 }} icon={<OrderedListOutlined />} type='link' ghost>Тест</Button>,
              pending: true,
              dot: <LoadingOutlined />,
              color: 'red',
            },
            {
              label: '2015-09-01',
              children: 'Первый натюрморт',
            },
          ]}
        />
      </SiderSection>
      {/* <Modal title='Приложение' open={appOpen} onCancel={onAppClose}>
        <List items={testItems} />
      </Modal> */}
    </div>
  );
}