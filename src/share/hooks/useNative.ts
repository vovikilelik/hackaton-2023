import { useEffect, useRef } from "react";

export type NativeCallback<E extends HTMLElement> = (element: E) => void | (() => void);

export const useNative = <E extends HTMLElement>(callback: NativeCallback<E>, deps: any[] = []) => {
	const elementRef = useRef<E>(null);

	useEffect(() => {
		const {current} = elementRef;
		
		if (current) {
            return callback(current);
        }
	}, [elementRef.current, ...deps])

	return elementRef;
}

export const multiContext = <E extends HTMLElement>(...callbackList: NativeCallback<E>[]): NativeCallback<E> => {
	return (current) => {
		const destructorList = callbackList.map(c => c(current));

		return () => destructorList.forEach(d => d && d());
	}
}