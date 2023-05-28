import React from "react";
import cn from "classnames";

import { Component } from '../../../../../share/react';

import styles from './Teacher.module.less';

export interface TeacherProps extends Component {

}

export const Teacher: React.FC<TeacherProps> = ({ className, children }) => {
  return (
    <div className={cn(styles.layout, className)}>
      Teacher
    </div>
  );
}