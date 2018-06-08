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
	var trainDest = $("#trainDest").val().trim();
	var trainTime = $("#trainTime").val().trim();
	var trainFreq = $("#trainFreq").val().trim();


	var result="";
	
	
	//console.log(trainName);
	 //console.log(trainDestination);
	 //console.log(trainTime);
	 //console.log(trainFrequency);
	 //console.log(currentTime);


	//push the newTrain info to firebase
	
	database.ref().push( {
		trainName: trainName,
		trainDest: trainDest,
		trainTime: trainTime,
		trainFreq: trainFreq
	});
	
	
	//clear table before adding new input

	$("#trainName").val("");
 	$("#trainDest").val("");
   	$("#trainTime").val("");
	$("#trainFreq").val("");
	

});   //end onclick

 

//adding to database
database.ref().on("child_added", function(childSnapshot) {

		console.log(childSnapshot.val());
		//store
		var Name = childSnapshot.val().trainName;
		var Dest = childSnapshot.val().trainDest;
		var Time = childSnapshot.val().trainTime;
		var Freq = childSnapshot.val().trainFreq;

 //		console.log(trainName);
//		console.log(trainDest);
// 		console.log(trainTime);
//		console.log(trainFreq);

	var Freq = parseInt(Freq);

		//current time
		var currentTime = moment().format('x');

		var convertDate = moment(Time,'HH:mm').subtract(1,'years');

		console.log("CONVERT TIME: " +  convertDate);


		//first train time
		var trainTime = moment(convertDate).format("HH:mm");
		console.log("TRAIN TIME : " + trainTime);

		var timeConvert = moment(trainTime,'HH:mm').subtract(1,'years');
		
		//calculate the difference between times
		var difference =  moment().diff(timeConvert,"minutes");

		//time apart
		var trainRemainder = difference % Freq;

		//minutes until the next train
		var minAway = Freq - trainRemainder;

		//the next train time
		var nextTrain = moment().add(minAway, "minutes");

		//adding this info to table 
		$("#tableContent").append(
			"<tr><td #trainName>" + Name + 
			"</td><td>" + Dest + 
			"</td><td>" + Freq + 
			"</td><td>" + moment(nextTrain).format('HH:mm') + "</td><td>" + minAway + 
			"</td></tr>");

});


  
});