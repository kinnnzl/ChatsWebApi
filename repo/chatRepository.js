'use strict';

// ----------------------------- Initial firebase ---------------------------------
const firebase = require('firebase-admin');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// ----------------------------- Variable ---------------------------------
let result = {
  message: '',
  data: null,
  result: true,
};

// ----------------------------- Initial firebase ---------------------------------
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chatbase-3fae9.firebaseio.com',
});
const db = firebase.database();
let ref = null;
const referenceName = 'restricted_access/secret_document/';
let chatRef = null;

class ChatRepository {
  constructor() {}

  insertMessage(req, childName) {
    // Set req on post method
    const chat = {
      name: req.body.name,
      message: req.body.message,
      date_time: req.body.date_time,
    };

    // Set reference database
    ref = db.ref(referenceName);
    chatRef = ref.child(childName);
    chatRef.push(chat, function (error) {
      if (error) {
        result = {
          message: 'Data could not be saved.' + error,
          result: false,
        };
      } else {
        // On response push success and snapshot all data in child
        ref.once('value', function (snapshot) {
          // console.log(snapshot.val());
          result = {
          message: 'Data saved successfully.',
          data: snapshot.val(),
          result: true,
        };
        })
      }
    });
    return result;
  }

  getMessages(childName) {
    ref = db.ref(referenceName + childName);
    ref.on(
      'value',
      function (snapshot) {
        result = {
          data: snapshot.val(),
          result: true,
        };
        // console.log(snapshot.val());
      },
      function (errorObject) {
        result = {
          message: 'The read failed: ' + errorObject.code,
          result: false,
        };
        // console.log('The read failed: ' + errorObject.code);
      }
    );
    return result;
  }

  getUsers(childName) {
    ref = db.ref(referenceName + childName);
    ref.on(
      'value',
      function (snapshot) {
        result = {
          data: snapshot.val(),
          result: true,
        };
        // console.log(snapshot.val());
      },
      function (errorObject) {
        result = {
          message: 'The read failed: ' + errorObject.code,
          result: false,
        };
        // console.log('The read failed: ' + errorObject.code);
      }
    );
    return result;
  }

  createUser(req, childName) {
    const user = {
      name: req.body.name,
      date_time: req.body.date_time,
    };

    ref = db.ref(referenceName);
    chatRef = ref.child(childName);
    chatRef.push(user, function (error) {
      if (error) {
        result = {
          message: 'Data could not be saved.' + error,
          result: false,
        };
      } else {
        // On response push success and snapshot all data in child
        ref.once('value', function (snapshot) {
          result = {
            message: 'Data saved successfully.',
            data: snapshot.val(),
            result: true,
          };
        });
      }
    });
    return result;
  }
}

const chatRepository = new ChatRepository();

module.exports = chatRepository;
