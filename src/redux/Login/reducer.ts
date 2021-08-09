import { LoginType } from "./actions";

type Action = { type: string; payload: LoginType };

const initialState = { accessToken: "", companyId: "" };

export const Reducer = (state: LoginType = initialState, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;

    default:
      return state;
  }
};
