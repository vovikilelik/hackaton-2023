import cn from "classnames";

import styles from './Toolbar.module.less';

export interface ToolbarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    content?: 'controls';
    sticky?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ className, content, sticky, children, ...rest }) => {
  return (
    <div className={cn(styles.layout, sticky && styles.sticky, content && styles[content], className)} { ...rest } >
        { children }
    </div>
  );
}