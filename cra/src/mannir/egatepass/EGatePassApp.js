import React from "react";
import AppBarDrawer from "./AppBarDrawer";

import axios from "axios";
import io from "socket.io-client";

const config = require('../config');


export default class EGatePassApp extends React.Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || config.api;
    this.socket = io.connect(this.server);

    this.state = {
      users: [],
      online: 0
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchUsers();
    this.socket.on("visitor enters", data => this.setState({ online: data }));
    this.socket.on("visitor exits", data => this.setState({ online: data }));
    this.socket.on("add", data => this.handleUserAdded(data));
    this.socket.on("update", data => this.handleUserUpdated(data));
    this.socket.on("delete", data => this.handleUserDeleted(data));
  }

  // Fetch data from the back-end
  fetchUsers() {
    axios
      .get(`${this.server}/api/users/`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].name = user.name;
        users[i].email = user.email;
        users[i].age = user.age;
        users[i].gender = user.gender;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => {
      return u._id !== user._id;
    });
    this.setState({ users: users });
  }

  render() {
    let online = this.state.online;
    let verb = online <= 1 ? "is" : "are"; // linking verb, if you'd prefer
    let noun = online <= 1 ? "person" : "people";

    return (
      <div>
        <AppBarDrawer
          online={online}
          noun={noun}
          verb={verb}
          onUserUpdated={this.handleUserUpdated}
          onUserDeleted={this.handleUserDeleted}
          users={this.state.users}
          server={this.server}
          socket={this.socket}
        />
      </div>
    );
  }
}
