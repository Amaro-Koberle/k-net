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

// ===ENDPOINTS===

// add node
app.post("/add-node", async function (req, res) {
  const session = driver.session();
  const result = await session.run(
    `
    CREATE (n:Post {identity: "${req.body.identity}", inLinks: [${req.body.inLinks}],
      outLinks: [${req.body.outLinks}], title: "${req.body.title}",
      description: "${req.body.description}"})
   `
  );
  await session.close();
  res.end(JSON.stringify(result));
});

// update graph
app.put("/update-graph", async function (req, res) {
  const session = driver.session();

  // update node
  const result = await session.run(
    `
    MATCH (n {identity: "${req.body.identity}"})
    SET n.inLinks = [${req.body.inLinks.map(
      (nodeIdentity) => `'${nodeIdentity}'`
    )}], n.outLinks = [${req.body.outLinks.map(
      (nodeIdentity) => `'${nodeIdentity}'`
    )}], n.title = "${req.body.title}",
    n.description = "${req.body.description}"
   `
  );

  await session.close();
  res.end(JSON.stringify(result));
});

// delete node
app.delete("/delete-node", async function (req, res) {
  const session = driver.session();
  const result = await session.run(
    `
    MATCH (n {identity: "${req.body.identity}"})
    DETACH DELETE n
   `
  );
  await session.close();
  res.end(JSON.stringify(result));
});

// get entire graph
app.get("/graph", async function (req, res) {
  const session = driver.session();
  const nodesResult = await session.run(
    `
    MATCH
    (o)
    RETURN
    o.identity AS identity,
    o.inLinks AS inLinks,
    o.outLinks AS outLinks,
    o.title AS title,
    o.description AS description
    `
  );
  const linksResult = await session.run(
    `
    MATCH
    (m)-->(n)
    RETURN
    m.identity AS source,
    n.identity AS target
    `
  );
  await session.close();

  const nodes = nodesResult.records.map((r) => {
    return {
      identity: r.get("identity"),
      inLinks: r.get("inLinks"),
      outLinks: r.get("outLinks"),
      title: r.get("title"),
      description: r.get("description"),
    };
  });

  const links = linksResult.records.map((r) => {
    return {
      source: r.get("source").toNumber(),
      target: r.get("target").toNumber(),
    };
  });

  const graphData = {
    nodes: nodes,
    links: links,
  };

  res.json(graphData);
});

// connection
var server = app.listen(8000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
