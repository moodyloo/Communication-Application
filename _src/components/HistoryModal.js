// Imports
import React,{Component} from 'react';

// This class acts as a row on the Message
export default class HistoryModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active : '',
      history: props.history,
    };
    this.renderTabLinks = this.renderTabLinks.bind(this);
    this.renderTabContent = this.renderTabContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.history[0]){
      this.setState({active : nextProps.history[0]._id,history: nextProps.history});
    } else {
      this.setState({history:nextProps.history});
    }
  }

  renderTabLinks(){
    return (
      this.state.history.map((element) => {
        return (
          <button style={{whiteSpace:'normal'}} key={element._id}
            onClick={() => this.setState({active : element._id})}
            className="tablinks btn btn-outline-primary btn-block">
            {element.subject}
            <div type="button" style={{backgroundColor:'red'}}
              className="close" aria-label="Close"
              onClick={()=>{this.props.deleteHistory(element._id);}}>
              <span aria-hidden="true">&times;</span>
            </div>
          </button>
        );
      })
    );
  }

  renderTabContent(){
    return this.state.history.map((element) => {
      var style = {display : 'none'};
      if(this.state.active == element._id){
        style = {};
      }
      return(
        <div key={element._id}  style={style}>
          <center>
            <h3><u>{element.subject}</u></h3>
            <div/>
            <h5>Message:</h5>
            <div/>
            <p>{element.message}</p>
            <div/>
            <h5>Years:</h5>
            <div/>
            {element.config ? element.config.years.map((year,i) => {
              return (<span key={i}>{year},</span>);
            }) : null}
            <div/>
            <h5>Programme:</h5>
            <div/>
            {element.config ? element.config.programme.map((prog,i) => {
              return (<span key={i}>{prog},</span>);
            }) : null}
            <div/>
            <h5>Date:</h5>
            <div/>
            {element.config ? element.config.startDate.map((date,i) => {
              return (<span key={i}>{date},</span>);
            }) : null}
            <div/>
            <h5>Tutor:</h5><div/>
            {element.config ? element.config.tutor.map((tutor,i) => {
              return (<span key={i}>{tutor},</span>);
            }) : null}
            <div/>
            <h5>Priority:</h5>
            <div/>
            <p>{element.config ? element.config.priority : null}</p>
            <div/>
            <h5>File:</h5><div/>
            <p>[{element.config ? element.config.fileName : null}]</p>
          </center>
        </div>
      );
    });
  }

  render(){
    return (
      <div className="row" style={{height:'450px'}}>
        <div className="col" style={{height:'90px'},{overflowY:'scroll'}}>
          {this.renderTabLinks()}
        </div>
        <div className="col" style={{height:'90px'},{overflowY:'scroll'}}>
          {this.renderTabContent()}
        </div>
      </div>
    );
  }
}
