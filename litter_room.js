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
document.getElementById("username").innerHTML = "welcome " + user_name;

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
//row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>"
row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();


function add_room() {
      Room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(Room_name).update({
            purpose: "adding_Room_name"
      });
      localStorage.setItem("room_name", Room_name);
      window.location = "kwitter_page.html";
}

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}