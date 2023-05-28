import React, { useMemo } from "react";

import { IStandartDataContext, StandartDataContext } from ".";

export const StandartDataProvider: React.FC<IStandartDataContext & { children?: React.ReactNode }> = ({ data, status, children }) => {
  const value = useMemo(() => ({ data, status }), [data, status])
  
  return (
    <StandartDataContext.Provider value={value}>
      {children}
    </StandartDataContext.Provider>
  );
}