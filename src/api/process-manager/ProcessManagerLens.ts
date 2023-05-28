import { Lens } from "@vovikilelik/lens-js";
import { Process, ProcessManager } from ".";
import { Application } from "../v1/dto/apps-store";

let PKEY = 1;

export class ProcessManagerLens extends Lens<ProcessManager> {

  public createProcess<D>(app: Application, { data, subject }: Partial<Process<D>>): Promise<Lens<Process<D>>> {
    const key = `${app.info.uuid}-${PKEY++}`;

    const process: Process<D> = {
      ...app,
      key,
      subject: subject || app.info.title,
      data: data || {} as D
    }

    return new Promise((resolve, reject) => {
      const list = this.go('list');

      list.set([...list.get(), process]);

      const result = this.getProcess(key);
      result ? resolve(result as Lens<Process<D>>) : reject()
    });
  }

  public getProcess(key: string): Lens<Process> | undefined {
    return this.go('list')
      .list()
      .find(item => item.get().key === key);
  }
}