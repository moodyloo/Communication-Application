import React,{Component} from 'react';
import Header from '../components/Header.js';
import { withRouter } from 'react-router-dom';
const queryString = require('query-string');


export default withRouter(class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginURL : props.loginURL
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    location.href = this.state.loginURL;
  }

  componentWillMount(){
    //If there is a query in the URL then attempt to login
    var query = queryString.parse(this.props.location.search);
    this.props.handleLogin(query.code);
  }


  render() {
    return (
      <div>
        <Header loggedin={false} />
        <div style={login}>
          <div style={loginTitle}>Login</div>
          <button onClick={this.handleSubmit} style={loginSubmit}>Sign in with KCL Email</button>
        </div>
      </div>
    );

  }
});


var login = {
  width: '340px',
  height: '130px',
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
  border: 'none',
  height:'40px',
  width:'100%',
  backgroundColor: '#777',
  textAlign: 'center',
  fontFamily: 'KCRM',
  fontSize: '14px',
  letterSpacing: '1px',
  paddingTop: '8px',
  color:'#FFF',
};
