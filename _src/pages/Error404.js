import React,{Component} from 'react';
import Header from '../components/Header.js';

export default class ErrorPage extends Component {
  render() {
    return (
      <div>
        <Header/>
        <h1>Oopsie daisy,something went wrong</h1>
        <p>route cannot be found</p>
      </div>
    );
  }
}
