{/* Import Statements */}
import React, {Component} from 'react';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput.js';
import MessageSettings from '../components/MessageSettings.js';
import FileEntry from '../components/FileEntry.js';
import HistoryModal from '../components/HistoryModal.js';
import SettingsModal from '../components/SettingsModal.js';

export default class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //Something that was here when I got here
      histories: [],
      settings: [],
      fileInput: '',
      //Bound Getters from child props
      getTitle : () => { return 'error'; },
      getMessage : () => { return 'error'; },
      getProgramme : () => { return 'error'; },
      getDate : () => { return 'error'; },
      getStatus : () => { return 'error'; },
      getTutor : () => { return 'error'; },
      getPriority : () => { return 'High'; },

      //All available options gained from connecting to db
      oYears : [],
      oProgrammes : [],
      oPriority: [],
      oStatus: [],
      oTutor: [],
      oBachelors: [],
      oMasters: [],
      oDate: [],
      oNoProgrammes :[],
      //All available options the client can select
      aYears : ['1','2','3','4'],
      aProgrammes : [],
      aPriority: [],
      aStatus: [],
      aTutor: [],
      aBachelors: [],
      aMasters: [],

      //General Stuff
      socket : props.socket,
      access_token : props.access_token
    };

    this.state.socket.on('form-data', (data)=>{
      this.setState(data);
    });

    this.state.socket.on('history', (data)=>{
      this.setState({ histories : data });
    });

    this.state.socket.on('admins', (data)=>{
      this.setState({ settings : data });
    });

    this.state.socket.on('message-submission', function(data){
      alert('The message was sent to the server: ' + data);
    });

    //Functions for submissions and local page
    this.handleSetting = this.handleSetting.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //Functions to handle state and viewing state
    this.setSelection = this.setSelection.bind(this);
    this.getState = this.getState.bind(this);
    this.calculateOptions = this.calculateOptions.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
    this.setFile = this.setFile.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
  }

  //Allows a child to call a parent to set the state
  setSelection(newState){
    this.setState(newState);
  }

  //Allows a child to view the state
  getState(){
    return this.state;
  }

  //Function to organise which options are available to client
  calculateOptions(event){
    event.persist();
    const {aYears} = this.state;
    if (aYears.includes(event.target.value)) {
      const index = aYears.indexOf(event.target.value);
      var tempArray = aYears;

      if (index > -1) {
        tempArray.splice(index,1);
        this.setState({aYears:tempArray});
      }
    } else {
      this.setState((prevState) =>({
        aYears: [...prevState.aYears,event.target.value]
      }));
    }
  }

  //Life cycle function to call to the db to populate values
  componentWillMount(){
    //Request Data
    this.state.socket.emit('request-form-data', {access_token : this.state.access_token});
    this.state.socket.emit('obtain-history', {access_token : this.state.access_token});
    this.state.socket.emit('obtain-admins', {access_token : this.state.access_token});
  }

  //Function to handle opening settings modal
  handleSetting() {
    alert('Going to settings');
  }

  stringToArray(theString){
    if(typeof theString == 'string'){
      return theString.split(',');
    } else {
      return [];
    }
  }

  setFile(e) {
    this.setState({fileInput:e.target.files});
  }

  addAdmin(items) {
    var data = {
      access_token : this.state.access_token,
      email: items.text,
      date: items.key,
    };
    this.state.socket.emit('add-admin',data);
  }

  deleteAdmin(id) {
    this.state.socket.emit('delete-admin',{access_token:this.state.access_token,_id:id});
  }

  //Function to handle connecting to db to handle submit
  handleSubmit() {
    //TODO: validation here incase we dont want to send this message

    var { getTitle, getMessage, aYears, getProgramme, getStatus, getDate,
      getTutor, getPriority, fileInput } = this.state;

    var title = getTitle();
    var message = getMessage();

    var years = aYears;
    var programme = this.stringToArray(getProgramme());
    var status = this.stringToArray(getStatus());
    var dates = this.stringToArray(getDate());
    var tutor = this.stringToArray(getTutor());
    var priority = getPriority();
    var file = fileInput[0];
    var fileName = fileInput[0] ? fileInput[0].name : null;

    var data = {
      access_token : this.state.access_token,
      subject : title,
      message : message,
      file : file, //Needs replacing with file url
      config : {
        years: years,
        programme: programme,
        startDate: dates,
        status: status,
        tutor: tutor,
        priority: priority,
        fileName : fileName,
      }
    };

    this.state.socket.emit('send-message', data);
  }

  //Delete history
  deleteHistory(id) {
    this.state.socket.emit('delete-message',{access_token:this.state.access_token,_id:id});
  }

  //Render method to rended view to client
  render() {
    return (
      <div style={{outerContainer}}>
        <Header logout={this.props.logout} loggedin={true} label={this.props.user_token}/>
        <div style={outerContainer}>
          <div style={messageInputContainer} className="col-xl-7 col-lg-8 col-md-9 col-sm-10 col-12">
            <div className="col-xx-4">

              <div className="row-xx-4" style={borderBottom}>
                <MessageInput cbSelection={this.setSelection}/>
              </div>

              <div className="row-xx-4" style={borderBottom}>
                <MessageSettings cbSelection={this.setSelection} getState={this.getState} calculateOptions={this.calculateOptions}/>
              </div>

              <div style={{marginTop:'10px'}}></div>

              {/* HISTORY AND SETTINGS BUTTONS */}
              <div className="border border-primary">
                <div className="row">
                  <div className="col">
                    <FileEntry setFile={this.setFile}/>
                  </div>
                  <div className="col">
                    {/*placeholder*/}
                  </div>
                  <div className="col">
                    <div style={{align:'right'}}><button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#programmeModal">History</button>
                      <div className="modal fade" id="programmeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                          <div className="modal-content" style={{height:'100%'}}>
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel"></h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            {/**History messages**/}
                            <div className="container">
                              <HistoryModal history={this.state.histories} deleteHistory={this.deleteHistory}/>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div style={{align:'right'}}><button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#settingModal">Settings</button>
                      <div className="modal fade" id="settingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel"></h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            <div className="container">
                              <SettingsModal settings={this.state.settings} addAdmin={this.addAdmin} deleteAdmin={this.deleteAdmin}/>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{marginTop:'10px'}}></div>

              <div className="row-xx-4">
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary" style={{width:'100%'}}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


/* STYLES */
/* Style the tab */

/* Style the tab content */
var borderBottom = {
  borderBottom:'5px solid #919191',
};

var outerContainer = {
  margin:'auto',
  width: '90vw'
};

var messageInputContainer = {
  margin:'auto',
  backgroundColor: '#BBB',
  marginTop: '30px',
  padding: '15px',
  border: '1px solid #666',
};
