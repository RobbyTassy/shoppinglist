// Header

import React from 'react';

class Header extends React.Component {
  
    render() {
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
  }

  Header.propTypes = {
    // proptypes (or Propr validation) allows for your code (or yours props) to become more resilient
    // other users of the component. failed code will throw an error to the coder in the console
    // propTypes validates details coming in from properties (or states)
    tagline : React.PropTypes.string.isRequired
  }


export default Header;
