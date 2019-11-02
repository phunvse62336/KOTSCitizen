import {Platform} from 'react-native';
import firebase from 'react-native-firebase';
import GeoFire from 'geofire';
import RNFetchBlob from 'rn-fetch-blob';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class FirebaseService {
  uid = '';
  messagesRef = null;
  locationRef = null;
  myLocationRef = null;
  geofireLocation = null;
  teamID = '';
  myID = '';
  conversationID = '';
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBlEcs2D7d66o1vWRix63Mwh9XPNGYyYx0',
      authDomain: 'kotscitizen.firebaseapp.com',
      databaseURL: 'https://kotscitizen.firebaseio.com',
      projectId: 'kotscitizen',
      storageBucket: 'kotscitizen.appspot.com',
      messagingSenderId: '608734798806',
      appId: '1:608734798806:web:593c4d53b6f2ec378cfa77',
      measurementId: 'G-MW6SRMYEF2',
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
      }
    });
  }
  setConversationID(id) {
    this.conversationID = id;
  }

  setTeamID(id) {
    this.teamID = id;
  }
  setMyID(id) {
    this.myID = id;
  }

  trackingLocation(callback) {
    this.locationRef = firebase.database().ref(this.teamID);
    // this.locationRef.off();
    // const onReceive = data => {
    //   const message = data.val();
    //   callback({ message });
    //   alert(JSON.stringify(message));
    // };
    // this.messagesRef
    //   //.startAt(d)
    //   //.endAt("2017-11-27T06:51:47.851Z")
    //   .on('child_added', onReceive);

    this.locationRef.on('value', location => {
      const message = location.val();
      // snapshot.val() is the dictionary with all your keys/values from the '/store' path
      callback({message});
    });
  }

  sendLocation(location, user) {
    this.locationRef = firebase.database().ref(this.myID);
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    /* today.setDate(today.getDate() - 30);
    var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    this.locationRef.push({
      longitude: location.longitude,
      latitude: location.latitude,
      createdAt: timestamp,
      user: user,
    });
  }

  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref(this.conversationID);
    this.messagesRef.off(); //Detaches a callback previously attached with on()
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        //createdAt: new Date(message.createdAt),
        createdAt: message.createdAt,
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
        messageType: message.messageType || '',
        audio: message.audio || '',
      });
    };

    var d = this.getLimit();
    console.log(d);
    //Generates a new Query object limited to the last specific number of children.
    //this.messagesRef.limitToLast(10).on("child_added", onReceive);
    this.messagesRef
      .orderByChild('createdAt')
      //.startAt(d)
      //.endAt("2017-11-27T06:51:47.851Z")
      .on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    /* today.setDate(today.getDate() - 30);
    var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: timestamp,
      });
    }
  }

  sendMessageAudio(message) {
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    /* today.setDate(today.getDate() - 30);
    var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    this.messagesRef.push({
      text: message.text,
      user: message.user,
      createdAt: timestamp,
      messageType: message.messageType,
      audio: message.audio,
    });
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }

  getLimit() {
    var today = new Date();
    //var milliseconds = Date.parse(today);
    //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
    today.setDate(today.getDate() - 31); // last 30 Days
    //console.log(today);
    var changedISODate = new Date(today).toISOString();
    //var changedISODate = today.toISOString();
    console.log(changedISODate);
    return changedISODate;
  }

  uploadImage(image, mime = 'application/octet-stream') {
    console.log('1');
    return new Promise((resolve, reject) => {
      const imageRef = firebase
        .storage()
        .ref('images')
        .child(image.fileName);

      imageRef
        .putFile(image.path)
        .then(() => {
          console.log('4');
          return imageRef.getDownloadURL();
        })
        .then(url => {
          console.log('5');
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  uploadAudio(audio, mime = 'application/octet-stream') {
    console.log('1');
    return new Promise((resolve, reject) => {
      const audioRef = firebase
        .storage()
        .ref('audio')
        .child(this.uid + Date.now() + '.aac');

      audioRef
        .putFile(audio.uri)
        .then(() => {
          console.log('4');
          return audioRef.getDownloadURL();
        })
        .then(url => {
          console.log(url);
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new FirebaseService();