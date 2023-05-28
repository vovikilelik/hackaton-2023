import React, { useCallback, useState } from "react";
import cn from "classnames";
import { Component } from '../../../../../../../share/react';
import { SiderSection } from '../../../../../../share/ui';
import { AppsList } from '../../../../../../apps-store/ui';
import { FrameButton } from '../../../../../../../share/ui/frame';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { StandartDataProvider } from '../../../../../../../share/data-provider';
import { AppsStore } from '../../../../../../apps-store/AppsStore';
import { useLens } from '@vovikilelik/react-lens';
import { installedAppsLens } from '../../../../../../../store';
import { Modal } from 'antd';
import { Item, List } from '../../../../../../../share/ui';
import { Poster } from '../../../user-account/ui';
import { allIcons } from '../../../../../../../fake/icons';

import styles from './Library.module.less';

export interface LibraryProps extends Component {

}

const testItems: Item[] = [
  {
    renderer: () => <Poster value={{ author: '', title: 'Моцарт против Сольери', image: allIcons[0], type: 'text', content: null }} />
  },
  {
    renderer: () => <Poster value={{ author: '', title: 'Бах, лучшее', image: allIcons[1], type: 'text', content: null }} />
  },
  {
    renderer: () => <Poster value={{ author: '', title: 'Смысл в какафонии', image: allIcons[2], type: 'text', content: null }} />
  }
];

export const Library: React.FC<LibraryProps> = ({ className, children }) => {
  const [apps] = useLens(installedAppsLens);

  const [appOpen, setAppOpen] = useState(false);

  const onAppOpen = useCallback(() => setAppOpen(true), []);
  const onAppClose = useCallback(() => setAppOpen(false), []);

  return (
    <div>
      <FrameButton
        icon={<AppstoreAddOutlined />}
        type='primary'
        text='Ещё приложения'
        frameProps={{ title: 'Магазин приложений' }}
      >
        <StandartDataProvider data={apps} status='completed'>
          <AppsStore />
        </StandartDataProvider>
      </FrameButton>
      <SiderSection title='Приложения'>
        <AppsList items={apps} onItemClick={onAppOpen} />
        {!apps || apps.length === 0 && 'У вас пока нет приложений'}
      </SiderSection>
      <Modal title='Приложение' open={appOpen} onCancel={onAppClose}>
        <List items={testItems} />
      </Modal>
    </div>
  );
}