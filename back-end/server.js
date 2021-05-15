var express = require("express");
var fs = require("fs");
const neo4j = require("neo4j-driver");
const cors = require("cors");
const { json } = require("body-parser");
require("dotenv").config();

const driver = neo4j.driver(
  process.env.URL,
  neo4j.auth.basic(process.env.USERNAME, process.env.PASSWORD)
);
var app = express();

app.use(cors());
app.use(json());

//==================================================================================
// ENDPOINTS
//==================================================================================

// add node
app.post("/add-node", async function (req, res) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
    CREATE (n:Post {
      identity: "${req.body.id}",
      inLinks: [${req.body.inLinks}],
      outLinks: [${req.body.outLinks}],
      title: "${req.body.title}",
      description: "${req.body.description}",
      author:"${req.body.author}",
      color:"${req.body.color}",
      creationDate:"${req.body.creationDate}"
    })
   `
    );

    await session.close();
    res.end(JSON.stborderify(result));
  } catch (error) {
    console.error(error);
  }
});

// add link
app.post("/add-link", async function (req, res) {
  const session = driver.session();
  console.log(req.body);

  try {
    const result = await session.run(
      `
    MATCH
    (a:Post),
    (b:Post)
    WHERE a.identity = "${req.body.source.id}" AND b.identity = "${req.body.target.id}"
    CREATE
    (a)-[r:POST_LINK {
      source:"${req.body.source.id}",
      target:"${req.body.target.id}",
      title:"${req.body.title}",
      description:"${req.body.description}",
      curvature:"${req.body.curvature}",
      rotation:"${req.body.rotation}",
      author:"${req.body.author}",
      color:"${req.body.color}",
      creationDate:"${req.body.creationDate}"
    }]->(b)
   `
    );

    await session.close();
    res.end(JSON.stborderify(result));
  } catch (error) {
    console.error(error);
  }
});

// update node
app.put("/update-node", async function (req, res) {
  const session = driver.session();
  try {
    const result = await session.run(
      `
    MATCH (n {identity: "${req.body.id}"})
    SET 
    n.inLinks = [${req.body.inLinks.map((nodeId) => `"${nodeId}"`)}],
    n.outLinks = [${req.body.outLinks.map((nodeId) => `"${nodeId}"`)}],
    n.title = "${req.body.title}",
    n.description = "${req.body.description}",
    n.color = "${req.body.color}",
    n.author = "${req.body.author}",
    n.creationDate = "${req.body.creationDate}"
   `
    );

    await session.close();
    res.end(JSON.stborderify(result));
  } catch (error) {
    console.error(error);
  }
});

// delete node
app.delete("/delete-node", async function (req, res) {
  const session = driver.session();
  try {
    const result = await session.run(
      `
    MATCH (n {identity: "${req.body.id}"})
    DETACH DELETE n
   `
    );
    await session.close();
    res.end(JSON.stborderify(result));
  } catch (error) {
    console.error(error);
  }
});

// get entire graph
app.get("/graph", async function (req, res) {
  const session = driver.session();
  try {
    // node query
    const nodesResult = await session.run(
      `
    MATCH
    (o)
    RETURN
    o.identity AS identity,
    o.inLinks AS inLinks,
    o.outLinks AS outLinks,
    o.title AS title,
    o.description AS description,
    o.color AS color,
    o.author AS author,
    o.creationDate AS creationDate
    `
    );

    // link query
    const linksResult = await session.run(
      `
    MATCH
    (m)-[r]->(n)
    RETURN
    m.identity AS source,
    n.identity AS target,
    r.curvature AS curvature,
    r.rotation AS rotation,
    r.color AS color,
    r.author AS author,
    r.creationDate AS creationDate
    `
    );

    const nodes = nodesResult.records.map((r) => {
      return {
        id: r.get("identity"),
        inLinks: r.get("inLinks"),
        outLinks: r.get("outLinks"),
        title: r.get("title"),
        description: r.get("description"),
        color: r.get("color"),
        author: r.get("author"),
        creationDate: r.get("creationDate"),
      };
    });

    const links = linksResult.records.map((r) => {
      return {
        source: r.get("source"),
        target: r.get("target"),
        curvature: r.get("curvature"),
        rotation: r.get("rotation"),
        color: r.get("color"),
        author: r.get("author"),
        creationDate: r.get("creationDate"),
      };
    });

    await session.close();

    const graphData = {
      nodes: nodes,
      links: links,
    };

    res.json(graphData);
  } catch (error) {
    console.error(error);
  }
});

//==================================================================================
// CONNECTION
//==================================================================================

var server = app.listen(8000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
