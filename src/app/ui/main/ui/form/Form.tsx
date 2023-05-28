import React, { useMemo } from "react";
import cn from "classnames";

import { Component } from '../../../../../share/react';

import styles from './Form.module.less';

export interface FormProps extends Component {
  title: string;
  color?: string;
}

export const Form: React.FC<FormProps> = ({ className, children, title, color = 'silver' }) => {
  const style = useMemo(() => {
    return {
      borderBottom: `5px solid ${color}`,
      color
    }
  }, [color]);

  return (
    <div className={cn(styles.layout, className)}>
      <div className={styles.title} style={style}>{title}</div>
      {children}
    </div>
  );
}