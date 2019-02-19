import React, { Component } from 'react';
import './Console.css';
import 'console-log-div';

const styles = {
    console_log_div: {
        width: '95%'
    }
}

export default class Console extends Component {
  render() {
      /*
      console.log(+ new Date());

      var table = [
        {id: 1, name: 'One'},
        {id: 2, name: 'Two'},
        {id: 3, name: 'Three'}
    ]
    console.table(table)
    */

    return (
      <div id="log"></div>
    );
  }
}