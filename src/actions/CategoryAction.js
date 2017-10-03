
import * as types from './ActionType';
import * as API from "../utils/api";

export function getAllCategories() {
  return (dispatch) => {
    API.getCategories()
      .then(categories => dispatch({ type: types.LOAD_ALL_CATEGORY, categories }));
  };
}


