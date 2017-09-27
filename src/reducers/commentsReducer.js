import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';

import * as types from '../actions/ActionType';


/*
 * Selectors
 */

export function commentsSelector(state) {
  const notDeleted = Object.values(state.byId).filter((comment) => !comment.deleted);
  return orderBy(notDeleted, state.sortBy.key, state.sortBy.order);
}

export function editingCommentSelector(state) {
  return state.byId[state.editingCommentId]
}




const INITIAL_STATE = {
  byId: {},
  sortBy: { key: 'voteScore', order: 'desc' } ,
  isModalOpen: false,
  editingCommentId: null
};

function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.RETRIEVE_COMMENTS: {
      const commentsById = action.comments
      .reduce((comments, comment) => (Object.assign(comments, {[comment.id]: comment})), {});
       return {
        ...state,
        byId: commentsById
      };
    }
    case types.VOTE_COMMENTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      };
    case types.ADD_COMMENTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment
        }
      };
    case types.DELETE_COMMENTS:
      return {
        ...state,
        byId: omit(state.byId, action.commentId)
      };
    case types.SORT_BY_COMMENTS:
      return {
        ...state,
        sortBy: { key: action.key, order: action.order }
      };
    case types.START_EDITING_COMMENTS:
      return Object.assign({}, state, { editingCommentId: action.commentId });
    case types.STOP_EDITING_COMMENTS:
      return Object.assign({}, state, { editingCommentId: null });
    case types.MODAL_VISIBILITY_COMMENTS:
      return Object.assign({}, state, { isModalOpen: action.visibility });
    default:
      return state;
  }
}

export default commentsReducer;
