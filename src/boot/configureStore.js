// @flow
import thunk from "redux-thunk";
import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from "../reducers";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default function configureStore(onCompletion) {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: "GPAnsor",
      realtime: true
    })
  );

  const store = createStore(persistedReducer,enhancer);
  persistStore(store, onCompletion);

  return store;
}