interface ActionTypes {
  FAILURE: string;
  REQUEST: string;
  SUCCESS: string;
}

export const generateActionTypes = (prefix: string): ActionTypes => ({
  FAILURE: `${prefix}_FAILURE`,
  REQUEST: `${prefix}_REQUEST`,
  SUCCESS: `${prefix}_SUCCESS`,
});
