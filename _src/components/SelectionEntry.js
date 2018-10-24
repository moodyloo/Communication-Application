// Imports
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import MessageModal from './MessageModal';

// This class acts as a row on the Message
export default class SelectionEntry extends Component {

  // Prop type validation
  static propTypes = {
    label: PropTypes.string,
    data: PropTypes.array,
    binder: PropTypes.func
  }

  // Prop Validation
  constructor(props){
    super(props);

    this.state = {
      label : props.label,
      data : props.data,
      callBack : props.binder,
      modal : 'show' + props.label,
      selected : [],
    };

    this.bindFunction = this.bindFunction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Detects change of state in parent
  componentWillReceiveProps(nextProps) {
    this.setState({data:nextProps.data});
  }

  handleChange(value){
    this.setState({selected: value});
  }

  bindFunction(){
    return this.state.selected;
  }

  componentWillMount(){
    this.state.callBack(this.bindFunction);
  }

  // Renders a list as options
  renderList() {
    const { data,selected } = this.state;
    var options = data.map(function(element){
      return(
        {value:element,label:element}
      );
    });

    return (
      <Select style={dropDown} multi simpleValue name={this.state.label} value={selected} onChange={this.handleChange} options={options} />
    );
  }

  render(){
    return (
      <table style={table}>
        <tbody>
          <tr>
            <td width='120px' style={settingsTitleTwo}>
              {this.state.label}:
            </td>
            <td>
              <table style={inputTable}>
                <tbody>
                  <tr>
                    <td style={innerTableDrop}>
                      {this.renderList()}
                    </td>

                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

/* STYLES */

var table = {
  width: '100%'
};

var settingsTitleTwo = {
  fontFamily: 'KCR',
  fontSize: '15px',
  letterSpacing: '1px',
  color: '#111',
  paddingTop:'5px',
  paddingBottom:'5px'
};


var button = {
  textAlign: 'right'
};


var inputTable = {
  width: '100%'
};

var innerTableButton = {
  width: '50px'
};

var innerTableDrop = {
  paddingRight: '20px'
};

var dropDown = {
  backgroundColor:'#DDD',
  width: '100%',
  marginRight:'10px',
  height: '50px',
  border: '1px solid #999',
  borderRadius: '0',
  WebkitAppearance: 'none',
  paddingLeft: '10px',
  fontFamily: 'KCRM',
  fontSize: '16px',
  letterSpacing: '0.5px',
};
