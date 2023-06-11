var headerEl = document.querySelector("header");
var highscoresEl = document.querySelector(".highscores");
var mainEl = document.querySelector("main");
var timerEl = document.querySelector(".count-down");
var headingEl;
var subHeadingEl;
var buttonEl;
var timerEl;
var theQuizEl;
var yourScoreEl;
var quiz;
var newHighScore;
var inputEl;
var currentPhase;
var savedScores;
var quizScores="quizScores";

phaseOne();

function phaseOne() {
    currentPhase = "phaseOne";
    leagueTable = JSON.parse(localStorage.getItem(quizScores));

    phaseOneHeading();
    phaseOneInstructions();
    phaseOneButton();
    highscoresEl.addEventListener("click", function (event) {
        var element = event.target;
        if (element.classList.contains("highscores")) {
            phaseFour();
        }

    });

}

function phaseTwo() {
    currentPhase = "phaseTwo";
    headingEl.remove();
    subHeadingEl.remove();
    buttonEl.remove();
    timerCount = quizTimer.runtime;
    timerEl.textContent = timerCount;
    startTimer();

    askQuestion = 0;
    frameWork();
    showQuestion();
    showPrompts();

    theQuizEl.addEventListener("click", function (event) {
        var element = event.target;
        // Checks if element is a button
        if (element.classList.contains("prompt")) {

            if (element.value != quiz[askQuestion].answer) {
                timerCount = timerCount - 15;
                if (timerCount <= 0) {
                    clearInterval(timer);
                    newHighScore = 0;
                    timerEl.textContent = 0;
                    phaseThree();
                }

            }

            while (theQuizEl.firstChild) {
                theQuizEl.removeChild(theQuizEl.firstChild);
            }
            askQuestion++;
            if (askQuestion < quiz.length) {
                showQuestion();
                showPrompts();
            } else {
                if (timerCount > 0) {
                    newHighScore = timerCount;
                    timerEl.textContent = timerCount;
                } else {
                    newHighScore = 0;
                    timerEl.textContent = 0;
                };
                clearInterval(timer);
                phaseThree();
            }
        }
    });


}

function phaseThree() {
    currentPhase = "phaseThree";
    removeChildElements(mainEl);
    frameWork();
    allDone();
}

function phaseFour() {
    currentPhase = "phaseFour";
    removeChildElements(mainEl);
    frameWork();
    console.log("boo");
}

function phaseOneHeading() {
    headingEl = document.createElement("h1");
    headingEl.textContent = "Coding Quiz Challenge"
    mainEl.append(headingEl);
}

function phaseOneInstructions() {
    subHeadingEl = document.createElement("h3");
    subHeadingEl.classList.add("instructions")
    subHeadingEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalise your score/time by ten seconds!"
    mainEl.append(subHeadingEl);
}

function phaseOneButton() {
    buttonEl = document.createElement("button");
    buttonEl.classList.add("start-button");
    buttonEl.classList.add("mouse-over");
    buttonEl.textContent = "Start Quiz"
    buttonEl.addEventListener("click", phaseTwo);
    mainEl.append(buttonEl);
}

function startTimer() {
    timer = setInterval(function () {
        timerEl.textContent = timerCount;
        timerCount--
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            phaseThree();
        }

    }, 1000);
}

function frameWork() {
    theQuizEl = document.createElement("div");
    theQuizEl.classList.add("framework");
    mainEl.append(theQuizEl)

}

function showQuestion() {
    subHeadingEl = document.createElement("h3");
    subHeadingEl.classList.add("questions")
    subHeadingEl.textContent = quiz[askQuestion].question;
    theQuizEl.append(subHeadingEl);
}

function showPrompts() {
    for (var i = 0; i < quiz[askQuestion].prompts.length; i++) {
        buttonEl = document.createElement("button");
        buttonEl.classList.add("prompt");
        buttonEl.classList.add("mouse-over");
        buttonEl.setAttribute('value', quiz[askQuestion].prompts[i]);
        buttonEl.textContent = (i + 1) + ". " + quiz[askQuestion].prompts[i]
        theQuizEl.append(buttonEl);
    }
}
function removeChildElements(targetEl) {
    while (targetEl.firstChild) {
        targetEl.removeChild(targetEl.firstChild);
    }
}
function allDone() {
    showResult()
    inputInitials();
}


function showResult() {
    subHeadingEl = document.createElement("h3");
    subHeadingEl.classList.add("results")
    subHeadingEl.textContent = "All done!";
    theQuizEl.append(subHeadingEl);

    yourScoreEl = document.createElement("p");
    yourScoreEl.textContent = "Your score is " + newHighScore + "."
    theQuizEl.append(yourScoreEl);
}

function inputInitials() {
    yourScoreEl = document.createElement("p");
    yourScoreEl.textContent = "Enter initials: "
    theQuizEl.append(yourScoreEl);

    inputEl = document.createElement("input");
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('id', 'results');
    inputEl.setAttribute('maxlength', '3');
    inputEl.setAttribute('onkeyup', 'checkValidInput()');
    yourScoreEl.append(inputEl);

    buttonEl = document.createElement("button");
    buttonEl.setAttribute('class', 'results-button');
    buttonEl.classList.add('mouse-over');
    buttonEl.textContent = "Submit";
    yourScoreEl.append(buttonEl);

    buttonEl.addEventListener("click", function (event) {
        var element = event.target;
        // Checks if element is a button
        if (element.matches("button") === true) {
            if (inputEl.value === "") {
                window.alert("Please enter you initials to continue");
            } else {
                console.log(inputEl.value);
                updateHighScores();
                phaseFour();
            }
        }
    });
}


function updateHighScores() {
    leagueTable=[[newHighScore, inputEl.value]],
localStorage.setItem(quizScores, JSON.stringify(leagueTable));
    console.log("update scores here");
}

function checkValidInput(initialCounter) {
    // Check to see the last character was alphabetic
    // Convert lowercase alpha to uppercase
    // Ignore non-alphas

    var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",];
    var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];
    let char = document.getElementById("results");
    initialPosition = char.value.length - 1;
    initial = char.value.charAt(initialPosition);

    // If NOT uppecase check if lowercase
    if (!uppercase.includes(initial)) {
        // If lowercase
        if (lowercase.includes(initial)) {
            // Convert to uppercase and append to valid input
            initial = initial.toUpperCase();
            char.value = char.value.substr(0, initialPosition) + initial;
        } else {
            // Remove from input
            char.value = char.value.substr(0, initialPosition);
        }
    }

}