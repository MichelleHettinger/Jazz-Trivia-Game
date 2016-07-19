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
		$("#current-question").html(currentQuestion);
		$("#answer1").html("A: " + currentAnswer1);
		$("#answer2").html("B: " + currentAnswer2);
		$("#answer3").html("C: " + currentAnswer3);
		$("#answer4").html("D: " + currentAnswer4);	
	},

	convertCorrectAnswerToText: function(CA){
		if (CA == 1){
			correctAnswer = currentAnswer1;
		}
		else if (CA == 2){
			correctAnswer = currentAnswer2;
		}
		else if (CA == 3){
			correctAnswer = currentAnswer3;
		}
		else if (CA == 4){
			correctAnswer = currentAnswer3;
		}
	},


	correctGuess: function(){
		$("#current-question").html("Correct!");								//Update message

		updateDisplay.betweenGuesses();											//Update by removing answers	

		$("#the-gifs").html("<p>Win</p>");										//Updatet with the winning gif and setting timer			
	},

	wrongGuess: function(){
		updateDisplay.convertCorrectAnswerToText(correctAnswer);								//Convert correctAnswer (a numerical value) to the string containing the right answer
		$("#current-question").html("The correct answer was: " + correctAnswer);				//Update with the correct answer as well

		updateDisplay.betweenGuesses();															//Update by removing answers			

		$("#the-gifs").html("<p>Lose</p>");														//Update with the losing gif
	},

	outOfTime: function(){
		updateDisplay.convertCorrectAnswerToText(correctAnswer);								//Convert correctAnswer (a numerical value) to the string containing the right answer
		
		$("#time-remaining").html("Time remaining: " + timer.time);								//Display time on the html page
		$("#time-remaining").append("<p>Out of time!</p>");										//Write a paragraph to the page that says out of time

		$("#current-question").html("The correct answer was: " + correctAnswer);				//Update with the correct answer as well
		$("#the-gifs").html("<p>Lose</p>");														//Update with the losing gif

		updateDisplay.betweenGuesses();															//Update by removing answers and adding gifs	
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

	q1:"What city did Jazz emerge from in the early 1900's?",
		q1a1: "New Orleans",
		q1a2: "Memphis",
		q1a3: "Chicago",
		q1a4: "New York",
	q2:"What was the name of the most famous jazz club in Harlem??",
		q2a1: "The Cotton Club",
		q2a2: "Studio 54",
		q2a3: "El Morocco",
		q2a4: "Cotton Club",	
	q3:"At the turn of the 20th century, the term *jazz* was used interchangably with:",
		q3a1: "Swing",
		q3a2: "Blues",
		q3a3: "Neo Blues",
		q3a4: "Rag Time",	
	q4:"What group or artist recorded the first official jazz record?",
		q4a1: "Duke Ellington's Orchestra",
		q4a2: "The Dixiland Jazz Band",
		q4a3: "Jelly Roll Morton",
		q4a4: "Joseph King Oliver",	
	q5:"Who was known as *the Divine One*, who won an amateur singing contest as a teenager and became a leading jazz vocalist?",
		q5a1: "Sarah Vaughan",
		q5a2: "Louis Armstrong",
		q5a3: "Ella Fitzgerald",
		q5a4: "Billie Holiday",	
	q6:"In the 1930's, Benny Goodman helped popularize what type of jazz?",
		q6a1: "Big Band",
		q6a2: "Be-Bop",
		q6a3: "Swing",
		q6a4: "Afro-Latin",	
	q7:"What musician did NOT record on the 1959 hit record, *Kind of Blue*?",
		q7a1: "Miles Davis",
		q7a2: "John Coltrane",
		q7a3: "Bill Evans",
		q7a4: "Clifford Brown",	
	q8:"Which of the following is NOT a Miles Davis album name?",
		q8a1: "Bitches Brew",
		q8a2: "Blue in Green",
		q8a3: "TUTU",
		q8a4: "Birth of the Cool",	
	q9:"Which of the following is NOT a jazz musician?",
		q9a1: "Cannonball Adderly",
		q9a2: "John McLaughlin",
		q9a3: "Kenny G",
		q9a4: "Kenny Garrett",		
	q10:"Which jazz musician is responsible for the development of *world music*, which blended jazz with non-western cultural musical styles?",
		q10a1: "John McLaughlin",
		q10a2: "John Coltrane",
		q10a3: "Allan Holdsworth",
		q10a4: "Miles Davis",	
}