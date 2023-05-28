import { Application } from "../v1/dto/apps-store";

export interface Process<D = unknown> extends Application {
  key: string;
  subject: string;
  data: D;
}

export interface ProcessManager {
  list: Process[]
}