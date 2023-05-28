import React from "react";

import cn from "classnames";

import styles from './Label.module.less';

export interface LabelProps {
  className?: string;
  children?: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ className, children }) => {
  return (
    <div className={cn(styles.layout, className)}>
      {children}
    </div>
  );
}