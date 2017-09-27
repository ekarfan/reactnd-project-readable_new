import * as types from './ActionType';
import * as API from "../utils/api";
import { toastr } from 'react-redux-toastr'
import uuid from 'uuid/v4';

export const SORT_BY_OPTIONS = [
  { key: 'timestamp/desc', text: 'Created at (desc)', value: 'timestamp/desc' },
  { key: 'timestamp/asc', text: 'Created at (asc)', value: 'timestamp/asc' },
  { key: 'voteScore/desc', text: 'Vote Score (desc)', value: 'voteScore/desc' },
  { key: 'voteScore/asc', text: 'Vote Score (asc)', value: 'voteScore/asc' }
];

export function retrieveComments(postId) {
  return (dispatch) => {
    API.getCommentsFromPost(postId)
      .then(comments => dispatch({ type: types.RETRIEVE_COMMENTS, comments }));
  };
}

export function handleCommentForm() {
  return (dispatch, getState) => {
    const form = getState().form;
    let values = form.comment.values;

    if (values.id) {
      // Editing existing comment
      const comment = {...values, timestamp: Date.now()};

      API.updateComment(comment)
        .then((comment) => {
          dispatch({ type: types.ADD_COMMENTS, comment });
          toastr.success('Success', 'Comment updated successfully.');
        });
    } else {
      // Creating a new comment
      const comment = {
        id: uuid(),
        timestamp: Date.now(),
        parentId: values.postId,
        author: values.author,
        body: values.body
      };

      API.addComment(comment)
        .then((comment) => {
          dispatch({ type: types.ADD_COMMENTS, comment });
          toastr.success('Success', 'Comment posted successfully.');
        });
    }
  }
}

export function voteComment(commentId, option) {
  return (dispatch) => {
    API.voteComment(commentId, option)
      .then((comment) => {
        dispatch({ type: types.VOTE_COMMENTS, comment });
        toastr.success('Success', 'Vote posted successfully.');
      });
  };
}

export function deleteComment(commentId) {
  return (dispatch) => {
    API.deleteComment(commentId)
      .then(() => {
        dispatch({ type: types.DELETE_COMMENTS, commentId });
        toastr.success('Success', 'Comment deleted successfully.');
      });
  };
}

export function startEditingComment(commentId) {
  return (dispatch) => {
    dispatch({ type: types.START_EDITING_COMMENTS, commentId });
    dispatch({ type: types.MODAL_VISIBILITY_COMMENTS, visibility: true });
  };
}

export function sortCommentsBy(key, order) {
  toastr.success('Success', 'Comments sorted successfully.');
  return { type: types.SORT_BY_COMMENTS, key, order };
}

// Editing is cleaned when modal is closed
export function changeModalVisibility(visibility) {
  return (dispatch) => {
    if (!visibility) dispatch({ type: types.STOP_EDITING_COMMENTS });
    dispatch({ type: types.MODAL_VISIBILITY_COMMENTS, visibility });
  };
}
