import { handleActions } from "redux-actions";

import { showMenu } from "./menuAction";

const defaultState = {
  menuView: false
};

export default handleActions(
  {
    [showMenu]: (state, { payload: { menuView } }) => {
      return {
        ...state,
        menuView: !menuView
      };
    }
  },
  defaultState
);
