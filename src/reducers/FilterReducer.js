import { UPDATE_FILTER } from "../actions/FilterAction";

//import { START_LOADING, STOP_LOADING } from "../actions/LoadingActions";

export const FILTER_INITIAL_STATE = {
  loading: false,
  filterObj: {
    searchTerm: "",
    location: ""
  }
};

export default (state = FILTER_INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        filterObj: Object.assign({}, state.filterObj, action.payload)
      };
    default:
      return state;
  }
};
