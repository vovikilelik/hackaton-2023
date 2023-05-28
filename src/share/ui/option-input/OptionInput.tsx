import { Collapse, CollapseProps } from "antd";
import cn from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styles from './OptionInput.module.less';

export interface OptionInputProps extends Omit<CollapseProps, 'defaultActiveKey' | 'activeKey' | 'onChange'> {
  input: React.ReactElement;
  onChange?: (expanded: boolean) => void;
  expanded?: boolean;
  showArrow?: boolean;
}

export const OptionInput: React.FC<OptionInputProps> = ({ className, input, expanded, showArrow, onChange, children, ...rest }) => {
  const [activeKey, setActiveKey] = useState('');

  const onChangeHandler = useCallback(key => {
    setActiveKey(key);
    onChange?.(!!key);
  }, [onChange]);

  useEffect(() => {
    setActiveKey(expanded ? 'input' : '');
  }, [expanded])

  const control = useMemo(() => <div onClick={(e) => e.stopPropagation()}>{ input }</div>, [input]);

  return (
    <Collapse
      className={cn(styles.layout, className)}
      activeKey={activeKey}
      onChange={onChangeHandler}
      expandIconPosition='end'
      { ...rest }
    >
      <Collapse.Panel showArrow={showArrow} header={control} key='input'>
        { children }
      </Collapse.Panel>
    </Collapse>
  );
}