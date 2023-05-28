import {Lens} from "@vovikilelik/lens-js";
import React from "react";
import { Process } from "../process-manager";
import { Application } from "../v1/dto/apps-store";


export type ViewRendererFactory = (props: { key: string }) => React.ReactNode;

export interface DesktopView extends Application {
  key: string;
  processKey: string;
  renderer: ViewRendererFactory;
}

export interface Desktop {
  list: DesktopView[]
  activeKey?: string;
}