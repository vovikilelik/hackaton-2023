import { Lens } from "@vovikilelik/lens-js";
import { Desktop, DesktopView, ViewRendererFactory } from ".";
import { Process } from "../process-manager";

let PKEY = 1;

export class DesktopLens extends Lens<Desktop> {

  public createView(processLens: Lens<Process>, renderer: ViewRendererFactory): Promise<Lens<DesktopView>> {
    const { key: processKey, info, ...app } = processLens.get();
    
    const key = `${info.uuid}-${PKEY++}`;

    const view: DesktopView = {
      ...app,
      info,
      key,
      processKey,
      renderer
    }

    return new Promise((resolve, reject) => {
      const list = this.go('list');

      list.set([...list.get(), view]);

      const result = this.getView(key);
      result ? resolve(result) : reject()
    });
  }

  public closeApp(key: string): Promise<void> {
    return new Promise(resolve => {
      const list = this.go('list');

      list.set([...list.get().filter(v => v.key !== key)]);
      resolve()
    });
  }

  public getView(key: string): Lens<DesktopView> | undefined {
    return this.go('list')
      .list()
      .find(item => item.get().key === key);
  }
}