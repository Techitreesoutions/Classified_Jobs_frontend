import axios from "axios";
import joblist from "../data/joblist.json";
//HC imports
import {
  createPlatformURL,
  handleSecureAjaxError,
  createMutationHeaders,
  getAccessKeysFromStorage
} from "../util/SecurePlatformAPIUtils";
//import { startLoading, stopLoading } from "./LoadingActions";
axios.defaults.headers.common['x-api-key'] = getAccessKeysFromStorage();
/** Action Types */
export const GET_JOB_LIST = "get-job-list";

/**
 * Load Service List
 */
export const loadJobList = callback => {
  const url = createPlatformURL("job");
  return dispatch => {
    //dispatch(startLoading());
    axios
      .get(url)
      .then(res => {
        console.log("HC Sucess");
        callback && callback();

        //dispatch(getServiceList(res.data));
        dispatch(getJobList(res.data.jobs));
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
