export const parseJson = <P>(text: string | null | 0 | false): P | undefined => {
  try {
    return text ? JSON.parse(text) : undefined;
  } catch (e) {}
}

export const parseJsonOr = <P>(text: string | null | 0 | false, defaultValue: P): P => {
  try {
    return text ? JSON.parse(text) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}