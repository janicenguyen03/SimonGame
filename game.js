let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let maxLevel = localStorage.getItem("maxLevel") || 0;

$("h2").text("Max Level: " + maxLevel);

startOver();

function startOver() {
    var keyPressed = false;
    $(document).keypress(function() {
        if (!keyPressed) {
            gamePattern = [];
            level = 0;
            keyPressed = true;
            nextSequence();
        }
    })
}

function playSound(name) {
    var sound = new Audio('sounds/'+ name +'.mp3');
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;

    if (level > maxLevel) {
        maxLevel = level-1;
        localStorage.setItem("maxLevel", maxLevel);
        $("h2").text("Max Level: " + maxLevel);
    }

    $("h1").fadeIn(200).text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log()
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

$(".btn-reset").click(function() {
    gamePattern = [];
    level = 0;
    maxLevel = 0;
    localStorage.setItem("maxLevel", 0);
    $("h1").text("Press Any Key to Start");
    $("h2").text("Max Level: " + maxLevel);

    const button = this;
    button.focus();
    setTimeout(function() { button.blur(); }, 10);
})

function checkAnswer(currentLevel) {
    var gameLen = gamePattern.length;
    if (gameLen > 0 && userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (currentLevel === level - 1) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}