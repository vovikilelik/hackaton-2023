import cn from 'classnames';

import { Toolbar } from '../../../../share/layout';
import { Progress } from '../../../../share/ui';

import styles from './ApplicationLayout.module.less';

export interface ApplicationLayoutProps {
  className?: string;
  busy?: boolean;
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
}

export const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ className, busy, toolbar, children }) => {
  return (
    <div className={cn(styles.layout, className)}>
      {toolbar && (
        <Toolbar className={styles.toolbar} sticky>
          { toolbar }
        </Toolbar>
      )}
      <div className={styles.viewer}>
        {busy && <Progress className={styles.viewerProgress} />}
        { children }
      </div>
    </div>
  );
};
