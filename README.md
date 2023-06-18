# 04-Web-APIs-Code-Quiz

## Description
The Code Quiz build and runs a quick multi-choice quiz to test knowledge of JavaScript APIs. The quiz will run for a maimum of 75 seconds. A 10 second time penalty is applied for incorrect answers.

The Quiz itself is quite straight forward and has 4 distinct phases:
1. Provides a brief introduction to the quiz. The quiz is started by clicking the Start Button. High Scores can be viewed by clicking the View Highscores link at the top left of the page
2. Loops through the quiz questions presenting a list of possible answers for each
3. Asks the user to enter their initials and record their score
4. The list of scores, sorted from high to low will be displayed after the user has entered their intials

## Thinking Process & Structure
I've used snippets of JS in websites I've built in the past but not really understood what was happening.

I took this Challenge as an opportunity to to develop my knowledge of the Web APIs and the DOM and decided to use JavaScript to build and run the entire quiz. It would be a chance to do more with JavaScript and explore its functionality and really see how it works.

The entire quiz, including the HTML, is built and constructed in Javascript. I had to do the analysis first to know what would be required and then build the layout in HTML. Once that was done I could work out how to implement the quiz in JavaScript.

This ended up using a lot more of my time than I thought. While my inital analysis was correct I encountered unexpected issues with eventListeners and timers that had to be debugged. I had to change my approach on several occasions to get round problems. I learnt so much about the DOM, eventListeners, onclick events, timers functions and scope.

#### Note:
I wouldn't do this in a real project:
1. code maintenance would be expensive
2. too many opportinuties for error
3. debugging is time consuming 

It was a very useful exercise and I think well worth the time. 

## Data
Quiz questions, promptsandf answers are stored in an object in the separate quiz.js source file. This file also stores the timelengths - quiz duration, penalty time and message display time.

I used a separate file to separate the data from the code so questions and quiz timings could be changed without having to modify the quiz code. Extra questions could be added too.


