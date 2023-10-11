const express = require("express");
const init = (node) => {
  const express = require("express");
  const getSub = require("./handlers/getSub");
  const findHosts = require("./handlers/findHosts");
  const getNodes = require("./handlers/getNodes");
  const startNode = require("./handlers/startNode");

  const init = (node) => {
    const router = express.Router();
    router.get("/callNode/:name", startNode(node));
    router.post("/getNodes", getNodes(node));
    router.post("/startNode/:name", startNode(node));
    router.post("/findHosts", findHosts(node));
    router.post("/getSub/:id", getSub(node));
    return router;
  };

  module.exports = init;
};
module.exports = init;
