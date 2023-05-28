import { DetailInfo } from "./common";

export interface WidgetInfo extends DetailInfo {
  images?: string[];
}

export type SupportWidgetValueType = 'unset' | 'text' | 'integer' | 'float' | 'object' | 'complex';

export interface WidgetValue<T = unknown> {
  type: SupportWidgetValueType | string;
  data: T;
}

export interface WidgetContext<P> {
  name: string;
  properties: P;
}

export interface Widget<P = unknown, V extends WidgetValue = WidgetValue> {
  info: WidgetInfo;
  context: WidgetContext<P>;
  value: V;
}

export interface WidgetName {
  name: string;
}

export interface WidgetReplic<P = unknown, V extends WidgetValue = WidgetValue> extends Widget<P, V>, WidgetName {

}