export const LayoutActionTypes = {
  CLOSE_ACCOUNT_MENU: '[Layout] Close account menu',
  CLOSE_DRAWER: '[Layout] Close drawer',
  OPEN_ACCOUNT_MENU: '[Layout] Open account menu',
  OPEN_DRAWER: '[Layout] Open drawer'
};

export function closeAccountMenu () {
  return {
    type: LayoutActionTypes.CLOSE_ACCOUNT_MENU
  };
}

export function closeDrawer () {
  return {
    type: LayoutActionTypes.CLOSE_DRAWER
  };
}

export function openAccountMenu (payload) {
  return {
    payload,
    type: LayoutActionTypes.OPEN_ACCOUNT_MENU
  };
}

export function openDrawer () {
  return {
    type: LayoutActionTypes.OPEN_DRAWER
  };
}
