// // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// const functions = require('firebase-functions');

// // The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.addMessage = functions.https.onRequest((req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//       // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//       return res.redirect(303, snapshot.ref.toString());
//     });
//   });
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });
// const functions = require('firebase-functions');
// var fetch = require('node-fetch')

// const admin = require('firebase-admin')
// admin.initializeApp(functions.config().firebase)

// exports.sendPushNotifications = functions.database.ref('AbsAss/{id}')
// .onCreate(event =>{
//     const root = event.data.root
//     var messages = []

//     return root.child('/users').once('value').then(function(snapshot){
//         snapshot.forEach(function(childSnapshot){
//             if(expoToken){
//                 messages.push({
//                     "to": expoToken,
//                     "body": "Meal Time"
//                 })
//             }

//             return Promise.all(messages)
//         }).then(messages => {
//             fetch('https://exp.host/--/api/v2/push/send',{
//                 method: "POST",
//                 headers:{
//                     "Accept": "application/json",
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(messages)
//             })
//         })



// })
// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });


const functions = require('firebase-functions');
var fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('Blog/').onCreate(event => {

    const root = event.data.ref.root
    var messages = []

    //return the main promise
    return root.child('/users').once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var expoToken = childSnapshot.val().expoToken

            if (expoToken) {

                messages.push({
                    "to": expoToken,
                    "body": "New Note Added"
                })
            }
        })

        return Promise.all(messages)

    }).then(messages => {

        fetch('https://exp.host/--/api/v2/push/send', {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })
        return Promise.all(messages)
    })

})

// var fetch = require('node-fetch')
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase);



// //send the push notification 
// exports.sendPushNotification = functions.database.ref('Progress/').onCreate(async event => {

//     const root = event.data();
//     var messages = []

//     //return the main promise 
//     return root.child('/users').once('value').then(function (snapshot) {
//         snapshot.forEach(function (childSnapshot) {

//             var expoToken = childSnapshot.val().expoToken;

//             messages.push({
//                 "to": expoToken,
//                 "sound": "default",
//                 "body": "New Note Added"
//             });
//         });
//         //firebase.database then() respved a single promise that resolves
//         //once all the messages have been resolved 
//         return Promise.all(messages)

//     }).then(messages => {
//         // console.log(messages)
//         fetch('https://exp.host/--/api/v2/push/send', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },

//             body: JSON.stringify(messages)



//         });

//         return Promise.all(messages)
//     })
//         .catch(reason => {
//             console.log(reason)
//         })


// });
