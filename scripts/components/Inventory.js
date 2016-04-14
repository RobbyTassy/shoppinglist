// Inventory

import React from 'react';
import AddFishForm from './AddFishForm';

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
  },
  propTypes : {
    addFish : React.PropTypes.func.isRequired,
    loadSamples : React.PropTypes.func.isRequired,
    fishes : React.PropTypes.object.isRequired,
    linkState : React.PropTypes.func.isRequired,
    removeFish : React.PropTypes.func.isRequired
  }
})

export default Inventory;
