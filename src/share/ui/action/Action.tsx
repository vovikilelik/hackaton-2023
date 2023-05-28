import React, { MouseEventHandler, useMemo } from "react";

import cn from "classnames";

import styles from './Action.module.less';

export interface ActionProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  inactive?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Action: React.FC<ActionProps> = ({ className, onClick, inactive, disabled, children }) => {
  const onClickHandler = useMemo(() => {
    return inactive || disabled ? undefined : onClick;
  }, [onClick, inactive, disabled]);

  return (
    <div
      className={cn({[styles.active]: !!onClickHandler, [styles.disabled]: disabled }, className)}
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
}