import React from 'react';
import MessageContainer from '../components/MessageContainer';
import PropTypes from 'prop-types';
import LogoutIcon from 'react-native-vector-icons/SimpleLineIcons';
window.navigator.userAgent = 'react-native';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

var self;
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    self=this;
    this.onPressLogout = this.onPressLogout.bind(this);
    const { params } = this.props.navigation.state;
    this.state = {
      token: params.token,
      socket: params.socket,
      access_token: params.access_token,
      refreshing: false,
      data: [],
      login: 'false'
    };
    var socket = this.state.socket;

    socket.on('history', (data) => {
      this.setState({data});
    });

    socket.on('new-message-listener', () => {
      this.state.socket.emit('obtain-history', {access_token: this.state.access_token});
    });
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: 'KCL Communication',
      headerRight: <RightM/>,
      headerLeft: null,
    };
  };

  async getCode() {
    try {
      let codeToPrint = await AsyncStorage.getItem('CODE');
    } catch (error) {
      console.log('some saving');
    }
  }


  componentWillMount(){
    this.state.socket.emit('obtain-history', {access_token: this.state.access_token});
    if(this.state.access_token) {
      this.setState({login: 'true'});
    }
    this.getCode();

  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  onPressLogout() {
    this.setState({login: 'false'});
    console.log(this.state.login);
    this.state.socket.emit('remove-token', this.state.access_token);
    this.props.navigation.navigate('Login');
  }

  render() {

    return (
      <View style={styles.container}>
        {this.state.data.length > 0 ? (
          <MessageContainer data = {this.state.data} navigate = {this.props.navigation.navigate}/>
        ) : (
          <Text>No messages yet!</Text>
        )}
      </View>
    );
  }
}

export const RightM = () => (
  <TouchableHighlight style={styles.logout} onPress={() => self.onPressLogout()}>
    <View><LogoutIcon name='logout' color='white' size={23}/>
    </View>
  </TouchableHighlight>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flex: 1,
    margin: 20,
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
  },
  logout: {
    paddingRight: 10
  }

});
