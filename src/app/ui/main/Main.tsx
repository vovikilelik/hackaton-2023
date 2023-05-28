import React, { useMemo } from 'react';
import { Header } from './ui/header';
import { SwipeContainer } from '../../../share/ui';
import { useAuth } from '../../../api/auth/useAuth';
import { Cources, News, UserAccount } from './ui';
import { School } from './ui/school';

import styles from './Main.module.less';

const User: React.FC = ({}) => {
  return (
    <SwipeContainer activeIndex={1} className={styles.content}>
      <School />
      <UserAccount />
      <News />
      <Cources />
    </SwipeContainer>
  );
}

const Group: React.FC = ({}) => {
  return (
    <SwipeContainer activeIndex={2} className={styles.content}>
      <div key='foo'>foo</div>
      <div key='moo'>moo</div>
      <News />
      <Cources />
    </SwipeContainer>
  );
}

const Guest: React.FC = ({}) => {
  return (
    <SwipeContainer activeIndex={0} className={styles.content}>
      <News />
      <Cources />
    </SwipeContainer>
  );
}

export const Main: React.FC = ({}) => {
  const [auth] = useAuth();

  const route = useMemo(() => {
    switch (auth.userType) {
      case 'user':
        return <User />;
      case 'group':
        return <Group />;
      default:
        return <Guest />;
    }
  }, [auth]);

  return (
    <div className={styles.layout}>
      <Header />
      { route }
    </div>
  );
};
