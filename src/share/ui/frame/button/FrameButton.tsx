import { Button, ButtonProps } from "antd"
import { useEffect, useState } from "react"
import { Frame, FrameControlProps, FrameProps } from ".."
import { useCallbackForward } from "../../../hooks"

export interface FrameButtonProps extends FrameControlProps, ButtonProps {
  text?: React.ReactNode;
  frameProps?: FrameProps;
}

export const FrameButton: React.FC<FrameButtonProps> = ({ children, text, opened, onClose, onClick, frameProps, ...rest }) => {
  const [open, setOpened] = useState(opened)

  const clickHandler = useCallbackForward(e => setOpened(!open), [onClick]);
  const closeHandler = useCallbackForward(e => setOpened(false), [onClose]);

  useEffect(() => setOpened(opened), [opened])

  return (
    <>
      <Button onClick={clickHandler} { ...rest }>{text}</Button>
      <Frame { ...frameProps } onClose={closeHandler} opened={open}>{children}</Frame>
    </>
  );
}