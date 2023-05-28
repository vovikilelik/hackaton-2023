import { useCallback } from "react";

const launchAll = <A extends any[]>(covering: any[], ...args: A) =>
  covering.forEach(c => typeof c === 'function' && c(...args))

const mergeDeps = (covering: any[], deps?: any[]) => deps && deps.length
  ? [...covering, ...deps]
  : covering

export const useCallbackForward = <A extends any[]>(method: (...args: A) => any, covering: any[], deps?: any[]) => {
  return useCallback((...args: A) => {
    method(...args);
    launchAll(covering, ...args)
  }, mergeDeps(covering, deps))
};