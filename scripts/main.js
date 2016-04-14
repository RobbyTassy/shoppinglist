import React from 'react';
import ReactDOM from 'react-dom';

// React Router
//  browserHistory allows for pushState to happen on the URL.
import { browserHistory, ReactRouter, Router, Route } from 'react-router'; // $ npm install react-router --save-dev


//Import Components
// 'Require' is the 'node.js' way of doing imports.
// 'Import' is the JS ES6 way of doing imports

import App from './components/App';
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';


// What makes react, along with Ember and Angularjs so unique is the concept of states.
// State is a represenation of all of your components data. A big oject that holds all the info relating
// to your component. The data in your component you wish to manipulate the most typically are states.
// state is your master copy of all of your data. In React, you don't save data in your DOM (like jQuery),
// all data is stored in the HTML. When updating, we change our STATE and React changes our HTML accordingly.
// wherever STATE is referenced in your JSX, its populated accordingly everywhere.
// one big visualization of all your data


// Routes

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker}></Route>
    <Route path="/store/:storeId" component={App}></Route>
    <Route path="*" component={NotFound}></Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'))
