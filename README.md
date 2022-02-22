# Vue Trivia Game using Vue.js
An online trivia game as a Single Page Application (SPA) using the Vue.js Framework (version 3).

## Description
This is a simple trivia game using questions from https://opentdb.com/api_config.php to generate an API and fetch data. The Trivia Game is divided into three sections: Start Screen, Questions and Results. 

### **The Start Screen**
This page provides the user with some options to choose from. The app starts on this screen and captures a **username** using an input. The user can also select from options like:
  * **Amount** - Defines the amount of trivia questions the user would like to have
  * **Category** - User can choose from "Comics", "Films" and "Video Games". The questions will be based on the category chosen.
  * **Difficulty** - User can choose from "Easy", "Medium" and "Hard". The questions difficulty gets set based on the difficulty chosen.

### **Questions** 
This page provides the user with trivia questions with the included options from the previous page. The app fetches the questions from the Trivia API setup in the previous page. On multiple choise there are displayed four buttons for each answer, and true/false on boolean questions. A user can see the correct/true answer by the background color (red for false, green for true). On answering the final question, the user will be navigated to the results page.

### **Results**
This page shows the users selected values along with the questions and the correct answer. Here you are also able to see the high score from your previous attempts that are already saved in the Trivia API. There are two buttons located here:
  * **Retry** - User gets routed back to the questions page and is able to retake the quiz with the same difficulty and category.
  * **Back to start** - takes the user back to the start screen. 

## Tools
* Visual Studio Code
* Vite CLi
* Node.js
* Vue Dev Tools (Browser Dev Tools)
* Trivia Rest API: https://opentdb.com/api_config.php
* Heroku

## Author and Developers
* Ammar Ahmed
* Jasotharan Cyril
