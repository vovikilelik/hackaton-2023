import React, { useCallback, useMemo } from 'react';

import styles from './Hello.module.less';
import { shiskinPng } from '../../../../../fake/assets';
import { Image } from '../../../../../share/ui';
import { useAuth } from '../../../../../api/auth/useAuth';
import { Button } from 'antd';

export interface HelloProps {
  onApprove?: () => void;
  onReject?: () => void;
  opened?: boolean;
  onOpenedChanged?: (value: boolean) => void;
}

export const Hello: React.FC<HelloProps> = ({ onApprove, onReject, opened, onOpenedChanged }) => {
  const [auth] = useAuth();

  const onClose = useCallback(() => {
    onOpenedChanged?.(false);
    onReject?.();
  }, [onOpenedChanged]);

  return (
    <div className={styles.layout}>
        <div className={styles.text}>
          <p><strong>Привет!</strong></p>
          <p>Вижу ты интересуешься тем же, что и я?</p>
          <p>Хочу рассказать тебе больше...</p>
          <p><Button onClick={onClose}>Нет</Button> <Button onClick={onApprove}>Да</Button></p>
        </div>
        <div className={styles.imageBox}>
          <Image src={shiskinPng} />
          <div className={styles.imageName}>Иван Иванович Шишкин</div>
        </div>
    </div>
  );
};
