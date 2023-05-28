import { getNewsListTask } from '../../v1/tasks/news';

export class NewsApi {
    getList() {
        return getNewsListTask()({ data: [] });
    }
}

export const newsApi = new NewsApi();