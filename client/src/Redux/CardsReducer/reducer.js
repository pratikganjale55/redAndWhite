import { CARD_LOADING, CARD_SUCCESS, CRAD_FAILURE } from "./actionType";

const initialstate = {
  isLoading: false,
  isError: false,
  cardData: [],
};
const cardReducer = (state = initialstate, action) => {
  switch (action.type) {
    case CARD_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        cardData: [],
      };
    case CARD_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        cardData: action.payload,
      };
    case CRAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        cardData: [],
      };

    default:
      return state;
  }
};
export default cardReducer;
