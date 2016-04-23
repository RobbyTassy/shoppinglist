// Fish
import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Fish extends React.Component {

  onButtonClick() {
    var key = this.props.index;
    var num = parseInt(this.refs.amount.value || 1);
    this.props.addAmountToOrder(key, num);
    // console.log(this.refs.amount); // YOU LEFT OFF HERE DUDE

    if num > 0 {
      console.log(num);
    }
  }

  render() {
    var isAvailable = (this.props.details.status == 'available' ? true : false);
    var buttonText = (isAvailable ? 'Add' : 'Sold Out!');
    return (
      <li className="menu-fish">
       <img src={this.props.details.image} alt={this.props.details.name}></img>
       <h3 className="fish-name">{this.props.details.name}
        <span className="price">{h.formatPrice(this.props.details.price)}</span>
       </h3>
       <p>{this.props.details.desc}</p>
       <p><input disabled={!isAvailable} type="number" min="0" ref="amount" placeholder="How many?" required></input><button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button></p>


      </li>
    )
  }
};


export default Fish;
