import React, { Component } from "react";
import "./App.css";

const firebase = require("firebase");

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAyQ4f39HtRUOSH9sOLQZ5PJKk-bDDSrZw",
  authDomain: "fir-authentication-b41e0.firebaseapp.com",
  databaseURL: "https://fir-authentication-b41e0.firebaseio.com",
  projectId: "fir-authentication-b41e0",
  storageBucket: "fir-authentication-b41e0.appspot.com",
  messagingSenderId: "833978302946"
};
firebase.initializeApp(config);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage();

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log(result.user));
  }

  doUpload = event => {
    let file = event.target.files[0];
    console.log(file);
    storageRef
      .ref()
      .child(file.name)
      .put(file);
  };

  render() {
    return (
      <div className="App">
        <p>please upload your picture</p>
        <input onChange={this.doUpload} type="file" />
      </div>
    );
  }
}

export default App;
