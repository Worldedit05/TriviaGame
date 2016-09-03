var answer;
var questionNumber = 0;
var time = 0;
var counter;

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
    if (checkAnswer(answer)) {
        $('#question').html("Correct!");

    } else {
        $('#question').html("Sorry :(");
    }
    questionNumber++;

    setTimeout(nextQuestion, 5 * 1000);

});

function timeLeft() {
    if (time !== 1) {
        time--;
        $('#timer').html('Time Remaining: ' + time);
    } else {
        clearInterval(timeLeft);
        $('#timer').html('Times up!');
    }
}

function start() {
    time = 60;
    counter = setInterval(timeLeft, 1000);
}

function stop() {
    clearInterval(counter);
}

function createQuestion(index) {
    $('#question').html(quiz[index].question);
}

function createChoices(index) {
    var b = $('#multipleChoice');
    b.empty();
    for (var i = 0; i < quiz[index].choices.length; i++) {
        b.append('<li id="' + (i + 1) + '" class="answer">' + quiz[index].choices[i]);
    }
}

function nextQuestion() {
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
        console.log("Correct!")
        return true;
    } else {
        console.log("That was not the right answer :(")
        return false;
    }
}
