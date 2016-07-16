//When the document is ready, perform this function.
$(document).ready(function(){
	$("#startButton").on("click", function (){
		$("#startButton").remove();
		timer.startRound();
	});
	$("#answer1").on("click", function (){
		currentGuess = 1;
		questionsAnswers.checkGuess(currentGuess);
	});
	$("#answer2").on("click", function (){
		currentGuess = 2;
		questionsAnswers.checkGuess(currentGuess);
	});
	$("#answer3").on("click", function (){
		currentGuess = 3;
		questionsAnswers.checkGuess(currentGuess);
	});
	$("#answer4").on("click", function (){
		currentGuess = 4;
		questionsAnswers.checkGuess(currentGuess);
	});	
})


var questionNumber = 1;
var currentQuestion;

var currentAnswer1;
var currentAnswer2;
var currentAnswer3;
var currentAnswer4;

var currentGuess;
var correctAnswer;

var numRight = 0;
var numWrong = 0;
var numUnanswered = 0;

//answerkey: a, c, d, b, a, c, d, b, c, a

var timer = {

	time:5,

	startRound: function(){
		if (questionNumber != 11){												//If there are still questions to ask
		questionsAnswers.assignQuestion();										//Assign the questions	
		counter = setInterval(timer.count, 1000); 								//Every second, call the count function
		}

		else if (questionNumber == 11){											//If all questions have been asked
			updateDisplay.finalPage();											//Show the final page
		}
	},

	count: function(){
		$("#the-answers").removeClass("sr-only");								//For rounds 2-9, make the div visible again
		$("#the-gifs").html("");												//Replace the gif with emptiness

		updateDisplay.questionAnswers();											//Display the questions and answers

		$("#time-remaining").html("Time remaining: " + timer.time);				//Display time on the html page
		timer.time--;															//Decrease time by 1

		if (timer.time == 0){													//If time reaches zero
			clearInterval(counter);												//Stop the counter
			updateDisplay.outOfTime();											//Display the answer
			numUnanswered++;													//Increase num of unanswered by 1
		}
	},

	betweenRound: function(){													//Need this function to delay time between rounds
		timer.time = 2;															//Change time to just a few seconds
		counter2 = setInterval(timer.betweenCount, 1000); 						//Every second, call the count function

	},
	betweenCount: function(){													//Need this function to delay time between rounds
		timer.time --;

		if (timer.time == 0){													//If time reaches zero
			clearInterval(counter2);											//Stop the counter
			timer.time = 5;														//Return timer to original value
			timer.startRound();													//Start round again
		}

	},	
}


var updateDisplay = {

	questionAnswers: function (){
		$("#current-question").html("Q." + questionNumber + " " + currentQuestion);
		$("#answer1").html("A: " + currentAnswer1);
		$("#answer2").html("B: " + currentAnswer2);
		$("#answer3").html("C: " + currentAnswer3);
		$("#answer4").html("D: " + currentAnswer4);	
	},


	correctGuess: function(){
		$("#current-question").html("Correct!");								//Update with the correct answer as well

		updateDisplay.betweenGuesses();											//Update by removing answers	

		$("#the-gifs").html("<p>Win</p>");										//Updatet with the winning gif and setting timer			
	},

	wrongGuess: function(){
		$("#current-question").html("The correct answer was: " + correctAnswer);		//Update with the correct answer as well

		updateDisplay.betweenGuesses();													//Update by removing answers			

		$("#the-gifs").html("<p>Lose</p>");												//Update with the losing gif
	},

	outOfTime: function(){
		$("#time-remaining").html("Time remaining: " + timer.time);				//Display time on the html page
		$("#time-remaining").append("<p>Out of time!</p>");						//Write a paragraph to the page that says out of time

		$("#current-question").html("The correct answer was: ");				//Update with the correct answer as well
		$("#the-gifs").html("<p>Lose</p>");										//Update with the losing gif

		updateDisplay.betweenGuesses();											//Update by removing answers and adding gifs	
	},

	betweenGuesses: function(){
		$("#the-answers").addClass("sr-only");									//Remove answers from page

		timer.betweenRound();													//Set a timer to delay next question
		questionNumber++;														//Increment the questionNumber by 1	
	},

	finalPage: function(){
		$("#the-gifs").remove();												//Remove the last  gif

		//Update with the following:
		$("#questions").html("<p>Here's how you did.</p>");
		$("#questions").append("<p>Number Correct: " + numRight + "</p");
		$("#questions").append("<p>Number Wrong: " + numWrong + "</p");		
		$("#questions").append("<p>Number Unanswered: " + numUnanswered + "</p");
	},
}


var questionsAnswers = {

	checkGuess: function(guessedLetter){
		clearInterval(counter);														//Stop the counter

		$("#time-remaining").html("Time remaining: " + timer.time);				//Display time on the html page

		if (guessedLetter == correctAnswer){									//If the selected answer matches the correct
			updateDisplay.correctGuess();										//Display
			numRight++;															//Increase num of correct guesses by 1
		}
		else {																	//Otherwise answer is wrong
			updateDisplay.wrongGuess();											//Display
			numWrong++;															//Increase num of wrong guesses by 1
		}
		
	},

	assignQuestion: function (){

		//Assign currentQuestion as well as the current answers
		if (questionNumber == 1){

			currentQuestion = questionsAnswers.q1;
			currentAnswer1 = questionsAnswers.q1a1;
			currentAnswer2 = questionsAnswers.q1a2;
			currentAnswer3 = questionsAnswers.q1a3;
			currentAnswer4 = questionsAnswers.q1a4;
			correctAnswer = 1;
		}
		else if(questionNumber == 2){

			currentQuestion = questionsAnswers.q2;
			currentAnswer1 = questionsAnswers.q2a1;
			currentAnswer2 = questionsAnswers.q2a2;
			currentAnswer3 = questionsAnswers.q2a3;
			currentAnswer4 = questionsAnswers.q2a4;
			correctAnswer = 3;
		}
		else if(questionNumber == 3){

			currentQuestion = questionsAnswers.q3;
			currentAnswer1 = questionsAnswers.q3a1;
			currentAnswer2 = questionsAnswers.q3a2;
			currentAnswer3 = questionsAnswers.q3a3;
			currentAnswer4 = questionsAnswers.q3a4;
			correctAnswer = 4;	
		}
		else if(questionNumber == 4){

			currentQuestion = questionsAnswers.q4;
			currentAnswer1 = questionsAnswers.q4a1;
			currentAnswer2 = questionsAnswers.q4a2;
			currentAnswer3 = questionsAnswers.q4a3;
			currentAnswer4 = questionsAnswers.q4a4;
			correctAnswer = 2;
		}
		else if(questionNumber == 5){
			currentQuestion = questionsAnswers.q5;
			currentAnswer1 = questionsAnswers.q5a1;
			currentAnswer2 = questionsAnswers.q5a2;
			currentAnswer3 = questionsAnswers.q5a3;
			currentAnswer4 = questionsAnswers.q5a4;
			correctAnswer = 1;
		}
		else if(timer.questionNumber == 6){

			currentQuestion = questionsAnswers.q6;
			currentAnswer1 = questionsAnswers.q6a1;
			currentAnswer2 = questionsAnswers.q6a2;
			currentAnswer3 = questionsAnswers.q6a3;
			currentAnswer4 = questionsAnswers.q6a4;
			correctAnswer = 3;
		}
		else if(questionNumber == 7){

			currentQuestion = questionsAnswers.q7;
			currentAnswer1 = questionsAnswers.q7a1;
			currentAnswer2 = questionsAnswers.q7a2;
			currentAnswer3 = questionsAnswers.q7a3;
			currentAnswer4 = questionsAnswers.q7a4;
			correctAnswer = 4;	
		}
		else if(questionNumber == 8){

			currentQuestion = questionsAnswers.q8;
			currentAnswer1 = questionsAnswers.q8a1;
			currentAnswer2 = questionsAnswers.q8a2;
			currentAnswer3 = questionsAnswers.q8a3;
			currentAnswer4 = questionsAnswers.q8a4;
			correctAnswer = 2;	
		}
		else if(questionNumber == 9){

			currentQuestion = questionsAnswers.q9;
			currentAnswer1 = questionsAnswers.q9a1;
			currentAnswer2 = questionsAnswers.q9a2;
			currentAnswer3 = questionsAnswers.q9a3;
			currentAnswer4 = questionsAnswers.q9a4;
			correctAnswer = 3;
		}
		else if(questionNumber == 10){

			currentQuestion = questionsAnswers.q10;
			currentAnswer1 = questionsAnswers.q10a1;
			currentAnswer2 = questionsAnswers.q10a2;
			currentAnswer3 = questionsAnswers.q10a3;
			currentAnswer4 = questionsAnswers.q10a4;
			correctAnswer = 1;	
		}
	},

	q1:"Alaaaaaaaaaaaaaaaaaaaaah? blah? blah? blah? blah? blah? blah? blah?",
		q1a1: "doot doot doot doot doot doot",
		q1a2: "doot doot doot doot doot doot",
		q1a3: "doot doot doot doot doot doot",
		q1a4: "doot doot doot doot doot doot",
	q2:"Bbbbbbbbbbbbah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q2a1: "boot doot doot doot doot doot",
		q2a2: "boot doot doot doot doot doot",
		q2a3: "bbbbot doot doot doot doot doot",
		q2a4: "bbbt doot doot doot doot doot",	
	q3:"ccccccccccclah blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q3a1: "ccccccdoot doot doot doot doot",
		q3a2: "ccccccdoot doot doot doot doot",
		q3a3: "ccccc doot doot doot doot doot",
		q3a4: "cccccdoot doot doot doot doot",	
	q4:"dddddddddddddddddh blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q4a1: "dddddddt doot doot doot doot",
		q4a2: "dddddddt doot doot doot doot",
		q4a3: "dddd doot doot doot doot",
		q4a4: "dddddoot doot doot doot",	
	q5:"eeeeeeeeeeeeeelah blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q5a1: "eeeeeedoot doot doot doot doot",
		q5a2: "eeeee doot doot doot doot doot",
		q5a3: "eeee doot doot doot doot doot",
		q5a4: "eeee doot doot doot doot doot",	
	q6:"ffffffffffffh blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q6a1: "fffff doot doot doot doot doot",
		q6a2: "doffffot doot doot doot doot doot",
		q6a3: "ffff doot doot doot doot doot",
		q6a4: "fffff doot doot doot doot doot",	
	q7:"gggggggggggglah blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q7a1: "gggg doot doot doot doot doot",
		q7a2: "gggg doot doot doot doot doot",
		q7a3: "gggg doot doot doot doot doot",
		q7a4: "gggg doot doot doot doot doot",	
	q8:"hhhhhhhhhhhhhh blah blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q8a1: "hhhhhh doot doot doot doot doot",
		q8a2: "hhhhhh doot doot doot doot doot",
		q8a3: "hhhhhh doot doot doot doot doot",
		q8a4: "hhhhh doot doot doot doot doot",	
	q9:"iiiiiii blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q9a1: "iiiiii doot doot doot doot doot",
		q9a2: "iiiiii doot doot doot doot doot",
		q9a3: "iiiii doot doot doot doot doot",
		q9a4: "iiiii doot doot doot doot doot",		
	q10:"jjjjjjjjjjjjjjjjblah blah? blah? blah? blah? blah? blah? blah? blah? blah?",
		q10a1: "jjjjj doot doot doot doot doot",
		q10a2: "jjjjj doot doot doot doot doot",
		q10a3: "jjjjj doot doot doot doot doot",
		q10a4: "jjjjj doot doot doot doot doot",	
}