import axios from "axios";
import { BaseUrl } from "./baseConfig";
import { AccessTokenPayload, PostHeaders } from "./constants";

export const Login = async () => {
  try {
    const res = await axios({
      method: "post",
      headers: PostHeaders,
      url: `${BaseUrl}login`,
      data: AccessTokenPayload,
    });
    return res.data;
  } catch (e) {}
};

export const GetUserId = async (company_id: string, access_token: string) => {
  try {
    const res = await axios({
      method: "get",
      headers: { ...PostHeaders, authorization: `Bearer ${access_token}` },
      url: `${BaseUrl}user?company_id=${company_id}&product=outreach`,
      data: {},
    });
    return res.data;
  } catch (e) {}
};

export const GetAllTasks = async (company_id: string, access_token: string) => {
  try {
    const res = await axios({
      method: "get",
      headers: { ...PostHeaders, authorization: `Bearer ${access_token}` },
      url: `${BaseUrl}task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663`,
      data: {},
    });
    return res.data;
  } catch (e) {}
};

type CreateType = {
  assigned_user: string;
  task_date: string;
  task_time: number;
  is_completed: number;
  time_zone: number;
  task_msg: string;
};

export const CreateTask = async (
  company_id: string,
  access_token: string,
  data: CreateType
) => {
  try {
    const res = await axios({
      method: "post",
      headers: { ...PostHeaders, authorization: `Bearer ${access_token}` },
      url: `${BaseUrl}task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663`,
      data,
    });
    return res.data;
  } catch (error) {}
};

export const UpdateTask = async (
  company_id: string,
  access_token: string,
  data: CreateType,
  task_id: string | undefined
) => {
  try {
    const res = await axios({
      method: "put",
      headers: { ...PostHeaders, authorization: `Bearer ${access_token}` },
      url: `${BaseUrl}task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task_id}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`,
      data,
    });
    return res.data;
  } catch (error) {}
};

export const GetTask = async (
  company_id: string,
  access_token: string,
  task_id: string
) => {
  try {
    const res = await axios({
      method: "get",
      headers: { ...PostHeaders, authorization: `Bearer ${access_token}` },
      url: `${BaseUrl}task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task_id}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`,
      data: {},
    });
    return res.data;
  } catch (error) {}
};

export const DeleteTask = async (
  company_id: string,
  access_token: string,
  task_id: string | undefined
) => {
  try {
    const res = await axios({
      method: "delete",
      headers: { ...PostHeaders, authorization: `Bearer ${access_token}` },
      url: `${BaseUrl}task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task_id}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`,
      data: {},
    });
    return res.data;
  } catch (error) {}
};
