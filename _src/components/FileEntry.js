// Imports
import React,{Component} from 'react';

// This class acts as a row on the Message
export default class FileEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'Choose File...',
    };
    this.setName = this.setName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({fileInput:nextProps.fileInput});
  }

  setName(e) {
    this.setState({name: e.target.files[0].name});
    this.props.setFile(e);
  }

  render(){
    return (
      <div>
        <label htmlFor="upload_input" style={overme} className="btn btn-warning">{this.state.name}</label>
        <input id="upload_input" style={hideFile} name="myfile" type="file"
          onChange={this.setName}/>
      </div>
    );
  }
}

/* STYLES */
var overme = {
  width: '300px',
  overflow:'hidden',
  whiteSpace:'nowrap',
  textOverflow: 'ellipsis',
};

var hideFile = {
  opacity: '0',
  position: 'absolute',
  zIndex: '-1',
};

var bottomButtons = {
  textAlign:'center',
  paddingRight: '10px',
  width: '100px'
};
