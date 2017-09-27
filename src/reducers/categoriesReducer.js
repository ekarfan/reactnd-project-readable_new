import * as types from '../actions/ActionType';

const categories = [];

function categoriesReducer(state = categories, action) {
  switch (action.type) {
    case types.LOAD_ALL_CATEGORY:
      return action.categories;
    default :
      return state;
  }
}

export default categoriesReducer;
