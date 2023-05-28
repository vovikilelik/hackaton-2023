import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import cn from "classnames";
import { useCallback, useMemo } from "react";
import { AppFilter } from "../../../../api/v1/tasks/apps-store";

import styles from './SearchFilter.module.less';

export interface SearchFilterProps {
    className?: string;
    filter: AppFilter;
    onFilterChanged?: (filter: AppFilter) => void;
}

const SearchIcon = <SearchOutlined />

export const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChanged, filter, className }) => {
    const changeHandler = useMemo(() => (value: Partial<AppFilter>) => {
        onFilterChanged?.({ ...filter,  ...value})
    }, [onFilterChanged])

    const textChanged = useCallback(e => changeHandler({ text: e.target.value }), [])

    return (
        <div className={cn(styles.layout, className)}>
            <Input
                prefix={SearchIcon}
                value={filter.text}
                onChange={textChanged}
            />
        </div>
    );
}