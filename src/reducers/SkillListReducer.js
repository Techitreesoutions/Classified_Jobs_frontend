import { GET_SKILL_LIST } from "../actions/SkillListAction";

//import { START_LOADING, STOP_LOADING } from "../actions/LoadingActions";

export const CATAGORY_INITIAL_STATE = {
  loading: false,
  skillList: []
};

export default (state = CATAGORY_INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SKILL_LIST:
      return {
        ...state,
        skillList: action.payload
      };

    default:
      return state;
  }
};
