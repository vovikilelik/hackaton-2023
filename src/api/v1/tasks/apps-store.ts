import { join } from "@vovikilelik/task-queue-ts"
import { fakeResolve } from "../../../fake/fakeFetch";
import { Response } from "../dto";
import { Application } from "../dto/apps-store";
import { allApps } from "../../../fake/apps";

export interface AppFilter {
  text?: string;
}

export const getAppList = ({ text }: AppFilter) =>
  join<Response<Application[]>>(() => fakeResolve({ data: text ? allApps.filter(a => a.info.title.toLowerCase().indexOf(text.toLowerCase()) > -1) : allApps }));