import cn from "classnames";

import styles from './FrameLayout.module.less';

export interface FrameLayoutProps {
  className?: string;
  title?: React.ReactNode;
  controls?: React.ReactNode;
  children?: React.ReactNode;
}

export const FrameLayout: React.FC<FrameLayoutProps> = ({ className, title, controls, children }) => {
  return (
    <div className={cn(styles.layout, className)}>
      <div className={styles.header}>{title}{controls}</div>
      { children }
    </div>
  );
}