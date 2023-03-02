var admin = require("firebase-admin");

var serviceAccount = require("../../dj-bionico-firebase-adminsdk-.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dj-bionico.firebaseio.com"
  
});


const send_notification = async (payload, topic) => {
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    var registrationTokens = topic;
    console.log(registrationTokens);
    admin.messaging().sendToDevice(registrationTokens, payload, options)
        .then((response) => {
            //res.send({ msg: "Successfully sent message:", data: response })
            console.log("Successfully sent message:", JSON.stringify(response));
        })
        .catch((error) => {
            //res.send({ msg: "Error sending message:", data: error })
            console.log("Error sending message:", error);
        });
};

module.exports = {
    send_notification
}

