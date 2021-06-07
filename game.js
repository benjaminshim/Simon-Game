var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isExecuted = false;
var level = 0;

$(document).keydown(function() {
  if (isExecuted === false) {
    isExecuted = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  recursiveReplay(0, gamePattern.length);
}

function recursiveReplay(low, high){
    $("#" + gamePattern[low]).animate({opacity: "50%"}, 75).animate({opacity: "100%"}, 75);
    playSound(gamePattern[low]);
    if (low <= high - 1){
       setTimeout(function(){
           recursiveReplay(low + 1, high);
       },300);
    }
}

function playSound(color){
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(level){
  if(userClickedPattern[level] === gamePattern[level]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    var game_over = new Audio("sounds/wrong.mp3");
    game_over.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  isExecuted = false;
  level = 0;
}
