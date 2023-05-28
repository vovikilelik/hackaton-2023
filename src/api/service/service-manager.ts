import { Service } from ".";

const getServiceFilter = (name: string, props: unknown) => (service: Service) => {
  return service.name === name && (!props || service.hasSupport(props));
}

export class ServiceManager {

  private serviceList: Service[] = []

  public registryService(service: Service) {
    this.serviceList.push(service)
  }

  public setService(...service: Service[]) {
    this.serviceList = service;
  }

  public getService<P = unknown>(name: string, props?: P): Service[] {
    return this.serviceList.filter(getServiceFilter(name, props))
  }
}

export const serviceManager = new ServiceManager();