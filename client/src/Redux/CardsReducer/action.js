import getApi from "../../utils/api";
import { CARD_LOADING, CARD_SUCCESS, CRAD_FAILURE } from "./actionType";

export const cardGet = () => async (dispatch) => {
  try {
    dispatch({ type: CARD_LOADING });
    const response = await getApi.get("/blog");
    // console.log(response.data.blogs)
    dispatch({ type: CARD_SUCCESS, payload: response.data.blogs });
    return response;
  } catch (error) {
    dispatch({ type: CRAD_FAILURE });
    console.log("error while blog data");
  }
};

export const searchBlog = (searchQuery, cardData) => async (dispatch) => {
  try {
    dispatch({ type: CARD_LOADING });
    console.log("card", cardData);
    const filteredUserCardData = cardData.filter(
      (card) =>
        card.title.toLowerCase() == searchQuery.toLowerCase() ||
        card.category.toLowerCase() == searchQuery.toLowerCase()
    );
    console.log("filter", filteredUserCardData);
    dispatch({ type: CARD_SUCCESS, payload: filteredUserCardData });
  } catch (error) {
    dispatch({ type: CRAD_FAILURE });
    console.log("error while search blog data blog data");
  }
};
