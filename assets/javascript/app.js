
var answer;
var time = 5;

setInterval(timeLeft, 1000);

$('.answer').on('click', function() {
  clearInterval(timeLeft);
  answer = $(this).attr('id');
  console.log(answer);
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
