import React from 'react';
import ReactDOM from 'react-dom';

// React Router - $ npm install react-router --save-dev
// browserHistory allows for pushState to happen on the URL.
// import { } called ES6 destructuring
import { browserHistory, ReactRouter, Router, Route } from 'react-router';



//Import Components
// 'Require' is the 'node.js' way of doing imports.
// 'Import' is the JS ES6 way of doing imports
import App from './components/App';
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';


// Routes
var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker}></Route>
    <Route path="/store/:storeId" component={App}></Route>
    <Route path="*" component={NotFound}></Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'))
