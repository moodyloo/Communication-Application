import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class HeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedin : props.loggedin,
      logout : props.logout,
      label : props.label
    };

    this.logout = this.logout.bind(this);
  }

  logout(){
    this.state.logout();
    this.setState({ loggedin : false });
  }

  render(){

    if(this.state.loggedin) {
      return (
        <div style={header}>
          <Link to="/"><div><img src="img/Kings-Logo.png" style={headerLogoImg}/></div></Link>
          <div style={headerRight}>
            <div style={headerUser}>Logged in as {this.state.label}</div>
            <a onClick={this.logout} style={headerLogOut}>Not You? Log Out</a>
          </div>
        </div>
      );
    } else {
      return(
        <div style={header}>
          <Link to="/"><div><img src="img/Kings-Logo.png" style={headerLogoImg}/></div></Link>
        </div>
      );
    }

  }
}

/* STYLES */

var header = {
  height: '50px',
  width: '100%',
  backgroundColor: '#4d4394',
  color:'#FFF'
};

var headerLogoImg = {
  float: 'left',
  marginTop: '10px',
  marginLeft: '10px' ,
  width: '30px',
  height: '30px'
};

var headerRight = {
  float: 'right'
};

var headerUser = {
  marginRight:'10px',
  marginTop: '9px',
  fontFamily: 'KCRM',
  letterSpacing: '1px',
  fontSize: '12px',
  marginBottom: '-6px'
};

var headerLogOut = {
  textAlign: 'right',
  marginRight:'10px',
  paddingTop:'-10px',
  fontFamily: 'KCRM',
  letterSpacing: '1px',
  fontSize:'9px'
};
