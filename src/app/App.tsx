import React, { useEffect, useState } from 'react';

import { useAuth } from '../api/auth/useAuth';
import { localTokenTask } from '../api/v1/tasks/auth';
import { Main } from './ui';

import styles from './App.module.less';

export const App: React.FC = ({}) => {
  const [auth, setAuth] = useAuth();
  const [authorized, setAuthorized] = useState<boolean>(!!auth?.serverToken);

  useEffect(() => {
    const localToken = auth?.localToken;
    const serverToken = auth?.serverToken;

    if (serverToken) {
      setAuthorized(true);
    } else if (localToken) {
      localTokenTask({ ...auth })
        .then(response => {
          localStorage.setItem('auth', JSON.stringify(response));
          setAuth(response);  
        });
    } else {
      setAuthorized(false);
    }
  }, [auth]);

  return (
    <Main />
  );
};
