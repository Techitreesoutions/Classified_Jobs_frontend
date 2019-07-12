/** Action Types */
export const UPDATE_FILTER = "add-to-filter";

export const updateFilter = filterObj => {
  return (dispatch, getState) => {
    console.log("updateFilter", filterObj);
    dispatch(updateFilterObject(filterObj));
  };
};

/**
 * update Filter
 */
export const updateFilterObject = filterObj => {
  return {
    type: UPDATE_FILTER,
    payload: filterObj
  };
};
