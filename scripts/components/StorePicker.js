/*
StorePicker
This will make <StorePicker> element where I can put where I want.
*/

import React from 'react';
import ReactDOM from 'react';
import h from '../helpers';
import { browserHistory } from 'react-router';
import autobind from 'autobind-decorator';

@autobind
class StorePicker extends React.Component {
  
  goToStore(event) {
    event.preventDefault();
    // get data from the input
    var storeId = this.refs.storeId.value;
    browserHistory.push( '/store/' + storeId);  // performs a push state on the URL
    // transition from StorePicker to App


  }

  render() {
    return (
    <form className="store-selector" onSubmit={this.goToStore}>
      <h2>Please enter a store</h2>
      <input type="text" ref="storeId" defaultValue={h.getFunName()} required></input>
      <input type="submit"></input>

    </form>
    )
  }

}

export default StorePicker;
