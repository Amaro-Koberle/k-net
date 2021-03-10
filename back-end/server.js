var express = require("express");
var fs = require("fs");
const neo4j = require("neo4j-driver");
const cors = require("cors");

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "12345")
);
var app = express();

app.use(cors());

app.get("/example", async function (req, res) {
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

  console.log(nodesResult);
  console.log(linksResult);

  const nodes = nodesResult.records.map((r) => {
    return {
      id: r.get("id").toNumber(),
      inLinks: r.get("inLinks"),
      outLinks: r.get("outLinks"),
      title: r.get("title"),
      description: r.get("description"),
    };
  });

  console.log(nodes);

  const links = linksResult.records.map((r) => {
    return {
      source: r.get("source").toNumber(),
      target: r.get("target").toNumber(),
    };
  });

  console.log(links);

  const graphData = {
    nodes: nodes,
    links: links,
  };

  res.json(graphData);
  console.log(graphData);
});

var server = app.listen(8000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
