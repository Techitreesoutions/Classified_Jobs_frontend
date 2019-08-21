import axios from "axios";
import skillList from "../data/skills.json";
//HC imports
import {
  createPlatformURL,
  handleSecureAjaxError
} from "../util/SecurePlatformAPIUtils";

/** Action Types */
export const GET_SKILL_LIST = "get-skill-list";

/**
 * Load Service List
 */
export const loadSkillList = callback => {
  const url = createPlatformURL("config/skills");
  return dispatch => {
    //dispatch(startLoading());
    axios
      .get(url)
      .then(res => {
        callback && callback();
        //dispatch(getServiceList(res.data));
        dispatch(getSkillList(res.data));
      })
      .catch(error => {
        console.log("Hello world from failure");
        handleSecureAjaxError(error, "ServiceActions loadService");
        dispatch(getSkillList(skillList));
        callback && callback();
        //dispatch(stopLoading());
      });
  };
};

export const getSkillList = skillList => {
  return {
    type: GET_SKILL_LIST,
    payload: skillList
  };
};
