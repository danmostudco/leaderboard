## Table of Contents
Attempt with create-react-app

# GroupMe Leaderboard
A leaderboard application in a highly contentious GroupMe environment where your closest friends battle for honor and prestige. This is a rehash of a previous project, moving the build system into create-react-app for easier deployment.

### What's covered to date
This application currently
  - Goes to Quinn's API and fetches the users using a query parameter to get the number of days
  - Takes that object and converts it to an array that is then set to the state of the App component
  - Iterates over that array and stores the list of objects in the peopleList variable
  - Renders this peopleList within the return statement of the App component