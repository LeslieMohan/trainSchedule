$(document).ready(function() {
  
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBoh_PD1BnLJOQUCMDkGvc9phhyjSWpbZw",
  authDomain: "train-bce7a.firebaseapp.com",
  databaseURL: "https://train-bce7a.firebaseio.com",
  projectId: "train-bce7a",
  storageBucket: "train-bce7a.appspot.com",
  messagingSenderId: "182990150840"
  };
  firebase.initializeApp(config);


// a var to represent the database
var database = firebase.database();



// click button to submit the user input info
$("#submitTrainInfo").on("click", function(event) {
	event.preventDefault(); 

	//grab user input values
	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#trainDest").val().trim();

	//convert user input to info
	var trainTime = moment($("#trainTime").val().trim(), "hh:mm").format("X");

	var trainFrequency = $("#trainFreq").val().trim();
	
	//current time
	var currentTime = moment();
	console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));

	 console.log(trainName);
	 console.log(trainDestination);
	 console.log(trainTime);
	 console.log(trainFrequency);
	 console.log(currentTime);



	//get new train info
	var newTrain = {

		train: trainName,
		trainLeaving: trainDestination,
		trainArriving: trainTime,
		everyXMin: trainFrequency
	};


	//push the newTrain info to firebase
	database.ref().set(newTrain);
	//*push* adds to info already in firebase. *set* overwrites preexisting info
	
	//clear table before adding new input
	$("#trainName").val("");
	$("#trainDest").val("");
	$("#trainTime").val("");
	$("#trainFreq").val("");

  return false;

}); 

//adding to database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());
		//store
		var trainName = childSnapshot.val().train;
		var trainDestination =childSnapshot.val().trainLeaving;
		var trainTime = childSnapshot.val().trainArriving;
		var trainFrequency = childSnapshot.val().everyXMin;

// 		console.log(trainName);
// 		console.log(trainDestination);
// 		console.log(trainTime);
// 		console.log(trainFrequency);

		//first train time
		var trainTime = moment.unix(trainTime).format("hh:mm");
		//calculate the difference between times
		var difference =  moment().diff(moment(trainTime),"minutes");

		//time apart
		var trainRemainder = difference % trainFrequency;

		//minutes until arrival
		var minUntil = trainFrequency - trainRemainder;

		//the next arrival time
		var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

		//adding this info to table 
		$("#tableContent > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

});


  
});