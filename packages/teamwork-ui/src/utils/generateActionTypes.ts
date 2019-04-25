export const generateActionTypes = (prefix: string) => ({
  [`${prefix}_FAILURE`]: `${prefix}_FAILURE`,
  [`${prefix}_REQUEST`]: `${prefix}_REQUEST`,
  [`${prefix}_SUCCESS`]: `${prefix}_SUCCESS`,
});
