import { CloseOutlined } from "@ant-design/icons"
import { Modal, ModalProps } from "antd"
import cn from "classnames"
import { useEffect, useMemo, useState } from "react"
import { FrameLayout, FrameLayoutProps } from "."
import { Action } from ".."
import { useCallbackForward } from "../../hooks"

import styles from './Frame.module.less';

const defaultFrameProps: ModalProps = {
  footer: false,
  closable: false
}

export interface FrameControlProps {
  opened?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface FrameProps extends FrameControlProps, FrameLayoutProps, Omit<ModalProps, 'visible'> {}

export const Frame: React.FC<FrameProps> = ({ className, title, controls, closable, opened, onClose, onOk, onCancel, children, ...modalProps }) => {
  const [open, setOpened] = useState(opened)

  const okHandler = useCallbackForward(e => setOpened(false), [onOk, onClose]);
  const cancelHandler = useCallbackForward(e => setOpened(false), [onCancel, onClose])

  const caption = useMemo(() => typeof title === 'string' ? <div className={styles.caption}>{title}</div> : title, [title])

  const compound = useMemo(() => {
    return (
      <>
        {controls}
        <Action className={styles.closeAction} onClick={cancelHandler}><CloseOutlined /></Action>
      </>
    );
  }, [controls]);

  useEffect(() => setOpened(opened), [opened])

  return (
    <Modal className={cn(styles.layout, className)} { ...defaultFrameProps } { ...modalProps } open={open} onOk={okHandler} onCancel={cancelHandler}>
      <FrameLayout title={caption} controls={compound}>
        {children}
      </FrameLayout>
    </Modal>
  )
}
