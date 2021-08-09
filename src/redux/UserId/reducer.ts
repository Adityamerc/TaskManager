import { UserIdType } from "./actions";

type Action = { type: string; payload: UserIdType };

const initialState = "";

export const Reducer = (state: UserIdType = initialState, action: Action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return action.payload;

    default:
      return state;
  }
};
