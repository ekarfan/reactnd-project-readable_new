import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux";

import CategoryList from "./CategoryList";
import CategoryPageContainer from "./category/CategoryPage";
import PostPageContainer from "./post/PostPage";
import NotFound from './NotFound';

class Routes extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history} >
        <CategoryList>
          <Switch>
            <Route exact path='/' component={CategoryPageContainer} />
            <Route exact path='/:category' component={CategoryPageContainer} />
            <Route exact path='/:category/:postId' component={PostPageContainer} />
            <Route exact path='/*' component={NotFound} />
 
          </Switch>
        </CategoryList>
      </ConnectedRouter>
    );
  }
}

export default Routes;
