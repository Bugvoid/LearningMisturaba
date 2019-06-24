import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ReducerBoardCreate from "./ReducerCreateBoard";
import ReducerCollectionBoard from "./ReducerCollectionBoard";
import ReducerBoardActive from "./ReducerBoardActive";
import DataReducerBoardActive from "./DataReducerBoardActive";

const RootReducer = combineReducers({
  form: formReducer,
  newBoard: ReducerBoardCreate,
  boardsCollection: ReducerCollectionBoard,
  activeBoard: ReducerBoardActive,
  activeBoardData: DataReducerBoardActive
});

export default RootReducer;
