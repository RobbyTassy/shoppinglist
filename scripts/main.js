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

// What makes react, along with Ember and Angularjs so unique is the concept of states.
// WHAT IS STATE?
// State is a represenation of all of your components data. A big oject that holds all the info relating
// to your component. The data in your component you wish to manipulate the most typically are states.
// state is your master copy of all of your data. In React, you don't save data in your DOM (like jQuery),
// all data is stored in the HTML. When updating, we change our STATE and React changes our HTML accordingly.
// wherever STATE is referenced in your JSX, its populated accordingly everywhere.
// one big visualization of all your data

// App

var App = React.createClass ({
  getInitialState : function() { // Part of React Life cycle. Generally a blank state, and where you start off with.
    // before it creates component, it will run getInitialState and populate itself with preset data.
    return {  // Return initial state, which is an object
      fishes : {}, // Blank initial object. To be populated once we begin clicking buttons. Data later becomes pushed into here
      order : {}  // Blank initial object. To be populated once we begin clicking buttons. Data later becomes pushed into here
    }
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

  loadSamples : function() {
    // This will go into sample-fishes, grab the entire fish object, and set their state
    this.setState({
      fishes : require('./sample-fishes')
    });
  },

  renderFish : function(key) {
    // when you render out an element in React, you should give it a unique key to track changes to each particular element
    // this.state.fishes[key] will give us fish1, fish2, fish3
    return <Fish key={key} index={key} details={this.state.fishes[key]}></Fish>
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
        <Order></Order>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}></Inventory>
      </div>
    )
  }
});

// Fish
var Fish = React.createClass({
  render : function() {
    return (
      <li className="menu-fish">
       <img src={this.props.details.image} alt={this.props.details.name}></img>
       <h3 className="fish-name">{this.props.details.name}
        <span className="price">{h.formatPrice(this.props.details.price)}</span>
       </h3>
       <p>{this.props.details.desc}</p>
      </li>
    )
  }
});

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
    // this passes the addFish method down from the parent component (App) to the appropriate child component (AddFishForm)
    // to be used inside of the createFish method
    this.props.addFish(fish);
    // this simply resets the fishForm by referencing its HTML attribute
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
      {/* {...this.props} Takes all props (methods) from current component and passes them down to the selected childs component (AddFishForm) known as a SPREAD */}
      <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      {/*props makes a method transferrable to child components*/}
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
