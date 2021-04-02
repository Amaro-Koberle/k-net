# The Knowledge Network

![Prototype Screenshot](/readme-images/screenshot.png)

K-net (working title) is a social media web app that puts the relationship between different pieces of content front and center. All posts are rendered in a 3D graph-visualisation, each node and link in the graph represents a post.

## Prototype in Progress

I have barely gotten started with this project, so don't expect much at this point.

You can find a hosted version of the prototype linked below - expect bugs and crashes

### [Live Demo](https://quizzical-edison-523c55.netlify.app/)

## Technologies

This repo is split up into a front-end and a back-end, each is its own npm package with its own dependencies.

### `Front-End`

- ### React Force Graph

  An amazing open source project for visualising 3D graphs.
  You can find the react component version of the project [here](https://github.com/vasturiano/react-force-graph).

- ### React JS

  For the UI

- ### Tailwind CSS

  For styling the UI

- ### Axios
  Promise based HTTP client for the browser and node.js

### `Back-End`

- ### Neo4j

  A graph database

- ### Express
  For the back-end

## Contributing

Contributions are very welcome! Sorry, things are quite messy at this point.
If you would like to help me improve stuff, I'd be very glad to hear any suggestions, whether they come in the form of simple feedback or actual code implementations.
If you like, hit me up via email at amaro@amarokoberle.com or on Discord at Amaro#3864, I'll be very happy to chat about the project.

### Setting Up

Clone the "develop" branch of this repository.
If you don't already have it, download and install [Node.js](https://nodejs.org/en/).
You will want to navigate to the "front-end" directory within the repository and run this command:

```
npm install
```

Run the same command a second time, but this time from the "back-end" directory. This should install all the dependencies for both the front-end and the back-end.

In order to test your code changes locally, you will have to install [Neo4j desktop](https://neo4j.com/download/) as well.

In Neo4j desktop, create a new database.

You will probably want some placeholder data to play around with. Currently, it isn't possible to write to the databse from the front-end (working on it), so you can't build a graph from the front-end that will survive if you reload the page. To be honest, even if you could write from the front-end to the database, you would probably have a hard time building the graph using only the front-end interface since creating links between nodes is still quite buggy (also working on it).

In order to create some dummy data in the Neo4j database, just run the following query (or something similar):

```
// CreateSampleDataset
CREATE (a:Post {inLinks: [2], outLinks: [1,3], title: 'Apple', description: 'Apples can be red.'})
CREATE (b:Post {inLinks: [0], outLinks: [2], title: 'Orange', description: 'Oranges are obviously orange.'})
CREATE (c:Post {inLinks: [1], outLinks: [0], title: 'Banana', description: 'Bananas are yellow.'})
CREATE (d:Post {inLinks: [0], outLinks: [4,4], title: 'Pear', description: 'Pears are usually green'})
CREATE (e:Post {inLinks: [3,3], outLinks: [5], title: 'Blueberry', description: "Blueberries aren’t really blue, but they’re about as blue as any fruit can get, so they’ll have to do."})
CREATE (f:Post {inLinks: [4,5], outLinks: [5], title: 'Plum', description: 'Plums are somewhat purple.'})
CREATE (g:Post {inLinks: [], outLinks: [], title: 'Penis', description: 'I ran out of colors for fruits.'})
CREATE
(a)-[:POST_LINK]->(b),
(b)-[:POST_LINK]->(c),
(c)-[:POST_LINK]->(a),
(a)-[:POST_LINK]->(d),
(d)-[:POST_LINK]->(e),
(d)-[:POST_LINK]->(e),
(e)-[:POST_LINK]->(f),
(f)-[:POST_LINK]->(f)
```

Finally, you will need to create an .env file. The back-end pulls the login data for the database from an .env file which is included in the .gitignore so that people don't get access to the login credentials of my database by cloning the repo.
Navigate to the back-end directory and create a file called ".env", then enter the following content in that file:

```
USERNAME = neo4j
PASSWORD = neo4j
URL = bolt://localhost:7687
```

The values above are the default ones, so you can copy them as is if you haven't customized the login credentials of your database. If you did custimize them, just adjust the .env file accordingly.

### Starting Up

In your terminal, navigate to the back-end directory and execute this command to start the Express server:

```
node server.js
```

Finally, navigate to the front-end directory and execute this command to start the react app:

```
npm start
```

Your browser should automatically open a new tab with the URL "http://localhost:3000/" and you should see the app displaying the graph that you created with Neo4j.

If you get stuck anywhere along the way, hit me up!
