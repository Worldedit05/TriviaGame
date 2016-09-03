var answer;
var counter;
var time = 0;
var questionNumber = -1;
var correct = 0;
var wrong = 0;

//TODO: Write in some comments

var quiz = [{
    question: "Nintendo started as a company originally selling cards?",
    choices: ["True", "False"],
    rightAnswer: 1
}, {
    question: "Nintendo's now famous character, Mario, started first appeared in what game?",
    choices: ["Super Mario Brothers", "Donkey Kong", "Punch Out"],
    rightAnswer: 2
}, {
    question: "This is question #3",
    choices: ["choice1", "choice2", "choice3"],
    rightAnswer: 1
}]

nextQuestion();

$(document).on('click', '.answer', function() {
    clearInterval(timeLeft);
    stop();
    answer = $(this).attr('id');
    var correctAnswer = quiz[questionNumber].rightAnswer - 1;

    if (checkAnswer(answer)) {
        $('#question').html(quiz[questionNumber].choices[correctAnswer] + " is correct!");
        correct++;
    } else {
        $('#question').html("Sorry that was incorrect. The correct answer was: " + quiz[questionNumber].choices[correctAnswer]);
        wrong++;
    }

    resetQuestion();

});

function timeLeft() {
    if (time !== 1) {
        time--;
        $('#timer').html('Time Remaining: ' + time + ' seconds');
    } else {
        clearInterval(timeLeft);
        $('#timer').html('Times up!');
        stop();
        setTimeout(nextQuestion, 1 * 1000);
    }
}

function start() {
    time = 45;
    counter = setInterval(timeLeft, 1000);
}

function stop() {
    clearInterval(counter);
}

function resetQuestion() {
    setTimeout(nextQuestion, 3 * 1000);
}

function createQuestion(index) {
    $('#question').html(quiz[index].question);
}

function createChoices(index) {
    var choiceElements = $('#multipleChoice');
    choiceElements.empty();
    for (var i = 0; i < quiz[index].choices.length; i++) {
        choiceElements.append('<li id="' + (i + 1) + '" class="answer">' + quiz[index].choices[i]);
    }
}

function nextQuestion() {
    questionNumber++;

    if (questionNumber < quiz.length) {
        var nextQuestion = createQuestion(questionNumber);
        var nextChoiceSet = createChoices(questionNumber);
        $('#timer').html('Time Remaining: 45 seconds');
        start();
    } else {
        $('.game').empty();
        var display = $('.jumbotron')
        display.append('<h2 class="title">Game Over!</h2>').append('<h3 class="title">Here is your score: </h3>').append('<ul class="game" id="score"></ul>')
        $('#score').append('<li id="right">Correct answers: ' + correct + '</li>').append('<li id="right">Wrong answers: ' + wrong + '</li>');
    }
    clearTimeout(nextQuestion);
}

function checkAnswer(userAnswer) {
    if (userAnswer == quiz[questionNumber].rightAnswer) {
        return true;
    } else {
        return false;
    }
}
