import styles from './Breadcrumb.module.less';

export const Breadcrumb: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      { children }
    </div>
  );
}