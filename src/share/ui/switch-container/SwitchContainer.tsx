import React from "react";

import { AppstoreAddOutlined } from "@ant-design/icons";

export interface SwitchContainerProps {
  activeKey?: string;
  className?: string;
  children?: React.ReactNode;
}

const hide = {display: 'none'}

const Placeholder: React.FC = () => {
  return (
    <div style={{display: 'flex', width: '100%', height: '100%'}}>
      <div style={{margin: 'auto', textAlign: 'center', opacity: '0.4'}}>
        <AppstoreAddOutlined style={{fontSize: '400%'}} />
        <div style={{fontSize: '150%', margin: '30px'}}>
          Настройте свою стартовую страницу
        </div>
      </div>
    </div>
  );
}

export const SwitchContainer: React.FC<SwitchContainerProps> = ({ activeKey, className, children }) => {
  return (
    <div className={className}>
      {React.Children.count(children) ? React.Children.map(children, (c: any) => {
        const key = c?.key;
        return <div key={key} style={!activeKey || key !== activeKey ? hide : undefined}>{c}</div>
      }) : <Placeholder />}
    </div>
  );
}