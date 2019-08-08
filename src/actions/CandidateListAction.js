import axios from "axios";
import candidatelist from "../data/candidatelist.json";
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
export const GET_CANDIDATE_LIST = "get-candidate-list";
export const GET_SAVED_CANDIDATE = "get-saved-candidate";
/**
 * Load Service List
 */
export const loadCandidateList = callback => {
  const url = createPlatformURL("candidate");
  return dispatch => {
    //dispatch(startLoading());
    axios
      .get(url)
      .then(res => {
        console.log("HC Sucess");
        callback && callback();
        //dispatch(getServiceList(res.data));
        dispatch(getCandidateList(res.data.candidates));
      })
      .catch(error => {
        console.log("HC Fail");

        handleSecureAjaxError(error, "ServiceActions loadService");
        dispatch(getCandidateList(candidatelist));
        callback && callback();
        //dispatch(stopLoading());
      });
  };
};

export const createCandidate = (data,callback) => {
  const url = createPlatformURL("candidate");
  //const url = "https://3rf80nfa20.execute-api.ap-south-1.amazonaws.com/dev/candidate";
  return dispatch => {
    axios.post(url,data)
    .then(res => {
      console.log(res);
      console.log(res.data);
      callback && callback();
      dispatch(candidateSave(res.data));
    })
      .catch(error => {
        console.log("HC Fail");
        callback && callback();
        dispatch(candidateSave(data));
        //dispatch(stopLoading())
      })
      .finally(function () {
        // always executed
        callback && callback();
        //dispatch(candidateSave(data));
      });
       };
};

export const getCandidateList = candidatelist => {
  return {
    type: GET_CANDIDATE_LIST,
    payload: candidatelist
  };
};

export const candidateSave = candidate => {
  return {
    type: GET_SAVED_CANDIDATE,
    payload: candidate
  };
};