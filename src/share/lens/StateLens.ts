import { Lens, createLens, Getter, Setter } from "@vovikilelik/lens-js";

export abstract class StateLens<T, S extends object, P = unknown> extends Lens<T, P> {
    private _state: Lens<S>;

    constructor(getter: Getter<T>, setter: Setter<T>, parent: P | undefined, state: S) {
        super(getter, setter, parent);
        this._state = createLens(state);
    }

    get state(): Lens<S> {
		  return this._state;
    }
}
