var arr = ["green", "blue", "red", "yellow"];

var sequence =[];
var userClickPattern=[];

var level = 0;
var gameStart = true;

$(document).keydown(function () {
    if(gameStart === true) {
        setTimeout(nextSequence, 300);
        gameStart = false;
    }
});

$(document).click(function () {
    if(gameStart === true) {
        setTimeout(nextSequence, 300);
        gameStart = false;
    }
});

function handleClick(e) {
    var userChosenColor = e.id;
    userClickPattern.push(userChosenColor);
    createSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickPattern.length - 1);
}

$(".btn").click(function() {
    handleClick(this);
});

function checkAnswer(currentLevel) {
    if(sequence[currentLevel] === userClickPattern[currentLevel]) {
        // console.log("success");
        if(userClickPattern.length === sequence.length) {
            // console.log("success");
            setTimeout(nextSequence, 1000);
        }
    } else {
        createSound("wrong");
        // Game Over, Press Any Key to Restart
       
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNum = Math.floor(Math.random()*4);

    var randomColor = arr[randomNum];
    sequence.push(randomColor);
    
    $("."+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    createSound(randomColor);
    
    // console.log(level);
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 200);

}

function createSound(e) {

    var audio = new Audio("sounds/" + e + ".mp3")
    audio.play();
}

function startOver() {
    sequence =[];
    level = 0;
    gameStart = true;
}
