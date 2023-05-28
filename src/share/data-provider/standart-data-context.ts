import React, { useContext, useMemo } from "react";

export interface IStandartDataContext<D = unknown> {
  data: D;
  status: 'created' | 'pending' | 'completed' | number;
}

export const StandartDataContext = React.createContext<IStandartDataContext | null>(null);
StandartDataContext.displayName = 'StandartDataContext';

export const useStandartDataContext = <D>(defaultData: D): IStandartDataContext<D> => {
  const { data, status } = useContext(StandartDataContext) || {};

  const context = useMemo<IStandartDataContext<D>>(() => {
    return status === undefined
      ? { data: defaultData, status: 'created' }
      : { data: data as D, status}
  }, [data, status, defaultData])

  return context;
}