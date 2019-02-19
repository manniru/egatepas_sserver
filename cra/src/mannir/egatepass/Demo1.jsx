import React from "react";

export default class Demo1 extends React.Component {
  render() {
    return (
      <div>
        <h1>Demo1: {+new Date()}</h1>
        <h2>Online : {this.props.online}</h2>
      </div>
    );
  }
}
