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
  const result = await session.run(
    `
      MATCH
      (n)-->(m)
      RETURN
      id(n) AS source,
      id(m) AS target
    `
  );

  const links = result.records.map((r) => {
    return {
      source: r.get("source").toNumber(),
      target: r.get("target").toNumber(),
    };
  });
  session.close();
  console.log(links.length + " links loaded " + (new Date() - start) + " ms.");
  const ids = new Set();
  links.forEach((l) => {
    ids.add(l.source);
    ids.add(l.target);
  });
  const gData = {
    nodes: Array.from(ids).map((id) => {
      return { id: id };
    }),
    links: links,
  };

  res.json({
    nodes: [],
    source: result.records.map((record) => record.get("source")),
    target: result.records.map((record) => record.get("target")),
  });

  await session.close();
});

var server = app.listen(8000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
