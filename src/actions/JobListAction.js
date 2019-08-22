import axios from "axios";
import joblist from "../data/joblist.json";
//HC imports
import {
  createPlatformURL,
  handleSecureAjaxError,
  getAccessKeysFromStorage
} from "../util/SecurePlatformAPIUtils";
//import { startLoading, stopLoading } from "./LoadingActions";
axios.defaults.headers.common["x-api-key"] = getAccessKeysFromStorage();
/** Action Types */
export const GET_JOB_LIST = "get-job-list";
export const GET_SAVED_JOB = "get-saved-job";
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
        callback && callback();

        //dispatch(getServiceList(res.data));
        dispatch(getJobList(res.data.jobs));
      })
      .catch(error => {
        handleSecureAjaxError(error, "ServiceActions loadService");
        dispatch(getJobList(joblist));
        callback && callback();
        //dispatch(stopLoading());
      });
  };
};

export const createJob = (data, callback) => {
  const url = createPlatformURL("job");
  return dispatch => {
    axios
      .post(url, data)
      .then(res => {
        callback && callback();
        dispatch(jobSave(res.data));
      })
      .catch(error => {
        callback && callback();
        dispatch(jobSave(data));
        //dispatch(stopLoading())
      })
      .finally(function() {
        // always executed
        callback && callback();
      });
  };
};

export const getJobList = joblist => {
  return {
    type: GET_JOB_LIST,
    payload: joblist
  };
};

export const jobSave = newJob => {
  return {
    type: GET_SAVED_JOB,
    payload: newJob
  };
};
