import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { Item } from "semantic-ui-react";
import * as postActions from "../../actions/PostAction";

import PostPreview from "./PostsPreviewList";
import PostFormModal from "./PostFormModal";
import { withRouter } from "react-router-dom";
import { editingPostSelector } from "../../selectors/selector";


class PostsPreviewContainer extends Component {
  
  renderPosts() {
    return (
      <Item.Group divided relaxed>
        {this.props.posts.map(post => this.renderPost(post))}
      </Item.Group>
    );
  }

  renderPost(post) {
    const { id, title, body, author, category,
      timestamp, commentsCount, ...p } = post;

    return (
      <PostPreview
        key={id} id={id} title={title} body={body}
        author={author} score={p.voteScore} category={category}
        count={commentsCount}
        timestamp={timestamp}
        path={`${category}/${id}`}
        showBody={this.props.showBody}
        handleVote={this.props.handlePostVote}
        handleDelete={this.props.handleDelete}
        handleStartEditing={this.props.handleStartEditing}
      />
    );
  }

  render() {
    if (!this.props.isModalOpen && !this.props.posts.length)
      return null;

    return (
      <div>
        {this.renderPosts()}

        <PostFormModal
          show={this.props.isModalOpen}
          post={this.props.editingPost}
          handleForm={this.props.handleForm}
          handleModalVisibility={this.props.handleModalVisibility}
          categories={this.props.categories}
          category={this.props.category}
        />
      </div>
    )
  }
}

PostsPreviewContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  showBody: PropTypes.bool.isRequired
};

PostsPreviewContainer.defaultProps = {
  showBody: false
};

//const mapDispatchToProps = (dispatch) => {
//  return bindActionCreators({
//    handlePostVote: postActions.votePost,
//    handleModalVisibility: postActions.changeModalVisibility,
//    handleForm: postActions.handlePostForm,
//    handleDelete: postActions.deletePost,
//    handleStartEditing: postActions.startEditingPost
//  }, dispatch)
//};

function mapStateToProps(state, ownProps) {
  return {
    isModalOpen: state.posts.isModalOpen,
    editingPost: editingPostSelector(state.posts),
    categories: state.categories,
    category: ownProps.match.params.category
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handlePostVote: postActions.votePost,
    handleModalVisibility: postActions.changeModalVisibility,
    handleForm: postActions.handlePostForm,
    handleDelete: postActions.deletePost,
    handleStartEditing: postActions.startEditingPost
  }, dispatch)
}

//const mapStateToProps = (state, ownProps) => ({
//  isModalOpen: state.posts.isModalOpen,
//  editingPost: editingPostSelector(state.posts),
//   categories: state.categories
//});

//export default connect(mapStateToProps, mapDispatchToProps)(PostsPreviewContainer);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostsPreviewContainer)
);
