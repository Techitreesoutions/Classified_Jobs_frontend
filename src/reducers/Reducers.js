import { combineReducers } from "redux";
import JobListReducer from "./JobListReducer";
import CandidateListReducer from "./CandidateListReducer";
import FilterReducer from "./FilterReducer";
import { reducer as formReducer } from "redux-form";

export const reducers = combineReducers({
  jobList: JobListReducer,
  candidateList: CandidateListReducer,
  filterObj: FilterReducer,

  form: formReducer
});
