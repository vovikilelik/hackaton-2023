import cn from "classnames";

import { Application } from "../../../../api/v1/dto";
import { AppIcon } from "../app-icon";

import styles from './AppView.module.less';

export interface AppViewProps {
  className?: string;
  value: Application;
  children?: React.ReactNode;
}

export const AppView: React.FC<AppViewProps> = ({ value, className, children }) => {
  const {icon, title, vendor, version, description} = value.info;

  return (
    <div className={cn(styles.layout, className)}>
      <div className={styles.head}>
        <div className={styles.headIcon}>
          <AppIcon icon={icon} />
        </div>
        <div className={styles.headTitle}>
          <span className={styles.headTitleMain}>{title}</span>
          <span className={styles.headTitleAdd}>{vendor} | <strong>{version}</strong></span>
        </div>
        <div className={styles.headParams}>
          {/* params */}
        </div>
      </div>
      <div className={styles.actions}>{children}</div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
}