var gamePattern=[];
var userChosenColour;
var userClickedPattern=[];
var buttonColors= ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keydown(function(){
    if(!started){

        $("#level-title").text("Level " +level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){

    userClickedPattern = [];

    level++; 
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
    playSound(userChosenColour);
}

$(".btn").click(function(){
   
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function playSound(name){
    var audio = new Audio("sounds/" +name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
     $("#" +currentColor).addClass("pressed");

        setTimeout(function(){
            $("#" +currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    started = false;
    gamePattern=[];
    level = 0;
}