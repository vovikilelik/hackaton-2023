import { useNative } from "./useNative";

export const useElementAttribute = <E extends HTMLElement, A extends {[name: string]: string | boolean | number} = {}>(attributes: A, deps: any[] = []) => {
	return useNative<E>(e => {
		const localCopy = { ...attributes };

		Object.keys(localCopy).forEach(k => {
			e.setAttribute(k, String(localCopy[k]))
		})

		return () => {
			Object.keys(localCopy)
			.filter(k => attributes[k] !== undefined)
			.forEach(k => {
				e.removeAttribute(k)
			})
		}
	}, [attributes, ...deps]);
}