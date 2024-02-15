import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";

const initialstate = {
  isLoading: false,
  isError: false,
  isSuccess: "",
};
const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: "",
      };

    default:
      return state;
  }
};
export default authReducer;
