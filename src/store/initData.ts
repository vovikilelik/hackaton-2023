import { Application } from "../api/v1/dto";
import { parseJson, parseJsonOr } from "../share/utils";
import { ILens } from "./types";

const authRaw = localStorage.getItem('auth');
const appsRaw = localStorage.getItem('apps');

export const storeApps = (apps: Application[]) => {
  localStorage.setItem('apps', JSON.stringify(apps));
}

export const initData: ILens = {
  theme: {
    name: 'whitesmoke'
  },
  auth: parseJson(authRaw) || { username: '' },
  processManager: { list: [] },
  installedApps: parseJsonOr(appsRaw, [])
}