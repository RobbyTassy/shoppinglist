// Add Fish Form
import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class AddFishForm extends React.Component {

  createFish(event) {
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
  }

  render() {
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

};

export default AddFishForm;
