var React = require('react');
var ReactDOM = require('react-dom');

// Loading in React Router
var ReactRouter = require('react-router');
// ^ npm install react-router --save-dev
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;     // allows for pushState to happen on the URL. Refer to line 86
var createBrowserHistory = require('history/lib/createBrowserHistory');
// ^ npm install history:  load in required code to do HTML5 push state,
// push state meaning browsers back/forward button will still update component states


var h = require('./helpers.js');  // Calls another file in your applications folder


// App

var App = React.createClass ({
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        {/* props sorta work like HTML attributes in that pass data into other elements/components */}
          <Header tagline="Fresh Seafood Market"></Header>
        </div>
        <Order></Order>
        <Inventory></Inventory>
      </div>
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
      <p>Inventory</p>
    )
  }
})


/*
StorePicker
This will make <StorePicker> element where I can put where I want.
*/

var StorePicker = React.createClass({
  mixins : [History],
  goToStore : function(event) {
    event.preventDefault();
    // get data from the input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);  // performs a push state on the URL
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
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker}></Route>
    <Route path="/store/:storeId" component={App}></Route>
    <Route path="*" component={NotFound}></Route>
  </Router>
)



ReactDOM.render(routes, document.querySelector('#main'))
