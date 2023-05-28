import cn from "classnames";

import styles from './Image.module.less';
import { CSSProperties } from 'react';

export interface ImageProps {
  src: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  draggable?: boolean;
  style?: CSSProperties;
}

export const Image: React.FC<ImageProps> = ({ className, draggable = false, ...rest }) => {
  return (
    <img draggable={draggable} className={cn(styles.image, className)} { ...rest } />
  );
}