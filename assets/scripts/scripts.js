var headerEl = document.querySelector("header");
var mainEl = document.querySelector("main");
var timerEl = document.querySelector(".count-down");
var headingEl;
var subHeadingEl;
var buttonEl;
var timerEl;
var theQuizEl;
var quiz;
var newHighScore;

phaseOne();

function phaseOne() {
    phaseOneHeading();
    phaseOneInstructions();
    phaseOneButton();
}

function phaseTwo() {
    headingEl.remove();
    subHeadingEl.remove();
    buttonEl.remove();
    timerCount = quizTimer.runtime;
    timerEl.textContent = timerCount;
    startTimer();

    askQuestion = 0;
    quizHolder();
    showQuestion();
    showPrompts();

    theQuizEl.addEventListener("click", function (event) {
        var element = event.target;
        // Checks if element is a button
        if (element.matches("button") === true) {
            // Get its data-index value and remove the todo element from the list
            if (element.value != quiz[askQuestion].answer) {
                timerCount = timerCount - 15;
                if (timerCount <= 0) {
                    clearInterval(timer);
                    newHighScore = 0;
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
                clearInterval(timer);
                phaseThree();
            }
        }
    });


}

function phaseThree() {

    removeChildElements(mainEl);

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

function quizHolder() {
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