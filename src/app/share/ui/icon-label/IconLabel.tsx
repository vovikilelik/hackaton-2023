import { Label, LabelProps } from '../../../../share/ui';
import styles from './IconLabel.module.less'

export interface IconLabelProps extends LabelProps {
  icon?: React.ReactElement;
  title?: string;
  prefix?: string;
}

export const IconLabel: React.FC<IconLabelProps> = ({icon, title, prefix, children, ...props}) => {
  return (
    <Label { ...props }>
      { icon }
      <div className={styles.label}>
        {prefix && <span className={styles.prefix}>{ prefix }</span>}
        {prefix && <br />}
        <span className={styles.title}>{ title }</span>
      </div>
      { children }
    </Label>
  );
};