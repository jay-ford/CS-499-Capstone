# Category Two Enhancement – Algorithms and Data Structures

This branch contains the **Category Two Enhancement** completed for my **CS 499 Computer Science Capstone** using the Travlr Getaways full-stack web application originally developed for **CS-465 Full Stack Development with MEAN**.

The purpose of this enhancement was to demonstrate skills in algorithms and data structures by introducing a personalized trip recommendation feature while preserving the application's existing functionality.

---

## Enhancement Overview

For the Category Two enhancement, a **personalized trip recommendation engine** was added to the administrative trip-listing portion of the Travlr Getaways application.

The enhancement allows users to enter travel preferences based on:

- Resort
- Maximum price
- Maximum trip duration

The application evaluates the available trips against the selected preferences and produces recommendations based on how closely each trip matches the user's criteria.

---

## Recommendation Algorithm

The recommendation algorithm processes the user's selected preferences and compares them with the available trip data.

For each trip, the algorithm:

- Evaluates the selected preference criteria
- Determines which criteria match the trip
- Assigns a recommendation score based on those matches
- Records the matching criteria
- Ranks qualifying trips according to their recommendation scores

The results provide users with a structured way to identify trips that best match their selected travel preferences.

---

## Algorithms and Data Structures Improvements

This enhancement demonstrates algorithms and data structures concepts through:

- Development of a recommendation algorithm
- Evaluation and comparison of trip data
- Scoring and ranking of recommendation results
- Use of TypeScript interfaces to organize preference and recommendation data
- Filtering and processing collections of trip objects
- Integration of the recommendation functionality into the existing Angular application
- Preservation of existing trip-management functionality

These changes demonstrate how algorithms and structured data can be used to provide useful functionality within an existing full-stack application.

---

## Technologies Used

- Angular
- TypeScript
- JavaScript
- HTML
- CSS
- Bootstrap
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## CS 499 ePortfolio

This enhancement represents the **Algorithms and Data Structures** category of my CS 499 Computer Science Capstone.

[**Return to the CS 499 Capstone Repository**](https://github.com/jay-ford/CS-499-Capstone)

[**View Category Two in the CS 499 ePortfolio**](https://jay-ford.github.io/CS-499-Capstone/category-two.html)
