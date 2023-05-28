import { Avatar } from "antd";
import { useAuth } from "../../../../../api/auth/useAuth";
import { Image, Label, LabelProps } from "../../../../../share/ui";

import { allIcons } from "../../../../../fake/icons";

export const UserProfileLabel: React.FC<LabelProps> = (props) => {
  const [auth] = useAuth();

  return (
    <Label { ...props } >
      <span>{auth?.username}</span>
      <Avatar shape='circle' icon={<Image src={allIcons[9]} />} />
    </Label>
  );
};