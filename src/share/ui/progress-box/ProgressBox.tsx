import cn from 'classnames';

import { Progress, ProgressProps } from '..';

import styles from './ProgressBox.module.less';

export interface ProgressBoxProps extends ProgressProps {
  progressClassName?: string;
  position?: 'top' | 'bottom';
  children?: React.ReactNode;
}

export const ProgressBox: React.FC<ProgressBoxProps> = ({ className, progressClassName, position, children, value, ...rest }) => {
  const hasValue = !(value === false || value === undefined);
  
  return (
    <div className={cn(hasValue && styles.layout, className)}>
      {hasValue && (
        <Progress
          className={cn(styles.progress, {[styles.top]: !position || position === 'top', [styles.bottom]: position === 'bottom'}, progressClassName)}
          { ...rest }
        />
      )}
      { children }
    </div>
  );
}

