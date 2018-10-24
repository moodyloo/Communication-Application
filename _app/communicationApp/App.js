import React from 'react';
import Home from './src/screens/Home';
import LoginForm from './src/screens/LoginForm';
import Messages from './src/screens/Messages';
import LoginWebView from './src/components/LoginWebView'
import { StackNavigator } from 'react-navigation';

const Navigator = StackNavigator({
  Login: {
    screen: LoginForm,
  },
  LoginWeb: {
    screen: LoginWebView,
  },
  Home: {
    screen: Home,
  },
  Messages: {
    screen: Messages,
  }
},
{
  initialRouteName: 'Login',
  navigationOptions: {
    headerMode: 'screen',
    headerStyle: {
      backgroundColor: '#44296c',
    },
    headerTintColor: 'white',
    headerBackTitle: null,
  },
}
);

export default class App extends React.Component {
  constructor(props){
    super(props);
    //console.disableYellowBox = true;
    this.state = {
      code: null,
      token: null
    };
  }
  render() {
    return (
      <Navigator />
    );
  }
}
