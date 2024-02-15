import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";
import getApi from "../../utils/api";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await getApi.post("/user/login", data);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.message });
    return response;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
    console.log("error while login");
  }
};
