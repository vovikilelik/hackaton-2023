import { LoginOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useCallback } from "react";
import { useAuth } from "../../../../../api/auth/useAuth";
import { authLens } from "../../../../../store";

export const UserProfileMenu: React.FC = (props) => {
  const [auth] = useAuth();

  const callback = useCallback(() => {
    authLens.logout();
  }, []);

  return (
    <Menu>
      <Menu.Item onClick={callback} icon={<LoginOutlined />}>Выход</Menu.Item>
    </Menu>
  );
};