import constants from "@/constants";

const initialState = {
  currentUser: {}
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.AUTO_LOGIN:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.LOGIN_USER:
      newState.currentUser = action.payload.user;
      return newState;

    case constants.LOGOUT_USER:
      newState.currentUser = {};
      return newState;
    default:
      return state;
  }
};
