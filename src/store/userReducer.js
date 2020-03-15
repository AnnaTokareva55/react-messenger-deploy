import { handleActions } from "redux-actions";
import { userRequest, userSuccess, userFailure } from "./userAction";

const defaultState = {
  user: {},
  isLoading: false
};

export default handleActions(
  {
    [userRequest]: state => {
      return {
        ...state,
        isLoading: true
      };
    },
    [userSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        user: payload
      };
    },
    [userFailure]: state => {
      return {
        ...state,
        isLoading: false
      };
    }
  },
  defaultState
);
