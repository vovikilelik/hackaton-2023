import cn from 'classnames';
import styles from './Progress.module.less';

export interface ProgressProps {
  className?: string;
  value?: number | boolean;
}

export const Progress: React.FC<ProgressProps> = ({ className }) => {
  return (
    <div className={cn(styles.layout, className)}>
      <div className={cn(styles.progress, 'ui-progress-animation')} />
    </div>
  );
}

