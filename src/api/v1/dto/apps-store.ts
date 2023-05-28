import { DeclarativeContext } from ".";
import { DetailInfo } from "./common";

export interface ApplicationInfo extends DetailInfo {}

export interface Application<C extends DeclarativeContext = DeclarativeContext> {
  info: ApplicationInfo;
  context: C;
}