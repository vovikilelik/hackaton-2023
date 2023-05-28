import React, { useMemo } from "react";

import cn from "classnames";
import { Input } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";

import { OptionInput } from "..";

import styles from './SearchInput.module.less';

export interface AppSearchProps {
  className?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

const expandIcon = () => <MoreOutlined />;

export const SearchInput: React.FC<AppSearchProps> = ({ className, onChange, children }) => {

  const input = useMemo(() => {
    return <Input
      placeholder='Поиск'
      bordered={false}
      prefix={<SearchOutlined />}
      onChange={e => onChange?.(e.target.value)}
      className={styles.input}
      allowClear
    />
  }, [onChange]);

  return (
    <OptionInput className={cn(styles.layout, className)} input={input} bordered={false} ghost expandIcon={expandIcon}>
      <>
        {children}
      </>
    </OptionInput>
  );
}