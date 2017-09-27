import orderBy from 'lodash/orderBy';


export const commentsSelector = state => {
  const notDeleted = Object.values(state.byId).filter((comment) => !comment.deleted);
  return orderBy(notDeleted, state.sortBy.key, state.sortBy.order);
}

export const editingCommentSelector = state => {
  return state.byId[state.editingCommentId]
}

export const postsSelector = state => {
  const notDeleted = Object.values(state.byId).filter((post) => !post.deleted);
  return orderBy(notDeleted, state.sortBy.key, state.sortBy.order);
}

export const postSelector = (state, postId) => {
  return state.byId[postId];
}

export const editingPostSelector = state => {
  return state.byId[state.editingPostId]
}
