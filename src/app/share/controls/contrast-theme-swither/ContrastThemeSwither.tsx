import { Switch, SwitchProps } from "antd";
import { useCallback } from "react";
import { useTheme } from "../../../../share/theme/api/useTheme";

const contrast = {};

export const ContrastThemeSwither: React.FC<SwitchProps> = (props) => {
  const [current, setTheme] = useTheme({contrast});

  const onChangeHandler = useCallback(checked => {
    setTheme(checked ? 'contrast' : 'whitesmoke');
  }, [setTheme]);

  return <Switch checked={current === contrast} onChange={onChangeHandler} { ...props } />
};