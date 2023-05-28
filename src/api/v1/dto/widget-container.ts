import { Widget, WidgetName, WidgetReplic, WidgetValue } from "./widget";

export interface ContainerContext {
  widgets: WidgetReplic[];
}

export interface WidgetContainer<C extends ContainerContext, V extends WidgetValue> extends Widget<C, V> {}

export interface WidgetLayoutNode {
  name: string;
}

export interface WidgetLayoutContext<N extends WidgetLayoutNode> extends ContainerContext {
  layout: N[];
}

export interface WidgetLayout<N extends WidgetLayoutNode, V extends WidgetValue> extends WidgetContainer<WidgetLayoutContext<N>, V> {}

export interface WidgetStaticPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface WidgetStaticLayoutNode extends WidgetLayoutNode {
  position: WidgetStaticPosition
}

export interface WidgetStaticLayout extends WidgetLayout<WidgetStaticLayoutNode, WidgetValue> {}

export interface WidgetStaticLayoutReplic extends WidgetStaticLayout, WidgetName {}
