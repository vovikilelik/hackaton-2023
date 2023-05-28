import { useCallback } from "react";
import { Input, InputProps } from "antd"
import { Lens } from "@vovikilelik/lens-js"
import { useLens } from "@vovikilelik/react-lens"

export const LensInput: React.FC<InputProps & { lens: Lens<number | string | undefined> }> = ({ lens, ...props }) => {
  const [value, setValue] = useLens(lens);
  const onChangeHandler = useCallback(e => setValue(e.target.value), [lens]);

  return <Input value={value} onChange={onChangeHandler} { ...props } />
}