import React from 'react';

import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';
import { useTheme } from './share/theme/api/useTheme';

import './index.css';

import contrast from './share/theme/contrast/index.module.less';
import whitesmoke from './share/theme/whitesmoke/index.module.less';

import { ConfigProvider, ThemeConfig } from 'antd';

const Theme: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [current] = useTheme({whitesmoke, contrast});
  return <div id='theme' className={current.theme}>{ children }</div>
}

const theme: ThemeConfig = {
  token: {
    colorBgBase: 'whitesmoke',
    colorBgContainer: 'whitesmoke',
    colorBgLayout: 'whitesmoke',
    colorBgElevated: 'whitesmoke',
    fontSize: 16
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <Theme>
          <App />
        </Theme>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
