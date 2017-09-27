import React from 'react';
import { Provider } from 'react-redux';
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import configureStore from '../store/configureStore';
import Routes from './routes';

import './App.css'

// Set up redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Set up react-router-redux
const history = createHistory();
const middleware = routerMiddleware(history);
//const middleware = routerMiddleware(browserHistory)


const enhancers = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(middleware)
);

const store = configureStore(enhancers);


const App = () => {
  return (
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  );
};

export default App;
