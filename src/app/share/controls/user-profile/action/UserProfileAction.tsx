import { Popover, PopoverProps } from "antd";
import { useMemo } from "react";
import { Action, ActionProps } from "../../../../../share/ui";
import { UserProfileMenu } from "../menu";

export interface UserProfileActionProps extends ActionProps, Omit<PopoverProps, 'content'> {}

const defaultClickHandler = () => {};

export const UserProfileAction: React.FC<UserProfileActionProps> = ({onClick = defaultClickHandler, inactive, disabled, className, children, ...rest}) => {
  const trigger = useMemo(() => {
    return disabled || inactive ? undefined : 'click';
  }, [disabled, inactive]);

  return (
    <Popover destroyTooltipOnHide content={<UserProfileMenu />} trigger={trigger} { ...rest }>
      <Action className={className} onClick={onClick} inactive={inactive} disabled={disabled}>
        { children }
      </Action>
    </Popover>
  );
};