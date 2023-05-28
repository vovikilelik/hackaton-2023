import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useStateForward = <S>(externalValue: S | (() => S), ...deps: any[]): [S, Dispatch<SetStateAction<S>>] => {
    const [value, setValue] = useState<S>(externalValue);

    useEffect(() => {
        setValue(externalValue)
    }, [externalValue, ...deps])

    return [value, setValue];
}