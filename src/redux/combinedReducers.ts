import { combineReducers } from "redux";
import { Reducer as accessTokenReducer } from "./Login/reducer";
import { Reducer as userIdReducer } from "./UserId/reducer";
import { Reducer as allTasksReducer } from "./TaskManagement/reducer";
import { Reducer as singleTaskReducer } from "./GetTask/reducer";

export const combinedReducers = combineReducers({
  accessTokenReducer,
  userIdReducer,
  allTasksReducer,
  singleTaskReducer,
});
