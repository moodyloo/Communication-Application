import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
export default class LoginBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login : props.login,
      loggedin : props.loggedin()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){

    this.state.login((bool) => this.setState({loggedin : bool}));
    if (this.state.loggedin) this.setState({loggedin : true});

  }

  render(){

    if (this.state.loggedin) return(<Redirect to='/message' />);

    return (
      <div style={login}>
        <div style={loginTitle}>Login</div>
        <button onClick={this.handleSubmit} style={loginSubmit}>Sign in with KCL Email</button>
      </div>
    );
  }

}

/* STYLES */

var login = {
  width: '340px',
  height: '260px',
  border: 'solid 2px #AAA',
  backgroundColor: '#CCC',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  paddingLeft: '10px',
  paddingRight: '10px',
  margin: 'auto',
};

var loginTitle = {
  marginTop: '10px',
  textAlign: 'center',
  fontSize: '24px',
  letterSpacing: '1px',
  fontFamily: 'KCRMB',
  color: '#111',
  marginBottom: '10px'
};

var loginSubmit = {
  marginTop:'10px',
  height:'40px',
  width:'100%',
  backgroundColor: '#999',
  textAlign: 'center',
  fontFamily: 'KCRMB',
  letterSpacing: '1px',
  paddingTop: '8px',
  color:'#111',
};
