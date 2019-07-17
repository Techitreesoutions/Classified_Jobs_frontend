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

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   debugger;
//   //const token = store.getState().session.token;
//   config.headers = {'x-key-api':'k1ehKBylc3khYkBIw93D8fnN01Z10Mq4m9lbkUx0'} ;

//   return config;
// });

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
