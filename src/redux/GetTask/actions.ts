import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GET_TASK } from "./actionTypes";
import { GetTask } from "./../../Apis";

export type TaskType = { [key: string]: any };

interface ActionCreator {
  type: string;
  payload: TaskType;
}

const UpdateState = (data: TaskType) => ({
  type: GET_TASK,
  payload: data,
});

export const GetSingleTask = (
  companyId: string,
  accessToken: string,
  taskId: string
) => {
  return async (dispatch: ThunkDispatch<ActionCreator, void, Action>) => {
    try {
      const data = await GetTask(companyId, accessToken, taskId);
      dispatch(UpdateState(data.results));
    } catch (error) {}
  };
};
