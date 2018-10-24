import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

  }


  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }
  static navigationOptions = {
    header: null
  }
  render() {

    return (
      <View style={styles.kba}>
        <Button
          title="Login"
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('LoginWeb')}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  kba: {
    flex: 1,
    backgroundColor: '#44296c'
  },

  logInText: {
    color: 'white'
  },

  form: {
    flex: 1,
    alignSelf : 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textInput: {
    alignSelf : 'stretch',
    padding: 20,
    backgroundColor: '#4d4394'
  },

  loginButton: {
    flex: 1,
    alignItems: 'center',

    marginTop: 20,
    padding: 20,
  }

});
