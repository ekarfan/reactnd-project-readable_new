import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import CategoryPage from "./CategoryList";
import {
  retrieveFromCategory,  sortPostsBy, changeModalVisibility
} from "../../actions/PostAction";

import {
  postsSelector
} from "../../selectors/selector";

import NotFound from '../NotFound';


class CategoryPageContainer extends Component {
  getCategory() {
    return this.props.match.params.category;
  }

  componentDidMount() {
    this.retrieveData(this.getCategory());
  }

  
  componentWillReceiveProps(nextProps) {
    if (this.getCategory() !== nextProps.match.params.category) {
      this.retrieveData(nextProps.match.params.category);
    }
  }

  retrieveData(path) {
    this.props.retrieveFromCategory(path);
  }

  /*
   * Form will call function below with 'voteScore/asc',
   * but reducer expects ('voteScore', 'asc')
   */
  handleSortByForm = (value) => {
    this.props.sortPostsBy(...value.split('/'))
  };

  render() {
    const path = this.getCategory();
    if (path) {
    return (
      this.props.posts ?
        <CategoryPage
          name={path}
          posts={this.props.posts}
          sortedBy={this.props.sortedBy}
          handleSortBy={this.handleSortByForm}
          handleModalVisibility={this.props.handleModalVisibility}
        />
        : null
    );}
    else return (<NotFound/>); 
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    retrieveFromCategory,
    sortPostsBy,
    handleModalVisibility: changeModalVisibility
  }, dispatch)
};

const mapStateToProps = (state) => ({
  posts: postsSelector(state.posts),
  sortedBy: state.posts.sortBy
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer)
);
