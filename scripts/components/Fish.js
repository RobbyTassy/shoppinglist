import React from 'react';
import h from '../helpers';

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

export default Fish;
