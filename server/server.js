var express = require("express");
var fs = require("fs");
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "12345")
);
var app = express();

app.get("/example", async function (req, res) {
  const session = driver.session();
  const result = await session.run(
    `
      MATCH (n)
      RETURN n.name as name;
  `
  );

  res.json({
    name: result.records.map((record) => record.get("name")),
  });

  await session.close();
});

app.get("/listUsers", async function (req, res) {
  const session = driver.session();
  const result = await session.run(
    `
    MATCH(n)
    RETURN n.name as name, n.number as number, n.description as description
  `
  );

  res.json({
    name: result.records.map((record) => record.get("name")),
    number: result.records.map((record) => record.get("number")),
    description: result.records.map((record) => record.get("description")),
  });

  await session.close();
});

var server = app.listen(8000, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
