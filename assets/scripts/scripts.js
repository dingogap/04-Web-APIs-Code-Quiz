// Globals
var bodyEl;
var headerEl;
var highScoresEl;
var headerDivEl;
var timerEl;
var mainEl;
var theQuizEl;
var rightOrWrong;
var leagueTable;
var countdownTimer;
var msgTimer;

var newHighScore = 0;
var currentPhase = "prolog";
var quizScores = "quizScores";

init();

function init() {

    buildHeader()
    // Create Countdown Timer
    quizCountDownTimer()

    // Create main element
    buildFramework()

    alreadyRunning = false;
    // Start the Quiz
    phaseOne();
}

function phaseOne() {
    // Show the Quiz Instructions
    currentPhase = "phaseOne";
    removeChildElements(theQuizEl);
    phaseOneHeading();
    phaseOneInstructions();
    phaseOneButton();
}

function phaseTwo() {
    // Run the Quiz
    // Uses a Click Event to record the answer and move on to the next question
    // Prevents a very fast click sequence by ignoring extra clicks before the question is answered
    // Removes the click event when all questions have been answered to prevent the event handler asking a nonexistant question
    // This also prevents 2 event handlers running if the user starts the quiz & views highscores and restarts the quiz
    currentPhase = "phaseTwo";
    removeChildElements(theQuizEl);
    timerCount = quizTimer.runtime;
    timerEl.textContent = timerCount;
    askQuestion = 0;
    // Show the first Question and Prompts
    startTimer();
    showHeading(quiz[askQuestion].question);
    showPrompts();
    // Click controls - makes sure there is only 1 event handler
    if (alreadyRunning === false) {
        theQuizEl.addEventListener("click", quizHandler);
    }
}

function quizHandler(event) {
    // checks quiz answers and then goes on to the next question
    var element = event.target;
    // Checks if element is a button
    if (element.classList.contains("prompt")) {
        if (alreadyRunning === false) {
            alreadyRunning = true;
            if (askQuestion < quiz.length) {
                if (element.value === quiz[askQuestion].answer) {
                    rightOrWrong = "Correct!";
                } else {
                    rightOrWrong = "Wrong!";
                    timerCount = timerCount - quizTimer.penalty;
                }
                // If a question has been answered quickly reset the msg timer so only 1 runs at a time
                if (msgTimer != null) {
                    clearInterval(msgtimer);
                }
                // Display the result forom the previous question
                MsgTimer(quizTimer.message);
                askQuestion++;
                if (askQuestion >= quiz.length) {
                    theQuizEl.removeEventListener("click", quizHandler)
                    goToPhaseThree();
                } else {
                    // Display the next question
                    while (theQuizEl.firstChild) {
                        theQuizEl.removeChild(theQuizEl.firstChild);
                    }
                    showHeading(quiz[askQuestion].question);
                    showPrompts();
                }
            } else {
                goToPhaseThree();
            }
        }
        alreadyRunning = false;
    }
}





function goToPhaseThree() {
    newHighScore = timerCount;
    timerEl.textContent = timerCount;
    clearInterval(countdownTimer);
    phaseThree();
}

function phaseThree() {
    // Record the Quiz Result
    currentPhase = "phaseThree";
    removeChildElements(theQuizEl);
    leagueTable = readLeagueTable();
    showHeading("All done!");
    showResult();
    inputInitials();
    showRightOrWrong();
}

function phaseFour() {
    // Show the Highscores 
    currentPhase = "phaseFour";
    removeChildElements(theQuizEl);
    removeChildElements(headerEl);
    leagueTable = readLeagueTable();
    showHeading("Highscores");
    timerEl.textContent = "";
    showHighScores();
    subHeadingEl.classList.add("hs-page");
    showHSButtons();
}

function buildHeader() {
    // Builds the framework for the Quiz
    bodyEl = document.querySelector("body");
    // Create header element
    headerEl = document.createElement("header");
    bodyEl.prepend(headerEl);
    // Create View Highscores link
    fillHeader();
}

function fillHeader() {
    highScoresEl = document.createElement("span");
    highScoresEl.setAttribute("id", "highscores");
    highScoresEl.textContent = "View HighScores";
    highScoresEl.onclick = function () { phaseFour() };
    headerEl.append(highScoresEl);
}

function quizCountDownTimer() {
    var headerDivEl = document.createElement("div");
    headerDivEl.textContent = "Time: ";
    headerEl.append(headerDivEl);
    timerEl = document.createElement("span");
    timerEl.classList.add("count-down");
    /* timerEl.textContent = newHighScore; */
    timerEl.textContent = 0;
    headerDivEl.append(timerEl);
}

function buildFramework() {
    mainEl = document.createElement("main");
    headerEl.insertAdjacentElement("afterend", mainEl);

    theQuizEl = document.createElement("div");
    theQuizEl.classList.add("framework");
    mainEl.append(theQuizEl);
}

function removeChildElements(targetEl) {
    // Delete old elements to make space for new ones
    while (targetEl.firstChild) {
        targetEl.removeChild(targetEl.firstChild);
    }
}
function phaseOneHeading() {
    headingEl = document.createElement("h1");
    headingEl.textContent = "Coding Quiz Challenge";
    theQuizEl.append(headingEl);
}

function phaseOneInstructions() {
    // Show Quiz Instructions
    subHeadingEl = document.createElement("h3");
    subHeadingEl.classList.add("instructions");
    subHeadingEl.textContent =
        "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalise your score/time by ten seconds!";
    theQuizEl.append(subHeadingEl);
}

function phaseOneButton() {
    buttonEl = document.createElement("button");
    buttonEl.classList.add("start-button");
    buttonEl.classList.add("mouse-over");
    buttonEl.textContent = "Start Quiz";
    buttonEl.onclick = function () { phaseTwo() };
    theQuizEl.append(buttonEl);
}

function startTimer() {
    // Start the Quiz Countdown Timier
    countdownTimer = setInterval(function () {
        timerEl.textContent = timerCount;
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
            newHighScore = 0;
            clearInterval(countdownTimer);
            phaseThree();
        }
    }, 1000);
}

function showHeading(heading) {
    // Show Headings or Questions in phaseTwo
    subHeadingEl = document.createElement("h2");
    subHeadingEl.classList.add("results");
    subHeadingEl.textContent = heading;
    theQuizEl.append(subHeadingEl);
}

function showPrompts() {
    // Show Possible Answers
    for (var i = 0; i < quiz[askQuestion].prompts.length; i++) {
        buttonEl = document.createElement("button");
        buttonEl.classList.add("prompt");
        buttonEl.classList.add("mouse-over");
        buttonEl.setAttribute("value", quiz[askQuestion].prompts[i]);
        buttonEl.textContent = i + 1 + ". " + quiz[askQuestion].prompts[i];
        theQuizEl.append(buttonEl);
    }
    // No result can be shown until after the 1st queston has been answered
    if (askQuestion > 0) {
        showRightOrWrong();
    }
}

function showRightOrWrong() {
    // Show the result from the provious question
    messageEl = document.createElement("div");
    messageEl.classList.add("message");
    theQuizEl.append(messageEl);
    answerBreaKEl = document.createElement("hr");
    messageEl.append(answerBreaKEl);
    answerEl = document.createElement("p");
    answerEl.classList.add("right-wrong");
    messageEl.append(answerEl);
    answerEl.textContent = rightOrWrong;
}

function MsgTimer(msgDisplayTime) {
    // Display the result message for a period & then remove
    msgtimer = setInterval(function () {
        msgDisplayTime--;
        if (msgDisplayTime <= 0) {
            clearInterval(msgtimer);
            removeChildElements(messageEl);
        }
    }, 1000);
}

function readLeagueTable() {
    // Reads highscores from local storage
    return JSON.parse(localStorage.getItem(quizScores));
}

function showResult() {
    // Show the final score when all questions have been answered
    yourScoreEl = document.createElement("p");
    yourScoreEl.textContent = "Your score is " + newHighScore + ".";
    theQuizEl.append(yourScoreEl);
}

function inputInitials() {
    // Ask for Initals (upper case, limited to 3)
    yourScoreEl = document.createElement("p");
    yourScoreEl.textContent = "Enter initials: ";
    theQuizEl.append(yourScoreEl);
    // Create Input Field for initials
    inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "results");
    inputEl.setAttribute("class", "initials");
    inputEl.setAttribute("maxlength", "3");
    inputEl.setAttribute("onkeyup", "checkValidInput()");
    yourScoreEl.append(inputEl);
    // Make sure the results field has focus quick entry
    // and so the Enter Key event listener works
    document.getElementById("results").focus();
    // Create Submit button
    buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "submit");
    buttonEl.setAttribute("class", "results-button");
    buttonEl.classList.add("mouse-over");
    buttonEl.textContent = "Submit";
    yourScoreEl.append(buttonEl);
    // Event Listener for Click
    buttonEl.addEventListener("click", function (event) {
        var element = event.target;
        // Checks if element is a button
        if (element.matches("button") === true) {
            if (inputEl.value === "") {
                window.alert("Please enter you initials to continue");
            } else {
                updateHighScores();
                timerEl.textContent = 0;
                phaseFour();
            }
        }
    });
    // Event Listener for Enter Key
    var pressEnter = document.getElementById("results");
    pressEnter.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("submit").click();
        }
    });

}

function updateHighScores() {
    // Update high scores & save to local storage
    // The newest score array is pushed onto the array of scores
    // The array is sorted numerically via the sort method and the compare function.
    // The compare function checks the values of the the 1st element which holds the scores
    if (leagueTable === null) {
        leagueTable = [[newHighScore, inputEl.value.toUpperCase()]];
    } else {
        leagueTable.push([newHighScore, inputEl.value.toUpperCase()]);
        leagueTable.sort(function (a, b) {
            return a[0] - b[0];
        });
    }
    localStorage.setItem(quizScores, JSON.stringify(leagueTable));
}

function checkValidInput(initialCounter) {
    // Check to see the last character was alphabetic
    // Convert lowercase alpha to uppercase
    // Ignore non-alphas

    var lowercase = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ];
    var uppercase = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    ];
    let char = document.getElementById("results");
    initialPosition = char.value.length - 1;
    initial = char.value.charAt(initialPosition);

    // If NOT uppercase check if lowercase
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

function showHighScores() {
    // List the high scores sorted from high to low
    // Scores are sorted as they are entered
    // Scores are read froom local storage as required
    if (countdownTimer != null) {
        clearInterval(countdownTimer);
    }

    leagueTable = JSON.parse(localStorage.getItem(quizScores));
    if (leagueTable != null) {
        scoreListEl = document.createElement("ol");
        scoreListEl.setAttribute("id", "score-list");
        theQuizEl.append(scoreListEl);
        for (let i = leagueTable.length - 1; i > -1; i--) {
            scoreListItemEl = document.createElement("li");
            scoreListItemEl.textContent = [
                leagueTable[i][1] + " - " + leagueTable[i][0],
            ];
            scoreListEl.append(scoreListItemEl);
        }
    }
}

function showHSButtons() {
    // Show the Go Back & Clear Highscores Button
    scoreListDiv = document.createElement("div");
    scoreListDiv.setAttribute("id", "hs-button-holder");
    theQuizEl.append(scoreListDiv);
    //Go Back button
    buttonEl = document.createElement("button");
    buttonEl.classList.add("hs-button");
    buttonEl.classList.add("mouse-over");
    buttonEl.textContent = "Go Back";
    buttonEl.onclick = function () { goBack() };
    /* buttonEl.addEventListener("click", phaseOne); */
    scoreListDiv.append(buttonEl);
    // Clear Highscores button
    buttonEl = document.createElement("button");
    buttonEl.classList.add("hs-button");
    buttonEl.classList.add("mouse-over");
    buttonEl.textContent = "Clear Highscores";
    buttonEl.onclick = function () { clearHighScores() };
    /* buttonEl.addEventListener("click", clearHighScores); */
    scoreListDiv.append(buttonEl);
}

function clearHighScores() {
    // Delete Highscores from local storage
    // Clear the leagueTable
    // Clear the Highscores from the page and call the function to show the scores
    localStorage.removeItem(quizScores);
    leagueTable = "";
    removeChildElements(scoreListEl);
    showHighScores();
}

function goBack() {
    fillHeader();
    quizCountDownTimer();
    phaseOne();
}
