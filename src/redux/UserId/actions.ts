import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GetUserId } from "../../Apis";
import { SET_USER_ID } from "./actionTypes";

export type UserIdType = string;

interface ActionCreator {
  type: string;
  payload: UserIdType;
}

const UpdateState = (data: UserIdType) => ({
  type: SET_USER_ID,
  payload: data,
});

export const getUserId = (companyId: string, accessToken: string) => {
  return async (dispatch: ThunkDispatch<ActionCreator, void, Action>) => {
    try {
      const data = await GetUserId(companyId, accessToken);
      const datum = data.results.user_id;
      dispatch(UpdateState(datum));
    } catch (error) {}
  };
};
