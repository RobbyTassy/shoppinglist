var React = require('react');
var ReactDOM = require('react-dom');

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

ReactDOM.render(<StorePicker/>, document.querySelector('#main'))
