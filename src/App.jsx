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
  }

  render() {
    return <div className="App" />;
  }
}

export default App;
