// Quiz questions, prompts and answer
var quiz = [
    {
        question: "Commonly used data types DO NOT include:",
        prompts: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if/else statement is enclosed within ______..",
        prompts: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        prompts: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above",
        ],
        answer: "all of the above",
    },
    {
        question:
            "String values must be enclosed within ______ when being assigned to variables.",
        prompts: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        prompts: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log",
    },
];

// Times used for timer
var quizTimer = {
    runtime: 75,
    penalty: 10,
    message: 5
};
