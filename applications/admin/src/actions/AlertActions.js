export const AlertActionTypes = {
  CLEAR: '[Alert] Clear',
  SET: '[Alert] Set'
};

export function clearAlert () {
  return {
    type: AlertActionTypes.CLEAR
  };
}

export function setAlert (payload) {
  return {
    payload,
    type: AlertActionTypes.SET
  };
}
