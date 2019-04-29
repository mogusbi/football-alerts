export const DrawerActionTypes = {
  CLOSE: '[Drawer] Close',
  OPEN: '[Drawer] Open'
};

export function closeDrawer () {
  return {
    type: DrawerActionTypes.CLOSE
  };
}

export function openDrawer () {
  return {
    type: DrawerActionTypes.OPEN
  };
}
