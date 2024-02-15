import {  USER_CARD_LOADING, USER_CARD_SUCCESS, USER_CRAD_FAILURE } from "./actionType";

const initialstate = {
  isLoading: false,
  isError: false,
  userCardData: [],
};
const userCardReducer = (state = initialstate, action) => {
  switch (action.type) {
    case USER_CARD_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        userCardData: [],
      };
    case USER_CARD_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        userCardData: action.payload,
      };
    case USER_CRAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        userCardData: [],
      };

    default:
      return state;
  }
};
export default userCardReducer;
