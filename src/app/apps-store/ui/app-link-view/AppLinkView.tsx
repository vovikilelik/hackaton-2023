import cn from "classnames";

import { Application } from "../../../../api/v1/dto";
import { Label } from "../../../../share/ui";
import { AppIcon } from "../app-icon";

import styles from './AppLinkView.module.less';

export interface AppLinkViewProps {
  className?: string;
  value: Application;
  mode?: 'icon' | 'icon-with-title';
  children?: React.ReactNode;
}

export const AppLinkView: React.FC<AppLinkViewProps> = ({ value, mode, className, children }) => {
  const {icon, title} = value.info;

  return (
    <Label className={cn(styles.layout, className)}>
      <AppIcon className={styles.icon} icon={icon} />
      {mode === 'icon-with-title' && <div className={styles.title}>{title}</div> }
      {children}
    </Label>
  );
}