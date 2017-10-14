import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";
import { getAllCategories } from "../actions/CategoryAction";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { Container, Menu, Icon, Header } from 'semantic-ui-react'
import ReduxToastr from 'react-redux-toastr'

class CategoryList extends Component {
  componentDidMount() {
    this.props.getAllCategories();
  }
  
  renderCategoryIcon(category) {
    return (
      <Menu.Item as={NavLink} to={`/${category.path}`} name={category.path} key={category.path}>
      {category.name}
      </Menu.Item>
    )
  }

  render() {

   
    return (
      <div className="App">
        <Header as={Menu} animation='uncover'  visible icon='labeled'  inverted className="App-Header">
        
           <Menu.Item as={NavLink} to='/' name='home' exact>
            <Icon name='home' />
            Home
          </Menu.Item>

          {this.props.categories.map(category => (
            this.renderCategoryIcon(category)
          ))}

          
         </Header>

        <Container className="App-Content" basic>
          <Container>
            <Header as ="h2"> Readable: a content and comment web app</Header>
            
          </Container>
          {this.props.children}
        </Container>

        <ReduxToastr
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar 
        />
      </div>
    ) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllCategories }, dispatch)
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList));
