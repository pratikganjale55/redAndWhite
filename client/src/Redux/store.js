import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./AuthReducer/reducer";
import cardReducer from "./CardsReducer/reducer";
import userCardReducer from "./UserCardReducer/reducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  cardReducer: cardReducer ,
  userCardReducer :userCardReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
