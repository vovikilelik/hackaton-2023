import { Lens } from "@vovikilelik/lens-js";
import { Auth } from "../types";

export class AuthLens extends Lens<Auth> {
    public logout() {
        const { username } = this.get();

        this.set({ username });
    }
}