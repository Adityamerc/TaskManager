import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GET_ALL_TASKS } from "./actionTypes";
import { GetAllTasks } from "./../../Apis";

export type TasksType = { [key: string]: any }[];

interface ActionCreator {
  type: string;
  payload: TasksType;
}

const UpdateState = (data: TasksType) => ({
  type: GET_ALL_TASKS,
  payload: data,
});

export const GetTasks = (companyId: string, accessToken: string) => {
  return async (dispatch: ThunkDispatch<ActionCreator, void, Action>) => {
    try {
      const data = await GetAllTasks(companyId, accessToken);
      dispatch(UpdateState(data.results));
    } catch (error) {}
  };
};
