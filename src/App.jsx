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
    this.state = {
      warning: "",
      currentUser: "",
      pictures: []
    };
  }

  componentDidMount() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ currentUser: result.user.displayName });
      });
  }

  updatePicturesFromUsers = () => {
    database.ref("/").on("value", snapshot => {
      let pictureObject = [];
      console.log("snap", snapshot.val());
      for (let property in snapshot.val()) {
        pictureObject = pictureObject.concat([
          { [property]: snapshot.val()[property] }
        ]);
      }
      this.setState({ pictures: pictureObject });
      // this.setState(st => ({
      //   pictures: st.pictures.concat([
      //     { [property]: snapshot.val()[property] }
      //   ])
      // }));
    });
  };

  displayPicturesFromUsers = object => {
    let objectProperty = Object.keys(object)[0];
    let childrenObject = object[Object.keys(object)[0]];

    console.log("parent", objectProperty);
    console.log("children", childrenObject);
    // <div>{objectProperty}</div>

    return (
      <div>
        <div>{objectProperty}</div>
        <div className="gallery">
          {Object.keys(childrenObject).map((keyName, keyIndex) => (
            <img className="pictures" src={childrenObject[keyName]} alt="" />
          ))}
        </div>
      </div>
    );
  };

  uploadUrls = file => {
    console.log("file", file.name);

    // storageRef
    //   .ref(this.folder.value)
    //   .child("picture.jpg")
    //   .getDownloadURL()
    //   .then(url => {
    //     console.log("url", url);
    //     this.setState({ loc: url });
    //   });
    storageRef
      .ref()
      .child(`${file.name}`)
      .getDownloadURL()
      // .then(url => this.setState({ loc: url }));
      .then(url => {
        database
          .ref()
          .child(this.state.currentUser)
          .push(url)
          .then(() => this.updatePicturesFromUsers());
      });
  };

  doUpload = event => {
    let file = event.target.files[0];
    console.log(file);
    storageRef
      .ref()
      .child(file.name)
      .put(file)
      .then(
        this.setState({ warning: `${file.name} has been succesfully uploaded` })
      )
      .then(() => this.uploadUrls(file));
  };

  render() {
    return !this.state.currentUser ? (
      <p>Please log in</p>
    ) : (
      <div className="App">
        <p>please upload your picture</p>
        <input onChange={this.doUpload} type="file" />
        <p>{this.state.warning}</p>
        <div>{this.state.pictures.map(this.displayPicturesFromUsers)}</div>
      </div>
    );
  }
}

export default App;
