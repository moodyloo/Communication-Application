import React,{Component} from 'react';
import PropTypes from 'prop-types';
import SelectionEntry from './SelectionEntry';

export default class MessageSettings extends Component {

  // Prop type validation
  static propTypes = {
    cbSelection: PropTypes.func,
    calculateOptions: PropTypes.func
  }

  constructor(props){
    super(props);
    this.state = {
      cbSelection : props.cbSelection,
      ...props.getState(),
    };
    this.bindProgramme = this.bindProgramme.bind(this);
    this.bindStatus = this.bindStatus.bind(this);
    this.bindTutor = this.bindTutor.bind(this);
    this.bindPriority = this.bindPriority.bind(this);
    this.bindDate = this.bindDate.bind(this);
  }

  //Detects change of state in parent
  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.getState()});
  }

  bindProgramme(func){
    this.props.cbSelection({getProgramme : func});
  }

  bindStatus(func){
    this.props.cbSelection({getStatus : func});
  }

  bindTutor(func){
    this.props.cbSelection({getTutor : func});
  }

  bindPriority(event){
    event.persist();
    this.props.cbSelection({getPriority : ()=>{return event.target.value;}});
  }

  bindDate(func){
    this.props.cbSelection({getDate : func});
  }

  render() {

    return (
      <div>
        {/* YEAR OF STUDY */}
        <table style={table}>
          <tbody>
            <tr>
              <td style={settingsTitle}>Year:</td>
              <td style={checkBoxSettingsOptions}><input type="checkbox" value='1' defaultChecked style={yearCheckBox} onChange={(e)=>{this.props.calculateOptions(e);}}/>1</td>
              <td style={checkBoxSettingsOptions}><input type="checkbox" value='2' defaultChecked style={yearCheckBox} onChange={(e)=>{this.props.calculateOptions(e);}}/>2</td>
              <td style={checkBoxSettingsOptions}><input type="checkbox" value='3' defaultChecked style={yearCheckBox} onChange={(e)=>{this.props.calculateOptions(e);}}/>3</td>
              <td style={checkBoxSettingsOptions}><input type="checkbox" value='4' defaultChecked style={yearCheckBox} onChange={(e)=>{this.props.calculateOptions(e);}}/>4</td>
            </tr>
          </tbody>
        </table>

        <div style={{marginTop:'10px'}}></div>

        {/* PROGRAMME */}

        {this.state.aYears.length == 0 ? (
          <SelectionEntry id='noProgramme' binder={this.bindProgramme} label='Programme' data={this.state.oNoProgrammes} />
        ) :
          this.state.aYears.includes('4') && !this.state.aYears.includes('1') && !this.state.aYears.includes('2') && !this.state.aYears.includes('3')? (
            <SelectionEntry id='masterProgramme' binder={this.bindProgramme} label='Programme' data={this.state.o4YProgrammes} />
          ) : (
            <SelectionEntry id='allProgramme' binder={this.bindProgramme} label='Programme' data={this.state.oProgrammes} />
          )}
        <div style={{marginTop:'10px'}}></div>

        {/* DATE */}
        <SelectionEntry binder={this.bindDate} label='Date' data={this.state.oDate}/>
        <div style={{marginTop:'10px'}}></div>

        {/* STATUS */}
        <SelectionEntry binder={this.bindStatus} label='Status' data={this.state.oStatus} />
        <div style={{marginTop:'10px'}}></div>

        {/* TUTOR */}
        <SelectionEntry binder={this.bindTutor} label='Tutor' data={this.state.oTutor} />
        <div style={{marginTop:'10px'}}></div>

        {/* PRIORITY */}
        <div>
          <label>Message Priority:</label><br/>
          <select style={dropDown} name="Priority" value={this.state.value} onChange={this.bindPriority}>
            <option defaultValue value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
        </div>
        <div style={{marginTop:'10px'}}></div>
      </div>
    );
  }
}

var table = {
  width: '100%'
};

var settingsTitle = {
  fontFamily: 'KCR',
  fontSize: '15px',
  letterSpacing: '1px',
  color: '#111',
  paddingTop:'5px',
  paddingBottom:'5px'
};


var yearCheckBox = {
  marginRight: '5px',
};

var checkBoxSettingsOptions = {
  fontFamily: 'KCRM',
  fontSize: '12px',
  letterSpacing: '1px',
  color: '#111',
  width: '50px',
  textAlign:'right',
  marginRight:'10px'
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
