export const MessageActionTypes = {
  CLEAR: '[Message] Clear',
  SET: '[Message] Set'
};

export function clearMessage () {
  return {
    type: MessageActionTypes.CLEAR
  };
}

export function setMessage (payload) {
  return {
    payload,
    type: MessageActionTypes.SET
  };
}
