import { DrawerProps } from "antd";
import cn from "classnames";

import styles from './Header.module.less';

export interface HeaderProps {
    className?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    placement?: DrawerProps['placement'];
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, extra, placement, children }) => {
    const isReverse = placement === 'left'

    return (
        <div className={cn(styles.layout, isReverse && styles.layoutReverse)}>
            { children }
            { title }
            { extra }
        </div>
    );
}