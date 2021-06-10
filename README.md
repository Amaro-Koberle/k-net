# The Knowledge Network

![Prototype Screenshot](/readme-images/screenshot.jpg)

K-net (working title) is a social media web app that puts the relationship between different pieces of content front and center. All posts are rendered in a 3D graph-visualisation, each node and link in the graph represents a post.

## Prototype in Progress

I have barely gotten started with this project, so don't expect much at this point.

<!-- You can find a hosted version of the prototype linked below - expect bugs and crashes

### [Live Demo](https://quizzical-edison-523c55.netlify.app/) -->

## Technologies

This repo is split up into a front-end and a back-end, each is its own npm package with its own dependencies.

### `Front-End`

- ### React Force Graph

  An amazing open source project for visualising 3D graphs.
  You can find the react component version of the project [here](https://github.com/vasturiano/react-force-graph).

- ### React JS

  For the UI

- ### React Icons

  For Icons within the UI

- ### Tailwind CSS

  For styling the UI

- ### Axios

  Promise based HTTP client for the browser and node.js

- ### Firebase
  For user authentication

### `Back-End`

- ### Neo4j

  A graph database

- ### Express
  For the back-end

## Contributing

Contributions are very welcome! Sorry, things are quite messy at this point.
If you would like to help me improve stuff, I'd be very glad to hear any suggestions, whether they come in the form of simple feedback or actual code implementations.
If you like, hit me up via email at amaro@amarokoberle.com or on Discord at Amaro#3864, I'll be very happy to chat about the project.

If you would like to help me solve some of [the issues that I put here on GitHub](https://github.com/Amaro-Koberle/k-net/issues), check out a new branch from "develop" to address the issue, and once you solve it, create a pull request mentioning the issue number in the commit message (eg. "#12").

### Setting Up

Clone the "develop" branch of this repository.
If you don't already have it, download and install [Node.js](https://nodejs.org/en/).
You will want to run the following command to install all the dependencies on both the front-end and the back-end:

```
npm install
```

In order to test your code changes locally, you will have to install [Neo4j desktop](https://neo4j.com/download/) as well.

In Neo4j desktop, create a new database.

Finally, you will need to create an .env file. The back-end pulls the login data for the database from an .env file which is included in the .gitignore so that people don't get access to the login credentials of my database by cloning the repo.
Navigate to the back-end directory and create a file called ".env", then enter the following content in that file:

```
USERNAME = neo4j
PASSWORD = neo4j
URL = bolt://localhost:7687
```

The values above are the default ones. If you changes the login credentials, just adjust the .env file accordingly.

In order for authentication to work, you'll need a [Firebase](https://firebase.google.com/) project. Create an account if you don't already have one, create a new project, navigate to "Authentication", then to "Sign-in method" and enable the "Email/Password" provider.

You will need to create a second .env file, this time in the front-end.

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

Populate the .env file with the corresponding configuration values of your firebase project. You can find by navigating to "Project settings" and scrolling down to "SDK setup and configuration" under the "General" tab.

### Starting Up

In your terminal, navigate to the back-end directory and execute this command to start the Express server:

```
node server.js
```

Finally, navigate to the front-end directory and execute this command to start the react app:

```
npm start
```

Your browser should automatically open a new tab with the URL "http://localhost:3000/" and you should see the app. If everything is working as it should, you should be able to create an account, log in and start creating nodes.

If you get stuck anywhere along the way, hit me up!
