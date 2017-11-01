import React, { Component } from "react";
import "./App.css";

const firebase = require("firebase");

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAyQ4f39HtRUOSH9sOLQZ5PJKk-bDDSrZw",
  authDomain: "fir-authentication-b41e0.firebaseapp.com",
  databaseURL: "https://fir-authentication-b41e0.firebaseio.com",
  projectId: "fir-authentication-b41e0",
  storageBucket: "",
  messagingSenderId: "833978302946"
};
firebase.initializeApp(config);
const database = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = { email: "" };
  }

  sendEmail = () => {
    database
      .ref("email")
      .set(this.input.value)
      .then(() =>
        database.ref("email").on("value", data => {
          this.setState({ email: data.val() });
        })
      );
    console.log(this.input.value);
  };

  render() {
    return (
      <div className="App">
        <input type="text" ref={node => (this.input = node)} />
        <button onClick={this.sendEmail}>confirm your email</button>
        <div>{this.state.email}</div>
      </div>
    );
  }
}

export default App;
