import React from "react";
import cn from "classnames";

import { Component } from '../../../../../share/react';

import styles from './News.module.less';

export interface NewsProps extends Component {

}

export const News: React.FC<NewsProps> = ({ className, children }) => {
  return (
    <div className={cn(styles.layout, className)}>
      news
    </div>
  );
}