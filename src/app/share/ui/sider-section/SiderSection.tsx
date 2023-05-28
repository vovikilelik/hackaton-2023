import cn from "classnames";

import styles from "./SiderSection.module.less";

export interface SiderSectionProps {
  title?: React.ReactNode;
  busy?: boolean;
  className?: string;
  borderless?: boolean;
  children?: React.ReactNode;
}

export const SiderSection: React.FC<SiderSectionProps> = ({ title, busy, className, borderless, children }) => {
  return (
    <div className={cn(styles.layout, className)}>
      {title && <div className={styles.title}>{ title }</div>}
      <div className={cn({[styles.border]: !borderless, [styles.busy]: busy})}>{ children }</div>
    </div>
  );
}