import React, { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";

import { Component } from '../../../../../share/react';

import styles from './UserAccount.module.less';
import { Form } from '../form';
import { Poster } from './ui/poster';
import { PosterDto } from '../../../../../api/v1/dto';
import { galleryApi } from '../../../../../api/modules';
import { ProgressBox } from '../../../../../share/ui';
import { Badge, Button, Modal, ModalProps, Space } from 'antd';
import { AppstoreAddOutlined, OrderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { AddForm, AddFormProps, ViewForm } from './ui';
import { useAuth } from '../../../../../api/auth/useAuth';
import { Hello } from '../../../story/ui';
import { Story } from '../../../story';
import { SiderSection } from '../../../../share/ui';

export interface UserAccountProps extends Component {

}

const getPosterRenderer = (onClick) => (value, index) => {
  return (
    <div key={index} onClick={() => onClick(value)}>
      <Poster value={value} />
    </div>
  );
}

const createDefaultPoster = (author): PosterDto => {
  return { author, title: '', type: 'picture', content: null };
}

interface AddPosterModalProps extends Omit<ModalProps, 'onOk'> {
  onOk: (poster: PosterDto) => void;
}

const AddPosterModal: React.FC<AddPosterModalProps> = ({ onOk, ...modal }) => {
  const [auth] = useAuth();

  const [innerPoster, setInnerPoster] = useState<PosterDto>(createDefaultPoster(auth.username));

  const onOkHandler = useCallback(() => {
    onOk?.(innerPoster);
  }, [onOk, innerPoster]);

  return (
    <Modal title='Загрузить новую работу' onOk={onOkHandler} { ...modal }>
      <AddForm defaultValue={innerPoster} onValueChanged={setInnerPoster} />
    </Modal>
  );
}

export const UserAccount: React.FC<UserAccountProps> = ({ className, children }) => {
  const [auth] = useAuth();

  const [items, setItems] = useState<PosterDto[]>();

  const [openHello, setOpenHello] = useState(false);
  const [openStory, setOpenStory] = useState(false);

  const [editPoster, setEditPoster] = useState<PosterDto>();

  const [openAdd, setOpenAdd] = useState(false);
  const onAddOpen = useCallback(() => setOpenAdd(true), []);

  const onAddOk = useCallback(poster => {
    setOpenAdd(false);
    setOpenHello(true);
  }, []);

  const onAddCancel = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const onStoryApprove = useCallback(() => {
    setOpenHello(false);
    setOpenStory(true);
  }, []);

  const onCloseStory = useCallback(() => setOpenStory(false), []);

  const onClosePoster = useCallback(() => setEditPoster(undefined), []);

  useEffect(() => {
    galleryApi.getList().then(({ data }) => setItems(data));
  }, []);

  const posterRenderer = useMemo(() => {
    return getPosterRenderer(setEditPoster)
  }, []);

  return (
    <Form className={cn(styles.layout, className)} title='Моя студия' color='#729a00'>
      
      <SiderSection title='Задания на сегодня (TO-DO)'>
        <ul>
          <li>
            <Button icon={<OrderedListOutlined />} type='link'>Нарисовать 10 скетчей</Button>
          </li>
          <li>
            <Button icon={<OrderedListOutlined />} type='link'>Помыть за собой кисточки</Button>
          </li>
        </ul>
      </SiderSection>
      <SiderSection title='Все работы'>
        <Space.Compact className={styles.toolbar}>
          <Button onClick={onAddOpen} icon={<AppstoreAddOutlined />}>Загрузить</Button>
        </Space.Compact>
          <ProgressBox className={styles.content} value={!items}>
            {items && items.map(posterRenderer)}
        </ProgressBox>
      </SiderSection>
      
      <AddPosterModal open={openAdd} onOk={onAddOk} onCancel={onAddCancel} />
      {openHello && <Hello onOpenedChanged={setOpenHello} onApprove={onStoryApprove} />}
      <Modal className={styles.modal} open={openStory} onCancel={onCloseStory} footer={<></>}>
        <Story />
      </Modal>
      <Modal open={!!editPoster} onCancel={onClosePoster} footer={<></>}>
        {editPoster && <ViewForm value={editPoster} />}
      </Modal>
    </Form>
  );
}