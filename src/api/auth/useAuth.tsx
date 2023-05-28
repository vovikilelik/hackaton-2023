import { useLens } from "@vovikilelik/react-lens"

import { authLens } from "../../store"

export const useAuth = () => {
  return useLens(authLens);
}