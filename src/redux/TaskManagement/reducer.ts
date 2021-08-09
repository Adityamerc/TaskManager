import { TasksType } from "./actions";
import { GET_ALL_TASKS } from "./actionTypes";

type Action = { type: string; payload: TasksType };

const initialState: [] = [];

export const Reducer = (state: [] = initialState, action: Action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return action.payload;

    default:
      return state;
  }
};
