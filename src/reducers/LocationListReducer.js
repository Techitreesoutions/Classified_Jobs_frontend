import { GET_LOCATION_LIST } from "../actions/LocationListAction";

//import { START_LOADING, STOP_LOADING } from "../actions/LoadingActions";

export const CATAGORY_INITIAL_STATE = {
  loading: false,
  locationList: []
};

export default (state = CATAGORY_INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOCATION_LIST:
      return {
        ...state,
        locationList: action.payload
      };

    default:
      return state;
  }
};
