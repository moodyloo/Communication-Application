import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
} from 'react-native-elements';
import _ from 'lodash';
import TimeAgo from 'react-native-timeago';

import {
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';

export default class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setMessageReadStatus = this.setMessageReadStatus.bind(this);
    this.getMessageReadStatus = this.getMessageReadStatus.bind(this);
    this.state= {
      data: [],
      refreshing: false,
      readMessages: [],
    };
  }

  static propTypes = {
    data: PropTypes.array,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  getSortedData(){
    var data = this.props.data;
    var sortedData = _.sortBy(data, 'date');
    return sortedData.reverse();
  }
  getTimeStamp(time){
    return <TimeAgo time={time}/>;
  }

  getPriority(priority) {
    if(priority === 'High') {
      return 'red';
    } else if (priority === 'Medium') {
      return 'orange';
    }else if (priority === 'Low') {
      return 'green';
    }else {
      return '';
    }

  }

  setMessageReadStatus(message_id){
    this.state.readMessages.push(message_id);
  }

  getMessageReadStatus(message_id){
    if(_.includes(this.state.readMessages, message_id)){
      return styles.titleText;
    } else {
      return styles.titleTextUnread;
    }
  }
  render() {
    return (
      <View>
        <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.getSortedData()}
            renderItem = {({item}) => (
              <ListItem
                roundAvatar
                title={<View style={styles.titleContainer}>
                  <Text numberOfLines={1} style={this.getMessageReadStatus(item._id)}>{item.subject}</Text>
                  <View style={styles.timestamp}><Text style={styles.timestampText}>{this.getTimeStamp(item.date)}</Text></View>
                </View>}
                subtitle={item.message}
                {...console.log(item)}
                leftIcon={{name: 'label', type: 'material-community', color: this.getPriority(item.config.priority)}}
                hideChevron={true}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => {
                  this.props.navigate('Messages', {item});
                  this.setMessageReadStatus(item._id);
                }}
              />
            )}
            keyExtractor={item => item.date}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  kba: {
    flex: 1
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
    backgroundColor: 'rgba(255,255,255,0.8)'
  },

  loginButton: {
    flex: 1,
    alignSelf : 'stretch',
    marginTop: 20,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
  },

  titleText: {
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap'
  },
  titleTextUnread: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap'
  },
  timestampText: {
    fontSize: 13,

  },
  timestamp: {
    paddingLeft: 10,
    alignItems: 'flex-end'
  }

});
