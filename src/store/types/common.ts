import { ProcessManager } from "../../api/process-manager";
import { Application } from "../../api/v1/dto";

export type ThemeNameType = 'whitesmoke' | 'contrast';

export interface Theme {
  name: ThemeNameType;
}

export type UserType = 'user' | 'group';

export interface Auth {
  nicname?: string;
  username: string;
  localToken?: string;
  serverToken?: string;
  userType?: UserType;
}

export interface ILens {
  theme: Theme;
  auth: Auth;
  processManager: ProcessManager;
  installedApps: Application[]
}