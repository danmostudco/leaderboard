# GroupMe Leaderboard
A leaderboard application in a highly contentious GroupMe environment where your closest friends battle for honor and prestige.

### Installation for dev work
Just fork the repo and within the root folder run
```sh
$ npm install
$ npm watch
```
This will begin running the webpack-dev-server with Hot Module Replacement. You then need to go to localhost:8000/app.html to view the application. The dev-server currently bundles files into the dist folder as app.bundle.js and vendor.bundle.js. Making adjustments to the React Components will rebundle app.bundle.js.

### What's covered to date
This application currently
  - Goes to Quinn's API and fetches the users using a query parameter to get the number of days
  - Takes that object and converts it to an array that is then set to the state of the App component
  - Iterates over that array and stores the list of objects in the peopleList variable
  - Renders this peopleList within the return statement of aht App component