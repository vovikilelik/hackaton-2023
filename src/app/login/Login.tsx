import { Button, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import logoSrc from '../../assets/img/logo-hi.png';
import { ProgressBox } from '../../share/ui';
import { useAuth } from '../../api/auth/useAuth';
import { authorizeTask } from '../../api/v1/tasks/auth';

import styles from './Login.module.less';
import { Auth } from '../../store/types';

export interface LoginProps {
  stage?: 'loading';
  onLogined?: (auth: Auth) => void;
}

export const Login: React.FC<LoginProps> = ({ stage, onLogined }) => {
  const [auth, setAuth] = useAuth();
  const [username, setUsername] = useState(auth?.username || ''); 
  const [password, setpassword] = useState(); 
  const [loading, setLoading] = useState(stage === 'loading');

  const onLoginHandler = useCallback(() => {
    setLoading(true);

    authorizeTask({ username, password })
      .then(response => {
        localStorage.setItem('auth', JSON.stringify(response));
        setAuth(response);
        onLogined?.(response);
      })
      .finally(() => setLoading(false));
  }, [username]);

  const onUsernameChangedHandler = useCallback(e => setUsername(e.target.value), [username]);
  const onPasswordChangedHandler = useCallback(e => setpassword(e.target.value), [password]);

  return (
    <ProgressBox className={styles.form} progressClassName={styles.progress} value={loading}>
        <div className={styles.logo}>
          <img src={logoSrc} />
        </div>
        <h1>Хакатон</h1>
        <form className={styles.fields}>
          <Input placeholder='Введите: user' value={username} onChange={onUsernameChangedHandler} disabled={loading} />
          <Input placeholder='Любой пароль' value={password} onChange={onPasswordChangedHandler} disabled={loading} type='password' />
        </form>
        <Button className={styles.button} onClick={onLoginHandler} disabled={loading || !(username && password)}>Войти</Button>
    </ProgressBox>
  );
};
