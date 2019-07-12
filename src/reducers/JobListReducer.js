import { GET_JOB_LIST } from "../actions/JobListAction";

//import { START_LOADING, STOP_LOADING } from "../actions/LoadingActions";

export const CATAGORY_INITIAL_STATE = {
  loading: false,
  jobList: []
};

export default (state = CATAGORY_INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_JOB_LIST:
      return {
        ...state,
        jobList: action.payload
      };

    default:
      return state;
  }
};
