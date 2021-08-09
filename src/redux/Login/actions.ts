import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Login } from "../../Apis";
import { GetTasks } from "../TaskManagement/actions";
import { getUserId } from "../UserId/actions";
import { SET_USER } from "./actionTypes";

export interface LoginType {
  accessToken: string;
  companyId: string;
}

interface ActionCreator {
  type: string;
  payload: LoginType;
}

const UpdateState = (data: LoginType) => ({
  type: SET_USER,
  payload: data,
});

export const LoginUser = () => {
  return async (dispatch: ThunkDispatch<ActionCreator, void, Action>) => {
    try {
      const data = await Login();
      const datum = {
        accessToken: data.results.token,
        companyId: data.results.company_id,
      };

      sessionStorage.setItem("companyId", data.results.company_id);
      sessionStorage.setItem("accessToken", data.results.token);

      dispatch(getUserId(datum.companyId, datum.accessToken));
      dispatch(GetTasks(datum.companyId, datum.accessToken));
      dispatch(UpdateState(datum));
    } catch (error) {}
  };
};
