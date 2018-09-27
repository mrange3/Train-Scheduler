  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAicQO2lW-YTkYnevhYCMdbkZ4ulXC2lLU",
    authDomain: "myproject-40f36.firebaseapp.com",
    databaseURL: "https://myproject-40f36.firebaseio.com",
    projectId: "myproject-40f36",
    storageBucket: "myproject-40f36.appspot.com",
    messagingSenderId: "1082542544844"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$(".btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency").val().trim();
  
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
    };
  
    database.ref().push(newTrain);
    

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
  });


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % frequency;
    var trainTime = frequency - tRemainder;
    var nextTrain = moment().add(trainTime, "minutes").format("hh:mm a");

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(trainTime),
    );
  
    $(".table > tbody").append(newRow);
  });
  