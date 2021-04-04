var express = require("express");
var fs = require("fs");
const neo4j = require("neo4j-driver");
const cors = require("cors");
require("dotenv").config();

const driver = neo4j.driver(
  process.env.URL,
  neo4j.auth.basic(process.env.USERNAME, process.env.PASSWORD)
);
var app = express();

app.use(cors());

<<<<<<< HEAD
app.post("/add-node", async function (req, res) {
  req.body;
  console.log(body);
  const session = driver.session();
  const result = await session.run(
    `
    CREATE (a:Post {inLinks: [], 
      outLinks: [], title: 'Untitled',
      description: ''})
   `
  );
  await session.close();
  console.log(result);
});

//app.delete("/delete-node", async function (req, res) {
//	req.body
//	const session = driver.session();
//	const result = ...

app.get("/graph", async function (req, res) {
=======
app.get("/example", async function (req, res) {
  console.log(req.headers)
>>>>>>> efca45dc13676027e951250400f9c9f4e0581e69
  const session = driver.session();
  const nodesResult = await session.run(
    `
    MATCH
    (o)
    RETURN
    id(o) AS id,
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
    id(m) AS source,
    id(n) AS target
    `
  );
  await session.close();

  const nodes = nodesResult.records.map((r) => {
    return {
      id: r.get("id").toNumber(),
<<<<<<< HEAD
      inLinks: r.get("inLinks").map((inLink) => inLink.toNumber()),
      outLinks: r.get("outLinks").map((outLink) => outLink.toNumber()),
=======
      inLinks: r.get("inLinks").map(inLink => inLink.toNumber()),
      outLinks: r.get("outLinks").map(outLink => outLink.toNumber()),
>>>>>>> efca45dc13676027e951250400f9c9f4e0581e69
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

<<<<<<< HEAD
=======

>>>>>>> efca45dc13676027e951250400f9c9f4e0581e69
  const graphData = {
    nodes: nodes,
    links: links,
  };

  res.json(graphData);
});

var server = app.listen(8000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
