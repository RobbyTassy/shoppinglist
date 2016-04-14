var React = require('react');
var ReactDOM = require('react-dom');
var CSSTransitionGroup = require('react-addons-css-transition-group');// React CSS // $ npm install react-addons-css-transition-group --save-dev


// Loading in React Router
var ReactRouter = require('react-router'); // $ npm install react-router --save-dev
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;     // allows for pushState to happen on the URL. Refer to line 86
import { browserHistory } from 'react-router'
var h = require('./helpers.js');  // calls another file in your applications folder

 // Firebase
 var Rebase = require('re-base'); // $ npm install re-base --save-dev
 var base = Rebase.createClass('https://its-catch-of-the-day.firebaseio.com/');

 // React Catalyst
 // Allows for use of bi-directional data flow, useful for inventory management or updating in two places at one time
 // You can take something in your state and link it up with your input. When that input changes, it also changes your state
 // Does all the listeners like keyUp and Change and don't need to Bind just call linkState on it
 // Only problem with this, only works at top level - only data inside of the initial state can be called (but you can reach lower levels by coding it yourself)
 var Catalyst = require('react-catalyst');  // $ npm install react-catalyst --save-dev



//Import Components
// Require is the 'node.js' way of doing imports.
// This is the JS ES6 way of doing imports
import Fish from './components/Fish';
import Header from './components/Header';
import Inventory from './components/Inventory';
import NotFound from './components/NotFound';
import Order from './components/Order';
import StorePicker from './components/StorePicker';




// What makes react, along with Ember and Angularjs so unique is the concept of states.
// State is a represenation of all of your components data. A big oject that holds all the info relating
// to your component. The data in your component you wish to manipulate the most typically are states.
// state is your master copy of all of your data. In React, you don't save data in your DOM (like jQuery),
// all data is stored in the HTML. When updating, we change our STATE and React changes our HTML accordingly.
// wherever STATE is referenced in your JSX, its populated accordingly everywhere.
// one big visualization of all your data

// App

var App = React.createClass ({
  // Going to take LinkedStateMixin and make it available anywhere inside of App
  mixins : [Catalyst.LinkedStateMixin],
  getInitialState : function() { // Part of React Life cycle. Generally a blank state, and where you start off with.
    // before it creates component, it will run getInitialState and populate itself with preset data. Before component mounts
    return {  // Return initial state, which is an object
      fishes : {}, // Blank initial object. To be populated once we begin clicking buttons. Data later becomes pushed into here
      order : {}  // Blank initial object. To be populated once we begin clicking buttons. Data later becomes pushed into here
    }
  },

  componentDidMount : function() { // When component is put onto page and grabs everything from firebase to syncState. Occurs after rendering
    base.syncState(this.props.params.storeId + '/fishes', { // Takes current states and syncs it with Firebase
      context : this,
      state : 'fishes'
    });

    var localStorageRef = localStorage.getItem(this.props.params.storeId);
    if(localStorageRef) {
      // update our component state to reflect what is in localStorage
      this.setState({
        order : JSON.parse(localStorageRef)
      });
    }
  },

  // Anytime props changes (like number of fishes changes or order) or anytime state changes (like what is in our order and in our fishes)
  // then it will run and pass us new props and new states. An event listener for when th data is changed

  componentWillUpdate : function(nextProps, nextState) {
    localStorage.setItem(this.props.params.storeId, JSON.stringify(nextState.order));

  },

  addToOrder : function(key) {
    // updates state object for order without using IF statements. If an order fish exists, add one to it. If not, make its value one
    this.state.order[key] = this.state.order[key] + 1 || 1;
    // set states updates HTML
    this.setState({ order : this.state.order });
  },

  removeFromOrder : function(key) {
    // deletes state entirely
    delete this.state.order[key];
    // remember: afer each this.setState, you must tell Reach what just change (order) and to what (this.state.order)
    this.setState({
      order : this.state.order
    })
  },

  addFish : function(fish) {
    var timestamp = (new Date()).getTime(); // Used for unique key purposes, returns
    // how many milliseconds since 1/1/1970 - always typically unique

    // UPDATE STATE OBJECT:
    // this.state refers to the entire object inside of getInitialState. In our case, fishes : {}
    // we are assigning timestamp to each fish state created by putting it in [brackets]
    // this line of codes merely UPDATES the object, it does not render
    this.state.fishes[ 'ID ' + timestamp ] = fish;

    // SET STATE OBJECT:
    // this.setState changes the object, then TELL IT what changed inside of ({ here }) and what it changed to
    // here you must set state and explcitly pass it as well (kinda weird, redundant, i know)
    // this is done like this so your DOM knows which is the original state and which is the HTML to be changed.
    // so for perfomance optimization purposes, and so state does not become confused as to which state is the original
    this.setState({ fishes : this.state.fishes });
  },

  removeFish : function(key) {
    if(confirm("Are you sure you want to remove this fish?")) {
      this.state.fishes[key] = null;
      // this actually triggers re-render
      this.setState({
        fishes : this.state.fishes
      });
    }
  },

  loadSamples : function() {
    // This will go into sample-fishes, grab the entire fish object, and set their state
    this.setState({
      fishes : require('./sample-fishes')
    });
  },

  renderFish : function(key) {
    // when you render out an element in React, you should give it a unique key to track changes to each particular element
    // this.state.fishes[key] will give us fish1, fish2, fish3
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}></Fish>
  },

  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        {/* props sorta work like HTML attributes in that pass data into other elements/components */}
          <Header tagline="Fresh Seafood Market"></Header>
          <ul className="list-of-fishes">
          {/*
            Object.keys will give us an array of all the keys in an object (like fish1, fish2, fish3)
            this can be tested on console using Object.key($r.state.fishes).
            map will take data in an array and return a new array
            this will run once for every single fish in our state
             */}
          {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}></Order>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState} removeFish={this.removeFish}></Inventory>
      </div>
    )
  }
});



// Routes

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker}></Route>
    <Route path="/store/:storeId" component={App}></Route>
    <Route path="*" component={NotFound}></Route>
  </Router>
)



ReactDOM.render(routes, document.querySelector('#main'))
