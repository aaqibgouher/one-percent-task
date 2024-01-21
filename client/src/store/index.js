import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "../reducers/userReducer";
import helperReducer from "../reducers/helperReducer";

// combine reducers
const rootReducer = combineReducers({
  userReducer,
  helperReducer,
});

// compose enhancers
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create reducer
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
