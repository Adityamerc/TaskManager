import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GET_ALL_USERS } from "./actionTypes";
import { GetAllUsers } from "./../../Apis";

export type UsersType = {
  data: { [key: string]: any }[];
  users_accepted: number;
};

interface ActionCreator {
  type: string;
  payload: UsersType;
}

const UpdateState = (data: UsersType) => ({
  type: GET_ALL_USERS,
  payload: data,
});

export const GetUsers = (companyId: string, accessToken: string) => {
  return async (dispatch: ThunkDispatch<ActionCreator, void, Action>) => {
    try {
      const data = await GetAllUsers(companyId, accessToken);
      dispatch(UpdateState(data.results));
    } catch (error) {}
  };
};
