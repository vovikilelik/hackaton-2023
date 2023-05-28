export abstract class Service<P = unknown, R = unknown> {
  public readonly name: string;

  constructor(name: string) {
    this.name = name
  }

  public hasSupport(props?: unknown) {
    return true;
  }

  public abstract exec(props: P): Promise<R>
}