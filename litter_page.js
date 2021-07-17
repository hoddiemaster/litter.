//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBRHJbbgzSi6BEykxtQs90kd1d_Y0pIRUY",
      authDomain: "kwitter-3c7e3.firebaseapp.com",
      databaseURL: "https://kwitter-3c7e3-default-rtdb.firebaseio.com",
      projectId: "kwitter-3c7e3",
      storageBucket: "kwitter-3c7e3.appspot.com",
      messagingSenderId: "953191245405",
      appId: "1:953191245405:web:5ff10c41387afc817a0fb4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
console.log(user_name);
console.log(room_name);

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        nameWidthImage = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        DisplayMessage = "<h4 class='message-h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = nameWidthImage + DisplayMessage + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();



function send2() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value;
}

function updateLike(message_id) {
      console.log("clicked on like button-" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_like = Number(likes) + 1;
      console.log(updateLike);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_like
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}