# 04-Web-APIs-Code-Quiz
## Setup
1. Initialised a Local Repository
2. Created a Remote Repository on Github
3. Pulled Remote Repository from Github

## Development Environment
1. MacOSX Monterey
2. git version 2.37.1 (Apple Git-137.1)
3. VSCode Version: 1.79.0cd .. (Universal)

## Analysis
There are 3 interesting issues with this assignment.
1. Storing replaceable data - questions, answers, maximum time and penalty time
2. Storing persistant data - results
3. Code - html, css & js 

## Issues
1. The .gif file is so small it is difficult to see some things clearly.
2. There is nothing to indicate the size of the screen being used
3. There is nothing to indicate the scale and how it compares to reality
4. There is nothing to say whether the View Highscores link is active while the Quiz is running
5. If the View Highscores link is active during a quiz where does the Go Back button go to? 

The Code Quiz workflow is:
1. Show instructions
2. Run quiz
3. Show results and update high scores
4. Show high scores

Layout could be handled in different ways
1. Separate HTML pages for each phase of the quiz 
2. Separate secions in a single HTML file, displayed or hidden as the quiz progresses by JS
3. Core layout in a single HTML file and everything controlled by JS

## Approach
1. Questions (replaceable data that drives the questions) will stored in a separate js file.
2. High Scores (results) will be stored in local storage. Data is not transferrable and can only be used on the hos browser on the host computer. 
3. File structure will be:
    * index.html - core HTML
    * style.css - css styling
    * quiz.js -quiz data 
    * scripts.js - add/remove html as required, present and control the quiz and manage results 

I'll use this Challenge to better understand using the DOM. I'll use JS to add/remove the HTML as the quiz progresses as practice.

## Process
1. Created folder structure & empty files
2. Created quiz.js to hold questions and runtime timers
3. created base css in style.css
4. started building js control code
5. phaseOne completed
6. phaseTwo core started
7. phaseThree function defined
8. added countdown timer for quiz
9. added click event to change multi-choice answers 
10. styled phaseTwo panel
11. created function to remove all child elements of a parent
12. added check if question answered & aply penalty if wrong
13. added code to stop timer when all answers are correct, all answers are wrong or time has run out
14. added phaseThree heading and score message
15. styled phaseThree heading and score message
16. added and styled input field and submit button - force uppercase and maximum 3 characters
17. add function to force initials to upper case
18. styled buttons for hover on mouse-over
19. added code to use local storage to save and retrieve league table data
20. added algorithm to arrange scores in descending order
    * I tried to use splice but couldn't get it to work with the 2D array I'm using
    * Instead the code loops through the leagueTable & inserts the new sore as soon as its higher than the one its compared too. The code handles lowest and highest new scores too. This tiny bit has been the hardest to solve 
21. added code to display high score and added Go Back and Clear High Score buttons    
22 styled high score buttons
23. added code to display Correct or Wrong after answer is submitted
24. added issues resulting from using a tiny .gif as the only guide to the project
25. added timer to control how long the result msg is displayed
26. replaced procedural sort code I wrote with .sort method with compare so sort Highscores
27. updated phaseTwo to stop multiple events and abort the controlled when all questions asked
28. styled Results Msg and HR and updated comments
29. added media query so page works on a phone
30. added styling to buttons
31. added Enter Key event listener to initials submit button
32. Testing showed if user started the quiz, viwed high scores and restarted the quiz the quiz would jump 2 questions.
The Abort Controller didn't handle this situation and would not be made to.
33. Replace the Abort Controller with removeEventLeistener method and created a separate function for event handling
34. Changed addeventListeners to onclick events for all buttons except quiz prompts to reduce number of listeners
34. Tested - OK! The removeEventListener method resolved the problem
35. Highscores page was showing View Highscores link & Timer - removed and updated element creation flow
36. adjusted highscores css







