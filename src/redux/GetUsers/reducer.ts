import { UsersType } from "./actions";
import { GET_ALL_USERS } from "./actionTypes";

type Action = { type: string; payload: UsersType };

const initialState: [] = [];

export const Reducer = (state: [] = initialState, action: Action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;

    default:
      return state;
  }
};
