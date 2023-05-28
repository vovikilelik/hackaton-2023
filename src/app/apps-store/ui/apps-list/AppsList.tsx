import { AppstoreAddOutlined } from "@ant-design/icons";
import { Application } from "../../../../api/v1/dto";
import { Image, Label } from "../../../../share/ui";
import { ElementList, ElementListProps, ItemRenderer } from "../../../share/ui";
import { AppLinkView } from "../app-link-view";

import styles from './AppsList.module.less';

export interface AppsListProps extends Omit<ElementListProps<Application>, 'itemRenderer'> {}

const itemRenderer: ItemRenderer<Application> = (item, arrange) => {
  return arrange === 'list'
    ? (
      <Label>
        <Image style={{ width: '2em' }} src={item.info.icon} />
        <span>
          {item.info.title}
        </span>
      </Label>
    )
    : <AppLinkView value={item} mode="icon-with-title" />
}

export const AppsList: React.FC<AppsListProps> = ({ ...rest }) => {
  return (
    <ElementList itemRenderer={itemRenderer} { ...rest } />
  );
}