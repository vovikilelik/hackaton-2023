import React from "react";
import cn from "classnames";

import { Component } from '../../../../../share/react';

import styles from './GroupAccount.module.less';

export interface GroupAccountProps extends Component {

}

export const GroupAccount: React.FC<GroupAccountProps> = ({ className, children }) => {
  return (
    <div className={cn(styles.layout, className)}>
      GroupAccount
    </div>
  );
}