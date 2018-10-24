import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  WebView
} from 'react-native';
import PropTypes from 'prop-types';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  getFile(file){
    if(file){
      return file;
    } else{
      return;
    }
  }
  render() {
    const { params } = this.props.navigation.state;
    const item = params ? params.item : null;
    return (
      <ScrollView style={{ height: 400 }}>
        <View style={styles.messageTitleBox}>
          <Text selectable={true} numberOfLines={3} style={styles.messageTitleText}>
            {item.subject}
          </Text>
          <Text style={styles.file}>
            {this.getFile(item.file)}
          </Text>

        </View>
        <View style={styles.messageBody}>
          <Text selectable={true} style={styles.messageBodyText}>
            {item.message}
          </Text>
        </View>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageTitleBox: {
    backgroundColor: '#DCDCDC',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    height: 93,
    alignItems: 'center'
  },
  messageTitleText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  messageBody: {
    padding: 10,
    borderColor: '#DCDCDC',
  },
  messageBodyText: {
    flex: 1,
    flexWrap: 'wrap',
    overflow: 'scroll'
  },
  file:{
    textDecorationLine: 'underline'
  }
});
