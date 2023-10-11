const express = require('express')
/**
 * Initializes the router for handling run requests.
 * @param {Object} node - The node object.
 * @returns {Object} - The router object.
 */
const init = (node) => {

  const runKey = async (req, res) => {
    console.log("run called");
    let body = req.body;
    const args = {
      ...req.params
    };
    delete args.pk;
    try {
      const kp = {
        publicKey: Buffer.from(req.params.pk, "hex")
      };
      console.log(kp.publicKey.toString("hex"));
      const lbkey = await node.lbfind(kp);
      console.log({
        body: body,
        args: args
      });
      const output = await node.runKey(Buffer.from(lbkey[0], "hex"), body || args, {
        reusableSocket: false
      });
      console.log("output:", output);
      if (typeof output == "object")
        res.write(JSON.stringify(output));
      else if (typeof output == "string")
        res.write(output);
      res.status(200).end();
    } catch (err) {
      console.log([err]);
      res.write(JSON.stringify(err));
      res.status(500).end();
    }
  };

  const findKey = async (req, res) => {
    console.log("find called", req.params);
    try {
      const kp = {
        publicKey: Buffer.from(req.params.pk, "hex")
      };
      console.log(kp.publicKey.toString("hex"));
      const lbkey = await node.lbfind(kp);
      const found = JSON.stringify(lbkey);
      console.log({
        found: found
      });
      res.write(found);
      res.status(200).end();
    } catch (err) {
      console.log(err);
      res.write(JSON.stringify(err));
      res.status(500).end();
    }
  };

  const router = express.Router();
  router.get("/key/:pk", runKey);
  router.get("/key/find/:pk", findKey);
  router.post("/key/:pk", runKey);
  return router;
};

module.exports = init;