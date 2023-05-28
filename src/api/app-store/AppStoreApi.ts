import { AppFilter, getAppList } from "../v1/tasks/apps-store";

export class AppStoreApi {
    getList(props: AppFilter) {
        return getAppList(props)({ data: [] });
    }
}

export const defaultAppStoreApi = new AppStoreApi();