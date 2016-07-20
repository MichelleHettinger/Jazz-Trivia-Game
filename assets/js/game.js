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

var winImageHTML;
var loseImageHTML;


var numRight = 0;
var numWrong = 0;
var numUnanswered = 0;

//answerkey: a, c, d, b, a, c, d, b, c, a

var timer = {

	time:45,

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

		$("#time-remaining").html("Time remaining: " + "<strong>" + timer.time + "</strong>");				//Display time on the html page
		timer.time--;															//Decrease time by 1

		if (timer.time == 0){													//If time reaches zero
			clearInterval(counter);												//Stop the counter
			updateDisplay.outOfTime();											//Display the answer
			numUnanswered++;													//Increase num of unanswered by 1
		}
	},

	betweenRound: function(){													//Need this function to delay time between rounds
		timer.time = 3;															//Change time to just a few seconds
		counter2 = setInterval(timer.betweenCount, 1000); 						//Every second, call the count function

	},
	betweenCount: function(){													//Need this function to delay time between rounds
		timer.time --;

		if (timer.time == 0){													//If time reaches zero
			clearInterval(counter2);											//Stop the counter
			timer.time = 45;													//Return timer to original value
			questionNumber++;													//Increase question number by 1
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
			correctAnswer = currentAnswer4;
		}
	},


	correctGuess: function(){
		$("#current-question").html("Correct!");								//Update message

		updateDisplay.betweenGuesses();											//Update by removing answers	

		$("#the-gifs").html(winImageHTML);										//Updatet with the winning gif and setting timer			
	},

	wrongGuess: function(){
		updateDisplay.convertCorrectAnswerToText(correctAnswer);								//Convert correctAnswer (a numerical value) to the string containing the right answer
		$("#current-question").html("The correct answer was: " + correctAnswer);				//Update with the correct answer as well

		updateDisplay.betweenGuesses();															//Update by removing answers			

		$("#the-gifs").html(loseImageHTML);														//Update with the losing gif
	},

	outOfTime: function(){
		updateDisplay.convertCorrectAnswerToText(correctAnswer);								//Convert correctAnswer (a numerical value) to the string containing the right answer

		$("#time-remaining").html("Time remaining: " + "<strong>" + timer.time + "</strong>");								//Display time on the html page
		$("#time-remaining").append("<p>Out of time!</p>");										//Write a paragraph to the page that says out of time

		$("#current-question").html("The correct answer was: " + correctAnswer);				//Update with the correct answer as well
		$("#the-gifs").html(loseImageHTML);														//Update with the losing gif

		updateDisplay.betweenGuesses();															//Update by removing answers and adding gifs	
	},



	betweenGuesses: function(){
		$("#the-answers").addClass("sr-only");									//Remove answers from page

		timer.betweenRound();													//Set a timer to delay next question
	},

	finalPage: function(){
		$("#the-gifs").remove();												//Remove the last  gif

		//Update with the following:
		$("#answer1").html("Here's how you did.");
		$("#answer2").html("Number Correct: " + numRight);
		$("#answer3").html("Number Wrong: " + numWrong);		
		$("#answer4").html("Number Unanswered: " + numUnanswered);
		$("#the-answers").removeClass("sr-only");								//Make div visible again from page			
	},
}


var questionsAnswers = {

	checkGuess: function(guessedLetter){
		clearInterval(counter);													//Stop the counter

		$("#time-remaining").html("Time remaining: " + "<strong>" + timer.time + "</strong>");				//Display time on the html page

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

		//Assign currentQuestion as well as the current answers and images
			currentQuestion = questionsAndAnswers[questionNumber - 1].question;
			currentAnswer1 = questionsAndAnswers[questionNumber - 1].answers[0];
			currentAnswer2 = questionsAndAnswers[questionNumber - 1].answers[1];
			currentAnswer3 = questionsAndAnswers[questionNumber - 1].answers[2];
			currentAnswer4 = questionsAndAnswers[questionNumber - 1].answers[3];
			correctAnswer = questionsAndAnswers[questionNumber - 1].correctAnswer;
			loseImageHTML = questionsAndAnswers[questionNumber - 1].loseImage;
			winImageHTML = questionsAndAnswers[questionNumber - 1].winImage;			
		},

}

var questionsAndAnswers =
 [
	{
	question: "What city did Jazz emerge from in the early 1900's?",
	answers: ["New Orleans","Memphis","Chicago","New York"],
	correctAnswer: 1,
	loseImage: "<img src='assets/images/q1L.gif' />",
	winImage: "<img src='assets/images/q1W.gif' />",
	},
	{
	question: "What was the name of the most famous jazz club in Harlem?",
	answers: ["The Cotton Club", "Studio 54", "El Morocco", "Cotton Club"],
	correctAnswer: 3,
	loseImage: "<img src='assets/images/q2L.gif' />",
	winImage: "<img src='assets/images/q2W.gif' />",
	},
	{
	question: "At the turn of the 20th century, the term 'jazz' was used interchangably with:",
	answers: ["Swing", "Blues", "Neo Blues", "Rag Time"],
	correctAnswer: 4,
	loseImage: "<img src='assets/images/q3L.gif' />",
	winImage: "<img src='assets/images/q3W.gif' />",	
	},
	{
	question: "What group or artist recorded the first official jazz record?",
	answers: ["Duke Ellington's Orchestra", "The Dixieland Jazz Band", "Jelly Roll Morton", "Joseph King Oliver"],
	correctAnswer: 2,
	loseImage: "<img src='assets/images/q4L.gif' />",
	winImage: "<img src='assets/images/q4W.gif' />",
	},
	{
	question: "Who was known as *the Divine One*, who won an amateur singing contest as a teenager and became a leading jazz vocalist?",
	answers: ["Sarah Vaughan", "Louis Armstrong", "Ella Fitzgerald", "Billie Holiday"],
	correctAnswer: 1,
	loseImage: "<img src='assets/images/q5L.gif' />",
	winImage: "<img src='assets/images/q5W.gif' />",
	},
	{
	question: "In the 1930's, clarinetist Benny Goodman helped popularize what type of jazz?",
	answers: ["Big Band", "Be-Bop", "Swing", "Afro-Latin"],
	correctAnswer: 3,
	loseImage: "<img src='assets/images/q6L.gif' />",
	winImage: "<img src='assets/images/q6W.gif' />",
	},
	{
	question: "What musician did NOT record on the 1959 hit record, *Kind of Blue*?",
	answers: ["Miles Davis", "John Coltrane", "Bill Evans", "Clifford Brown"],
	correctAnswer: 4,
	loseImage: "<img src='assets/images/q7L.gif' />",
	winImage: "<img src='assets/images/q7W.gif' />",
	},
	{
	question: "Which of the following is NOT a Miles Davis album name?",
	answers: ["Bitches Brew", "Blue in Green", "TUTU", "Birth of the Cool"],
	correctAnswer: 2,
	loseImage: "<img src='assets/images/q8L.gif' />",
	winImage: "<img src='assets/images/q8W.gif' />",
	},
	{
	question: "Which of the following is NOT a jazz musician?",
	answers: ["Cannonball Adderly", "John McLaughlin", "Kenny G", "Kenny Garrett"],
	correctAnswer: 3,
	loseImage: "<img src='assets/images/q9L.gif' />",
	winImage: "<img src='assets/images/q9W.gif' />",
	},
	{
	question: "Which jazz musician is responsible for the development of *world music*, which blended jazz with non-western cultural musical styles?",
	answers: ["John McLaughlin", "John Coltrane", "Allan Holdsworth", "Miles Davis"],
	correctAnswer: 1,
	loseImage: "<img src='assets/images/q10L.gif' />",
	winImage: "<img src='assets/images/q10W.jpg' />",
	},
]