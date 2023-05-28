import classNames from "classnames";
import { useState } from "react";
import { defaultAppStoreApi } from "../../../../api/app-store/AppStoreApi";
import { Application } from "../../../../api/v1/dto";
import { AppFilter } from "../../../../api/v1/tasks/apps-store";
import { useDebounceEffect } from "../../../../share/hooks";
import { ProgressBox } from "../../../../share/ui";
import { AppsList } from "../apps-list";
import { SearchFilter } from "../search-filter";

import styles from './SearchPage.module.less';

export interface SearchPageProps {
    className?: string;
    onItemClick?: (app: Application) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ className, onItemClick }) => {
    const [filter, setFilter] = useState<AppFilter>({});
    const [apps, setApps] = useState<Application[]>([]);

    const [progress, setProgress] = useState<number | undefined>();

    useDebounceEffect((sync) => {
        setProgress(0);
        defaultAppStoreApi
            .getList(filter)
            .then(({ data }) => sync() && setApps(data))
            .finally(() => sync() && setProgress(undefined))
    }, [filter]);

    return (
        <div className={classNames(styles.layout, className)}>
            <SearchFilter filter={filter} onFilterChanged={setFilter}></SearchFilter>
            <ProgressBox className={styles.apps} value={progress}>
                <AppsList arrange='grid' items={apps} onItemClick={onItemClick} />
            </ProgressBox>
        </div>
    );
}