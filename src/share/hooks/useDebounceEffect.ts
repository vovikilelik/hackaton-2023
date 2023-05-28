import { useEffect, useMemo } from "react"
import { Debounce } from "@vovikilelik/lens-js"

export const useDebounceEffect = (func: (sync: () => boolean) => void, deps: any[], timeout = 0) => {
    const context = useMemo(() => new Debounce(), []);

    useEffect(() => {
        context.run(func, timeout);
    }, [timeout, ...deps]);
}