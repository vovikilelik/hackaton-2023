import { Lens } from "@vovikilelik/lens-js";
import { Application } from "../v1/dto";

const hasInstalled = (appList: Application[], app: Application) => appList.find(a => a.info.uuid === app.info.uuid);

export class ApplicationListLens extends Lens<Application[]> {

  public hasInstalled(application: Application) {
    return hasInstalled(this.get(), application)
  }

  public install(application: Application): Promise<Application> {
    const apps = this.get();

    if (hasInstalled(apps, application)) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      this.set([ ...apps, application ]);
      resolve(application);
    });
  }

  public remove(application: Application): Promise<Application> {
    const apps = this.get();

    return new Promise((resolve, reject) => {
      this.set(apps.filter(({ info: { uuid } }) => uuid !== application.info.uuid));
      resolve(application);
    });
  }
}