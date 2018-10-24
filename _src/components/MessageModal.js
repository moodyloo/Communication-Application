//Imports
import React,{Component} from 'react';
import PropTypes from 'prop-types';

//This class acts as a model container
export default class MessageModal extends Component {

  // Prop type validation
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    list: PropTypes.object
  }

  constructor(props){
    super(props);

    this.state = {
      name : this.props.name,
      id : this.props.id,
      list : this.props.list
    };
  }

  render(){
    return (
      <div className="modal fade" id={this.state.id} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add {this.props.name}(s)</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <label className="my-1 mr-2">
                <b>{this.state.name}:&nbsp;&nbsp;
                {this.state.list}&nbsp;&nbsp;
                <button type="button" className="btn btn-primary">Add</button>
                </b>
              </label>
              <br/>
              <div className="selectionBox white"></div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
