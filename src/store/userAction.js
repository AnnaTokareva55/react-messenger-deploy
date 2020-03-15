import { createActions } from "redux-actions";

export const { userRequest, userSuccess, userFailure } = createActions({
  USER_REQUEST: () => ({}),
  USER_SUCCESS: data => data,
  USER_FAILURE: error => error
});

export const loadUser = () => {
  return async dispatch => {
    try {
      dispatch(userRequest);
      const result = await fetch("/api/user.json");
      dispatch(userSuccess(await result.json()));
    } catch (error) {
      dispatch(userFailure(error));
    }
  };
};
