import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import io from 'socket.io-client/dist/socket.io';

export default class LoginWebView extends React.Component {
  constructor(props){
    super(props);
    this.resetWebView = this.resetWebView.bind(this);
    this.state = {
      socket: io('https://gentle-refuge-90119.herokuapp.com/'),
      url: '',
      key: 1,
    };
    this.resetWebView();
    var socket = this.state.socket;
    socket.on('token', (data) => {
      this.setState({token :data.token});
    });

    socket.on('message', (data) => {
      console.log(data);
    });
  }
  static navigationOptions = {
    title: 'LoginWeb',
    header: null
  }

  static propTypes = {
    url: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }
  resetWebView = () => {
    this.setState({
      key: this.state.key + 1
    });
  };

  _onNavigationStateChange(webViewState){
    this.setState({url:webViewState});
    if(this.state.url && this.state.url.url.split('https://gentle-refuge-90119.herokuapp.com/')[1]) {
      var code = this.state.url.url.split('https://gentle-refuge-90119.herokuapp.com/?code=')[1].split('&')[0];
      this.setState({code: code });
      this.setCode(code);
      this.state.socket.emit('obtain-token', {token: code});
    }
  }
  async setCode(code) {
    try {
      await AsyncStorage.setItem('CODE', code);
    } catch (error) {
      console.log('some saving');
    }
  }
  async getCode() {
    try {
      let codeToPrint = await AsyncStorage.getItem('CODE');
      return codeToPrint;
    } catch (error) {
      console.log('some saving');
    }
  }
  render() {
    if(this.state.token) {
      this.props.navigation.navigate('Home', {token: this.state.token, socket:this.state.socket, access_token: this.state.token.access_token});
    }
    return (
      <WebView
        source={{uri: 'https://login.microsoftonline.com/kcl.ac.uk/oauth2/v2.0/authorize?response_type=code&client_id=15793157-5fd9-435d-b0e1-56bc87bcd66d&redirect_uri=https%3A%2F%2Fgentle-refuge-90119.herokuapp.com&scope=openid%20email%20profile%20offline_access%20User.Read%20Mail.Read&domain_hint=kcl.ac.uk'}}
        key={ this.state.key }
        style={{marginTop: 20}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
      />
    );
  }
}
