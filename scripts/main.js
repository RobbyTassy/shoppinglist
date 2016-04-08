var React = require('react');
var ReactDOM = require('react-dom');

/*
StorePicker
This will make <StorePicker> element where I can put where I want.
*/

var StorePicker = React.createClass({
  render : function() {
    return (
    <p>Hi</p>
    )
  }
});

ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
