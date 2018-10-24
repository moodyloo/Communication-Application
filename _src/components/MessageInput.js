import React,{Component} from 'react';

export default class MessageInput extends Component {
  constructor(props){
    super(props);

    this.state = {
      title : '',
      message : ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);

    this.bindTitle = this.bindTitle.bind(this);
    this.bindMessage = this.bindMessage.bind(this);
  }

  bindTitle(){
    return this.state.title;
  }

  bindMessage(){
    return this.state.message;
  }

  componentWillMount(){
    this.props.cbSelection({getTitle : this.bindTitle});
    this.props.cbSelection({getMessage : this.bindMessage});
  }

  handleTitleChange(event){
    this.setState({title : event.target.value});
  }

  handleMessageChange(event){
    this.setState({message : event.target.value});
  }

  render() {
    return (
      <div>
        <div style={title}>Title:</div>
        <div><textarea style={inputTextBox} onChange={this.handleTitleChange} rows="1"/></div>
        <div style={split}></div>

        <div style={title}>Message:</div>
        <div><textarea style={inputTextBox} onChange={this.handleMessageChange} rows="3"/></div>
        <div style={split}></div>
      </div>
    );
  }
}

/* STYLES */

var inputTextBox = {
  width: '100%',
  outline: 'none',
  backgroundColor: '#DDD',
  border: 'solid 1px #999',
  padding: '10px',
  color: '#111',
  fontFamily: 'KCRM',
  letterSpacing: '0.5px',
  fontSize: '16px'
};

var title = {
  fontFamily:'KCR',
  fontSize: '15px',
  color: '#111',
  letterSpacing: '1px',
  textAlign:'left',
  paddingLeft: '2px',
  paddingBottom: '5px'
};

var split = {
  marginBottom: '10px'
};
