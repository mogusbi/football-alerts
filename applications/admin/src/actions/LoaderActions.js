export const LoaderActionTypes = {
  COMPLETE: '[Loading] Complete',
  START: '[Loading] Start'
};

export function loadingComplete () {
  return {
    type: LoaderActionTypes.COMPLETE
  };
}

export function loadingStart () {
  return {
    type: LoaderActionTypes.START
  };
}
