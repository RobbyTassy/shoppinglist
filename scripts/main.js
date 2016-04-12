var React = require('react');
var ReactDOM = require('react-dom');

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
        <Order fishes={this.state.fishes} order={this.state.order}></Order>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState} removeFish={this.removeFish}></Inventory>
      </div>
    )
  }
});

// Fish
var Fish = React.createClass({
  onButtonClick : function() {
    this.props.addToOrder(this.props.index);

  },
  render : function() {
    var isAvailable = (this.props.details.status == 'available' ? true : false);
    var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
    return (
      <li className="menu-fish">
       <img src={this.props.details.image} alt={this.props.details.name}></img>
       <h3 className="fish-name">{this.props.details.name}
        <span className="price">{h.formatPrice(this.props.details.price)}</span>
       </h3>
       <p>{this.props.details.desc}</p>
       <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
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
  renderOrder : function(key) {
    var fish = this.props.fishes[key];
    var count = this.props.order[key];

    if(!fish) {
      return <li key={key}>Sorry, fish no longer available!</li>
    }

    return (
      <li key={key}>
        {count}lbs
        {fish.name}
        <span className="price">{h.formatPrice(count * fish.price)}</span>
      </li>
    )
  },

  render : function() {
    // Gives us an array of all the fishes we ordered
    var orderIds = Object.keys(this.props.order);
    // Sums up how much they've spent on a particular fish
    var total = orderIds.reduce((prevTotal, key)=> {
      var fish = this.props.fishes[key];
      var count = this.props.order[key];
      var isAvailable = fish && fish.status === 'available';

      if (fish && isAvailable) {
        return prevTotal + (count + parseInt(fish.price) || 0);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {h.formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
})

// Inventory

var Inventory = React.createClass ({
  renderInventory : function(key) {
    return (
      <div className='fish-edit' key={key}>
      {/*linkState is a method available through Mixin */}
        <input type="text" valueLink={this.props.linkState('fishes.' + key + '.name')}></input>
        <input type="text" valueLink={this.props.linkState('fishes.' + key + '.price')}></input>
        <select valueLink={this.props.linkState('fishes.' + key + '.status')}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" valueLink={this.props.linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" valueLink={this.props.linkState('fishes.' + key + '.image')}></input>
        {/*binds runs the respective function in its scope, takes two arguments first is usuall null*/}
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </div>
    )
  },
  render : function() {
    return (
      <div>
      <h2>Inventory</h2>
      {/* this will give us all they keys for our fishes (fish1, fish2, etc.)*/}
      {/* For each key, it will run it against renderInventory, a function that will return an edited render blocl*/}
      {Object.keys(this.props.fishes).map(this.renderInventory)}
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
