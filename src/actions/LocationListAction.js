import axios from "axios";
import locationList from "../data/cityList.json";
//HC imports
import {
  createPlatformURL,
  handleSecureAjaxError
} from "../util/SecurePlatformAPIUtils";

/** Action Types */
export const GET_LOCATION_LIST = "get-location-list";

/**
 * Load Service List
 */
export const loadLocationList = callback => {
  const url = createPlatformURL("config/location");
  return dispatch => {
    //dispatch(startLoading());
    axios
      .get(url)
      .then(res => {
        callback && callback();
        dispatch(getLocationList(res.data));
      })
      .catch(error => {
        console.log("Hello world from failure");
        handleSecureAjaxError(error, "ServiceActions loadService");
        dispatch(getLocationList(locationList));
        callback && callback();
        //dispatch(stopLoading());
      });
  };
};

export const getLocationList = locationList => {
  return {
    type: GET_LOCATION_LIST,
    payload: locationList
  };
};
