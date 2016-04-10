var React = require('react');
var ReactDOM = require('react-dom');

// App

var App = React.createClass ({
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header></Header>
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
      <p>Header</p>
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
  render : function() {
    return (
    <form className="store-selector">
      <h2>Please enter a store</h2>
      <input type="text" ref="storeId" required></input>
      <input type="submit"></input>

    </form>
    )
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'))
