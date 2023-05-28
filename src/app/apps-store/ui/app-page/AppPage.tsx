import { useCallback, useMemo } from "react";

import { CheckOutlined, HomeOutlined } from "@ant-design/icons";
import { useLens } from "@vovikilelik/react-lens";
import { Breadcrumb, Button } from "antd";
import cn from "classnames";

import { Application } from "../../../../api/v1/dto";
import { installedAppsLens } from "../../../../store";
import { AppView } from "../app-view";

import styles from './AppPage.module.less';

export interface AppPageProps {
  className?: string;
  value: Application;
  onItemClick?: (app?: Application) => void;
}

const checkOutlinedIcon = <CheckOutlined style={{marginRight: '1em'}} />;

const renderInstalledControls = (value: Application) => {
  return (
    <>
      <span>
        <CheckOutlined /> Установлено | <strong>{value.info?.version}</strong>
      </span>
      <Button type="primary" danger onClick={() => installedAppsLens.remove(value).then()}>
        Удалить
      </Button>
    </>
  );
}

export const AppPage: React.FC<AppPageProps> = ({ value, onItemClick, className }) => {
  useLens(installedAppsLens);

  const onHome = useCallback(() => onItemClick?.(), [onItemClick]);

  const controls = useMemo(() => {
    return (
      <div className={styles.actions}>
        {installedAppsLens.hasInstalled(value)
          ? renderInstalledControls(value)
          : (
            <div>
              <Button type="primary" onClick={() => installedAppsLens.install(value).then()}>
                Установить
              </Button>
            </div>
          )
        }
      </div>
    )
  }, [installedAppsLens.hasInstalled(value), value.info.version]);

  return (
    <div className={cn(styles.layout, className)}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item onClick={onHome}>
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {value.info.title}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <AppView value={value}>
        {controls}
      </AppView>
    </div>
  );
}