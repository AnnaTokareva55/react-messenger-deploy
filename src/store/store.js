import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import chatReducer from "./chatReducer";
import userReducer from "./userReducer";
import menuReducer from "./menuReducer";
import botMiddleware from "./botMiddleware";
import chatMiddleware from "./chatMiddleware";

const persistConfig = {
  key: "reactmessanger",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["chatReducer", "userReducer", "menuReducer"]
};

export const history = createBrowserHistory();

const reducer = combineReducers({
  chatReducer,
  userReducer,
  menuReducer,
  router: connectRouter(history)
});

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : () => {};

const logger = createLogger();

export const initStore = (preloadedState = {}) => {
  const store = createStore(
    persistReducer(persistConfig, reducer),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        logger,
        chatMiddleware,
        botMiddleware,
        apiMiddleware,
        thunk
      ),
      devTools
    )
  );
  const persistor = persistStore(store);
  return {
    store,
    persistor
  };
};
