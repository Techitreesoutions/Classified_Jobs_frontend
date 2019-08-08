import { GET_CANDIDATE_LIST,GET_SAVED_CANDIDATE } from "../actions/CandidateListAction";

//import { START_LOADING, STOP_LOADING } from "../actions/LoadingActions";

export const CATAGORY_INITIAL_STATE = {
  loading: false,
  candidateList: []
};

export default (state = CATAGORY_INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CANDIDATE_LIST:
      return {
        ...state,
        candidateList: action.payload
      };
      case GET_SAVED_CANDIDATE:
      return {
        ...state,
        candidateList: state.candidateList.concat(action.payload)
      };
    default:
      return state;
  }
};
