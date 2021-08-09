import { TaskType } from "./actions";
import { GET_TASK } from "./actionTypes";

type Action = { type: string; payload: TaskType };

const initialState = { data: "" };

export const Reducer = (state: TaskType = initialState, action: Action) => {
  switch (action.type) {
    case GET_TASK:
      return action.payload;

    default:
      return state;
  }
};
