import {combineReducers} from 'redux';
import categories from './categoriesReducer';
import comments from './commentsReducer';
import posts from './postsReducer';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer} from 'react-redux-toastr'


const rootReducer = combineReducers({
  categories,
  comments,
  posts,
  router: routerReducer,
  toastr: toastrReducer,
  form: formReducer
});

export default rootReducer;
