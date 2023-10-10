const express = require("express");
const winston = require("winston");
const HEX = "hex";
const GET_NODES = "getNodes";
const START_NODE = "startNode";

/**
 * This file is responsible for managing routes related to nodes.
 */

const initializeNodeRoutes = (keyManager) => {
  /**
   * This function retrieves a sub key.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  const getSub = async (req, res) => {
    try {
      winston.info("get sub", req.body);
      req.body.key.publicKey = Buffer.from(req.body.key.publicKey, HEX);
      if (req.body.key.secretKey)
        req.body.key.secretKey = Buffer.from(req.body.key.secretKey, HEX);
      if (req.body.key.scalar)
        req.body.key.scalar = Buffer.from(req.body.key.scalar, HEX);
      winston.info(
        "get sub",
        req.body.key.publicKey.toString(HEX),
        req.params.id,
      );
      const output = keyManager.getSub(req.body.key, req.params.id);
      output.publicKey = output.publicKey.toString(HEX);
      if (output.secretKey) output.secretKey = output.secretKey.toString(HEX);
      if (output.scalar) output.scalar = output.scalar.toString(HEX);
      res.write(JSON.stringify(output));
      res.status(200).end();
    } catch (err) {
      winston.error(err);
      res.write(JSON.stringify(err));
      res.status(500).end();
    }
  };

  /**
   * This function finds hosts.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  const findHosts = async (req, res) => {
    try {
      winston.info(req.body.key.publicKey);
      const results = await keyManager.lookup(req.body.key.publicKey);
      const output = [];
      for (remote of results) {
        for (peer of remote.peers) {
          const hex = peer.publicKey.toString(HEX);
          if (!output.includes(hex)) {
            output.push(hex);
          }
        }
      }
      winston.info("output", output);
      if (typeof output == "object") res.write(JSON.stringify(output));
      res.status(200).end();
    } catch (err) {
      winston.error(err);
      res.write(JSON.stringify(err));
      res.status(500).end();
    }
  };

  /**
   * This function gets nodes.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  const getNodes = async (req, res) => {
    try {
      const publicKey = Buffer.from(req.body.hostKey.publicKey, HEX);
      const sub = keyManager.getSub({ publicKey }, GET_NODES);
      const output = await keyManager.runKey(sub.publicKey, {});
      winston.info("output", output);
      if (typeof output == "object") res.write(JSON.stringify(output));
      res.status(200).end();
    } catch (err) {
      winston.error(err);
      res.write(JSON.stringify(err));
      res.status(500).end();
    }
  };

  /**
   * This function starts a node.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  const startNode = async (req, res) => {
    try {
      const publicKey = Buffer.from(req.body.hostKey.publicKey, HEX);
      const kp = keyManager.getSub({ publicKey }, START_NODE);
      const output = await keyManager.runKey(kp.publicKey, {
        nodes: [{ name: req.params.name, callKey: req.body.sub }],
      });
      if (typeof output == "object") res.write(JSON.stringify(output));
      else if (typeof output == "string") res.write(output);
      res.status(200).end();
    } catch (err) {
      winston.error(err);
      res.write(JSON.stringify(err));
      res.status(500).end();
    }
  };

  const router = express.Router();
  router.get("/callNode/:name", startNode);
  router.post("/getNodes", getNodes);
  router.post("/startNode/:name", startNode);
  router.post("/findHosts", findHosts);
  router.post("/getSub/:id", getSub);
  return router;
};

module.exports = initializeNodeRoutes;
