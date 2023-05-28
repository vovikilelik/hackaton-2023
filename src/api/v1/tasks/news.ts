import { join } from "@vovikilelik/task-queue-ts"
import { fakeResolve } from "../../../fake/fakeFetch";
import { NewsItemDto, Response } from "../dto";
import { getNews } from '../../../fake/news';

export const getNewsListTask = () =>
  join<Response<NewsItemDto[]>>(
    () => fakeResolve(getNews())
  );