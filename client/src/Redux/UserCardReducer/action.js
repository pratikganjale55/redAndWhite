import getApi from "../../utils/api";
import {
  USER_CARD_LOADING,
  USER_CARD_SUCCESS,
  USER_CRAD_FAILURE,
} from "./actionType";

export const userBlogGet = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: USER_CARD_LOADING });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await getApi.get(`/blog/userPost/${id}`, config);

    dispatch({ type: USER_CARD_SUCCESS, payload: response.data.blog });
    return response;
  } catch (error) {
    dispatch({ type: USER_CRAD_FAILURE });
    console.log("error while user blog data");
  }
};
