import { createStore, applyMiddeware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import throttle from "lodash/throttle";
import RootReducer from "./Reducers/ReducerRoot";
import { loadState, saveState } from "./Utilsy/StorageLocalCollection";

const middleware = applyMiddeware(thunk);
const persistedState = loadState();

const Store = createStore(
  RootReducer,
  persistedState,
  composeWithDevTools(middleware)
);

Store.subscribe(
  throttle(() => {
    saveState({
      boardsCollection: Store.getState().boardsCollection,
      activeBoard: Store.getState().activeBoard,
      newBoard: Store.getState().newBoard,
      activeBoardData: Store.getState().activeBoardData
    });
  }, 1000)
);

export default Store;
