import * as types from './ActionType';
import * as API from "../utils/api";
import { toastr } from 'react-redux-toastr'
import uuid from 'uuid/v4';

export const SORT_BY_OPTIONS = [
  { key: 'timestamp/desc', text: 'Created at (desc)', value: 'timestamp/desc' },
  { key: 'timestamp/asc', text: 'Created at (asc)', value: 'timestamp/asc' },
  { key: 'voteScore/desc', text: 'Vote Score (desc)', value: 'voteScore/desc' },
  { key: 'voteScore/asc', text: 'Vote Score (asc)', value: 'voteScore/asc' },
  { key: 'title/desc', text: 'Title (desc)', value: 'title/desc' },
  { key: 'title/asc', text: 'Title (asc)' , value: 'title/asc' }
];


export function retrieveFromCategory(categoryPath) {
  return (dispatch) => {
    API.getPostsFromCategory(categoryPath)
      .then((posts) => {
        dispatch({ type: types.RETRIEVE_FROM_CATEGORY, posts });

        posts.map(post => dispatch(retrievePostCommentsCount(post.id)));
      });
  };
}

export function retrievePost(postId) {
  return (dispatch) => {
    API.getPost(postId)
      .then(post => dispatch({ type: types.RETRIEVE, postId, post }));
  };
}

export function retrievePostCommentsCount(postId) {
  return (dispatch) => {
    API.getCommentsFromPost(postId)
      .then(comments => dispatch({
        type: types.RETRIEVE_COMMENTS_COUNT, postId,
        commentsCount: comments.length
      }));
  };
}

export function handlePostForm() {
  return (dispatch, getState) => {
    const form = getState().form;
    let values = form.post.values;

    if (values.id) {
      // Editing existing comment
      const post = {...values, timestamp: Date.now()};

      API.updatePost(post)
        .then((post) => {
          dispatch({ type: types.ADD, post });
          toastr.success('Success', 'Post updated successfully.');
        });
    } else {
      // Creating a new comment
      const post = {
        id: uuid(),
        timestamp: Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category
      };

      API.addPost(post)
        .then((post) => {
          dispatch({ type: types.ADD, post });
          toastr.success('Success', 'Post posted successfully.');
        });
    }
  }
}

export function startEditingPost(postId) {
  return (dispatch) => {
    dispatch({ type: types.START_EDITING, postId });
    dispatch({ type: types.MODAL_VISIBILITY, visibility: true });
  };
}

export function sortPostsBy(key, order) {
  return { type: types.SORT_BY, key, order };
}

export function votePost(postId, option) {
  return (dispatch) => {
    API.votePost(postId, option)
      .then((post) => {
        dispatch({ type: types.VOTE, post });
        toastr.success('Success', 'Vote posted successfully.');
      });
  };
}

// Editing is cleaned when modal is closed
export function changeModalVisibility(visibility) {
  return (dispatch) => {
    if (!visibility) dispatch({ type: types.STOP_EDITING });
    dispatch({ type: types.MODAL_VISIBILITY, visibility });
  };
}

export function deletePost(postId, category) {
  return (dispatch) => {
    API.deletePost(postId)
      .then(() => {
        dispatch({ type: types.DELETE, postId });
        toastr.success('Success', 'Post deleted successfully.');
      });
  };
}
