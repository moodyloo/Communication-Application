//Imports
import React,{Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Message from './pages/Message';
import Error404 from './pages/Error404';
import Cookies from 'universal-cookie';

//Helpers
var authHelper = require('./helpers/auth');
var io = require('socket.io-client');
const jwt = require('jsonwebtoken');

//This is the router solver for pages.
export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedin: false,
      loginURL : authHelper.getAuthURL(),
      //socket : io('gentle-refuge-90119.herokuapp.com'),
      socket : io('http://localhost:8002'),
      cookies : new Cookies()
    };

    this.logout = this.logout.bind(this);
    this.loadCookies = this.loadCookies.bind(this);
    this.loadSocketListeners = this.loadSocketListeners.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);

    //Load all the listeners for App on the socket handle
    this.loadSocketListeners();

    //Load any cookies if any
    this.loadCookies();

  }

  logout(){
    var { socket, access_token } = this.state;
    socket.emit('remove-token', {access_token});
    this.state.cookies.remove('graph_access_token');
    this.state.cookies.remove('graph_refresh_token');
    this.state.cookies.remove('graph_user_token');
    this.state.cookies.remove('graph_token_expires');
    this.setState({loggedin : false});
  }

  handleLoggedIn(code){
    if (code) {
      this.state.socket.emit('obtain-token', { token : code});
    }
  }

  //ignore the error
  render(){
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path='/'
            render={() =>
              this.state.loggedin ?
                <Redirect to='/message' /> :
                <Login loginURL={this.state.loginURL}
                  handleLogin={this.handleLoggedIn}/> }/>

          <Route exact path='/message'
            render={() =>
              this.state.loggedin ?
                <Message logout={this.logout} socket={this.state.socket}
                  user_token={this.state.user_token} access_token={this.state.access_token}/> :
                <Redirect to='/' />}/>

          <Route exact path='/*' component={Error404}/>

        </Switch>
      </BrowserRouter>
    );
  }

  loadCookies(){
    var { socket, cookies } = this.state;

    //Get access to the cookies
    var cookie_rtoken = cookies.get('graph_refresh_token');
    var cookie_etoken = cookies.get('graph_token_expires');
    var cookie_atoken = cookies.get('graph_access_token');

    //If the access_token exists, check if expired
    if(cookie_atoken || cookie_rtoken){
      const FIVE_MINUTES = 300000;
      const expiration = new Date(parseFloat(cookie_etoken - FIVE_MINUTES));
      if (expiration > new Date()) {
        socket.emit('client-refresh', {access_token : cookie_atoken});
      } else if (cookie_rtoken) {
        //If access token is expired and refresh token isn't, request a new token
        socket.emit('request-new-token', {refresh_token : cookie_rtoken});
      }
    }
  }

  loadSocketListeners(){
    var { socket } = this.state;

    //Socket Listeners
    socket.on('token', function(data){
      //Set some cookies to remember client
      if(data.admin){
        const user = jwt.decode(data.token.id_token);
        this.state.cookies.set('graph_access_token', data.token.access_token, {path: '/', maxAge: 3600000});
        this.state.cookies.set('graph_refresh_token', data.token.refresh_token, {path: '/', maxAge: 7200000});
        this.state.cookies.set('graph_user_token', user.name, {path: '/', maxAge: 3600000});
        this.state.cookies.set('graph_token_expires', data.token.expires_at, {path: '/', maxAge: 3600000});

        this.setState({
          access_token : this.state.cookies.get('graph_access_token'),
          refresh_token : this.state.cookies.get('graph_refresh_token'),
          user_token : this.state.cookies.get('graph_user_token'),
          token_expires : this.state.cookies.get('graph_token_expires'),
          loggedin : true
        });
      }
    }.bind(this));

    socket.on('valid-token', function(data){
      this.setState({
        access_token : this.state.cookies.get('graph_access_token'),
        refresh_token : this.state.cookies.get('graph_refresh_token'),
        user_token : this.state.cookies.get('graph_user_token'),
        token_expires : this.state.cookies.get('graph_token_expires'),
        loggedin : data
      });
    }.bind(this));

    socket.on('message', function(data){
      //Log any messages sent from the server to the console
      console.log(data);
    }.bind(this));

    socket.on('error', function(data){
      //Log any messages sent from the server to the console
      console.log(data);
    }.bind(this));
  }

}
