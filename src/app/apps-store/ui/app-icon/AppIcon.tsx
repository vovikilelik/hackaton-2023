import cn from "classnames";
import { Application } from "../../../../api/v1/dto";
import { Image, Label } from "../../../../share/ui";

import styles from './AppIcon.module.less';

import unknownAppIconSrc from '../../../../assets/img/unknown-app-hi.png';

export interface AppIconProps {
  className?: string;
  icon?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({ icon, className }) => {
  return (
    <Image className={cn(styles.layout, className)} src={icon || unknownAppIconSrc} />
  );
}