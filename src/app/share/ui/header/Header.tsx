import React from "react";

import { Layout } from "antd";
import cn from "classnames";

import styles from './Header.module.less';

export interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ className, children }) => {
  return (
    <Layout.Header className={cn(styles.layout, className)}>
      { children }
    </Layout.Header>
  );
}