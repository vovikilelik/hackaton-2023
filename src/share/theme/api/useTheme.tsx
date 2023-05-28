import { useLens } from "@vovikilelik/react-lens"
import { themeLens } from "../../../store"
import { ThemeNameType } from "../../../store/types";

type ThemePool = { [key in ThemeNameType]?: Record<string, string> }

export const useTheme = (themes: ThemePool): [Record<string, string>, (theme: ThemeNameType) => void] => {
  const [theme, setTheme] = useLens(themeLens.go('name'));
  return [themes[theme] || {}, setTheme];
}