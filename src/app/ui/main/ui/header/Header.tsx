import React, { useCallback, useState } from "react";
import cn from "classnames";
import { ContrastThemeSwither, UserProfileAction, UserProfileLabel } from '../../../../share';
import { useAuth } from '../../../../../api/auth/useAuth';
import { Button, Modal } from 'antd';
import { BgColorsOutlined, LoginOutlined } from '@ant-design/icons';
import { Login } from '../../../../login/Login';

import styles from './Header.module.less';

export interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ className, children }) => {
  const [auth] = useAuth();

  const [open, setOpen] = useState(false);

  const onLoginOpen = useCallback(() => setOpen(true), []);
  const onLoginClose = useCallback(() => setOpen(false), []);

  return (
    <div className={cn(styles.layout, className)}>
      <div className={styles.dashboard}>
        { children }
      </div>
      <BgColorsOutlined />
      <ContrastThemeSwither></ContrastThemeSwither>
      <div className={styles.profile}>
        { auth.userType
          ? (
            <UserProfileAction>
              <UserProfileLabel />
            </UserProfileAction>
          )
          : (
            <Button icon={<LoginOutlined />} onClick={onLoginOpen}>Войти</Button>
          )
        }
      </div>
      <Modal open={open} onCancel={onLoginClose} footer={<></>}>
        <Login onLogined={onLoginClose} />
      </Modal>
    </div>
  );
}