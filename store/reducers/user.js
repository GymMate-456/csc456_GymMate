// store/reducers/user.js

const SET_USER_ID = "SET_USER_ID";

const initialState = {
  userID: null,
};

export const setUserID = (userID) => ({
  type: SET_USER_ID,
  payload: userID,
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userID: action.payload };
    default:
      return state;
  }
};

export default userReducer;
