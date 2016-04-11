var React = require('react');
var ReactDOM = require('react-dom');

// Loading in React Router
var ReactRouter = require('react-router');
// ^ npm install react-router --save-dev
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;     // allows for pushState to happen on the URL. Refer to line 86
import { browserHistory } from 'react-router'


var h = require('./helpers.js');  // Calls another file in your applications folder


// App

var App = React.createClass ({
  getInitialState : function() { // Part of React Life cycle. Generally a blank state, and where you start off with.
    // before it creates component, it will run getInitialState and populate itself with preset data.
    return {  // Return initial state, which is an object
      fishes : {}, // Blank initial object. To be populated once we begin clicking buttons.
      order : {}  // Blank initial object. To be populated once we begin clicking buttons.
    }
  },

  addFish : function(fish) {
    var timestamp = (new Date()).getTime(); // Used for unique key purposes, returns
    // how many milliseconds since 1/1/1970 - always typically unique

    // UPDATE STATE OBJECT:
    this.state.fishes['fish-' + timestamp] = fish;
    // SET STATE OBJECT:
    this.setState({ fishes : this.state.fishes });
  },

  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        {/* props sorta work like HTML attributes in that pass data into other elements/components */}
          <Header tagline="Fresh Seafood Market"></Header>
        </div>
        <Order></Order>
        <Inventory addFish={this.addFish}></Inventory>
      </div>
    )
  }
})


// Add Fish Form

var AddFishForm = React.createClass ({
  createFish : function(event) {
    // 1. STOP FORM FROM SUBMITTING
    event.preventDefault();
    // 2. TAKE THE DATA FROM THE FORM AND CREATE OBJECT
    var fish = {
      name : this.refs.name.value,
      price : this.refs.price.value,
      status : this.refs.status.value,
      desc : this.refs.desc.value,
      image : this.refs.image.value
    }

    // 3. ADD THE FISH TO THE APP STATE
    this.props.addFish(fish);
    this.refs.fishForm.reset();

  },
  render : function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"></input>
        <input type="text" ref="price" placeholder="Fish Price"></input>
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image"></input>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }

})



// Header

var Header = React.createClass ({
  render : function() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
        Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
})

// Order

var Order = React.createClass ({
  render : function() {
    return (
      <p>Order</p>
    )
  }
})

// Inventory

var Inventory = React.createClass ({
  render : function() {
    return (
      <div>
      <h2>Inventory</h2>
      <AddFishForm {...this.props}></AddFishForm>
      {/* {...this.props} Takes all props (methods) from current component and passes them down to childs component (AddFishForm) */}
      </div>
    )
  }
})


/*
StorePicker
This will make <StorePicker> element where I can put where I want.
*/

var StorePicker = React.createClass({
  goToStore : function(event) {
    event.preventDefault();
    // get data from the input
    var storeId = this.refs.storeId.value;
    browserHistory.push( '/store/' + storeId);  // performs a push state on the URL
    // transition from StorePicker to App


  },
  render : function() {
    return (
    <form className="store-selector" onSubmit={this.goToStore}>
      <h2>Please enter a store</h2>
      <input type="text" ref="storeId" defaultValue={h.getFunName()} required></input>
      <input type="submit"></input>

    </form>
    )
  }
});

// Not found

var NotFound = React.createClass ({
  render : function() {
    return <h1>Not Found!</h1>
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
