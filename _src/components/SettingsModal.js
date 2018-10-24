import React,{Component} from 'react';

export default class SettingsModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: props.settings,
    };

    this.addItem = this.addItem.bind(this);
    this.createUsers = this.createUsers.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({items:nextProps.settings});
  }

  createUsers() {
    return (
      this.state.items.map((item) => {
        return (
          <button style={{whiteSpace:'normal'}}
            className="tablinks btn btn-outline-primary btn-block"
            onClick={() => {this.props.deleteAdmin(item._id);}}
            key={item._id}>
            {item.Email}
          </button>
        );
      })
    );
  }

  addItem(e) {
    e.preventDefault();
    if (this._inputElement.value !== '') {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this._inputElement.value = '';

      this.props.addAdmin(newItem);
    }
  }

  render() {
    return (
      <div className="row" style={{height:'450px'}}>
        <div className="col">
          <div>
            <input ref={(a) => this._inputElement = a} placeholder="Enter Email:">
            </input>
            <button className="btn btn-primary" type="submit" onClick={this.addItem}>Add</button>
          </div>
        </div>
        <div className="col" style={{height:'90px'},{overflowY:'scroll'}}>
          {this.createUsers()}
        </div>
      </div>
    );
  }
}
