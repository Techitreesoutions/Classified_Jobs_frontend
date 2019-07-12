import axios from "axios";
import joblist from "../data/joblist.json";
//HC imports
import {
  createPlatformURL,
  handleSecureAjaxError,
  createMutationHeaders
} from "../util/SecurePlatformAPIUtils";
//import { startLoading, stopLoading } from "./LoadingActions";

/** Action Types */
export const GET_JOB_LIST = "get-job-list";

/**
 * Load Service List
 */
export const loadJobList = callback => {
  const url = createPlatformURL("joblist");
  return dispatch => {
    //dispatch(startLoading());
    axios
      .get(url)
      .then(res => {
        console.log("HC Sucess");
        callback && callback();

        //dispatch(getServiceList(res.data));
        dispatch(getJobList(joblist));
      })
      .catch(error => {
        console.log("HC Fail");

        handleSecureAjaxError(error, "ServiceActions loadService");
        dispatch(getJobList(joblist));
        callback && callback();
        //dispatch(stopLoading());
      });
  };
};

export const getJobList = joblist => {
  return {
    type: GET_JOB_LIST,
    payload: joblist
  };
};
