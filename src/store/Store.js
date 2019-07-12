import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { reducers } from "../reducers/Reducers";

export const configureStore = () => {
  // Only turn Redux Logger on in development
  const middlewares = [];

  //export the redux store and the persisted version
  const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk, ...middlewares)
  );
  return { store };
};
