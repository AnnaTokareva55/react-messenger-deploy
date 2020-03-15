import { createActions } from "redux-actions";

export const { showMenu } = createActions({
  SHOW_MENU: menuView => ({ menuView })
});
