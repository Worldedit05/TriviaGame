var answer;
var counter;
var time = 0;
var questionNumber = -1;
var correct = 0;
var wrong = 0;

var quiz = [{
    question: "This is question #1",
    choices: ["choice1", "choice2", "choice3"],
    rightAnswer: 2
}, {
    question: "This is question #2",
    choices: ["choice1", "choice2", "choice3"],
    rightAnswer: 3
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
        $('#timer').html('Time Remaining: ' + time);
    } else {
        clearInterval(timeLeft);
        $('#timer').html('Times up!');
        stop();
        setTimeout(nextQuestion, 5 * 1000);
    }
}

function start() {
    time = 60;
    counter = setInterval(timeLeft, 1000);
}

function stop() {
    clearInterval(counter);
}

function resetQuestion() {
    setTimeout(nextQuestion, 5 * 1000);
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
        $('#timer').html('Time Remaining: 60');
        start();
    } else {
        $('.game').empty();
        $('.jumbotron').append('<div>Game Over</div>');
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
