import axios from "axios";
import candidatelist from "../data/candidatelist.json";
//HC imports
import {
  createPlatformURL,
  handleSecureAjaxError,
  createMutationHeaders
} from "../util/SecurePlatformAPIUtils";
//import { startLoading, stopLoading } from "./LoadingActions";

/** Action Types */
export const GET_CANDIDATE_LIST = "get-candidate-list";

/**
 * Load Service List
 */
export const loadCandidateList = callback => {
  const url = createPlatformURL("candidatelist");
  return dispatch => {
    //dispatch(startLoading());
    axios
      .get(url)
      .then(res => {
        console.log("HC Sucess");
        callback && callback();

        //dispatch(getServiceList(res.data));
        dispatch(getCandidateList(candidatelist));
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

export const getCandidateList = candidatelist => {
  return {
    type: GET_CANDIDATE_LIST,
    payload: candidatelist
  };
};
