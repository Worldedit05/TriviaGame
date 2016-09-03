
var answer;
var questionNumber = 0;
var time = 60;

var quiz = [{
      question: "This is question #1",
      choices: ["choice1", "choice2","choice3"],
      rightAnswer: 2
             }]

var timer = setInterval(timeLeft, 1000);

nextQuestion();

$('.answer').on('click', function() {
  clearInterval(timeLeft);
  answer = $(this).attr('id');
  if (checkAnswer(answer)) {
    $('#question').html("Correct!");
  }else {
    $('#question').html("Sorry :(");
  }
  clearInterval(timer);
});

function timeLeft() {
  if (time !== 1){
    time--;
    $('#timer').html('Time Remaining: ' + time);
  }else {
    clearInterval(timeLeft);
    $('#timer').html('Times up!');
  }
}
function createQuestion(index) {
  $('#question').html(quiz[index].question);
}
function createChoices(index) {
  for ( var i = 0; i < quiz[index].choices.length; i++ ) {
    $('#multipleChoice').append('<li id="' + (i + 1) +'" class="answer">' + quiz[index].choices[i]);
  }
}
function nextQuestion() {
  if (questionNumber < quiz.length) {
    var nextQuestion = createQuestion(questionNumber);
    var nextChoiceSet = createChoices(questionNumber);
  }
}
// TODO: answer checking function
function checkAnswer(userAnswer) {
  if (userAnswer == quiz[questionNumber].rightAnswer) {
    console.log("Correct!")
    return true;
  }else {
    console.log("That was not the right answer :(")
    return false;
  }
}
