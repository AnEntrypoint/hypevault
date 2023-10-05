const express = require('express')
const init = node => {
  const getSub = async (req, res) => {
    try {
      console.log(req.params.id);
      console.log(req.body);
      req.body.rootKey.publicKey = Buffer.from(Object.values(req.body.rootKey.publicKey));
      req.body.rootKey.secretKey = Buffer.from(Object.values(req.body.rootKey.secretKey));
      const output = node.getSub(req.body.rootKey, req.params.id);
      if (typeof output == "object") res.write(JSON.stringify(output));
      else if (typeof output == "string") res.write(output);
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.write(JSON.stringify(err));
      res.status(500).end()
    }
  };
  const findNodes = async (req, res) => {
    try {
      console.log(req.params.id)
      console.log(req.body)
      req.body.key.publicKey = Buffer.from(Object.values(req.body.key.publicKey.data))
      console.log(req.body.key.publicKey.toString('hex'))
      const results = await node.lookup(req.body.key.publicKey.toString('hex'))
      const output = [];
      for (remote of results) {
        for (peer of remote.peers) {
            const hex = peer.publicKey.toString('hex');
            if (!output.includes(hex)) {
                output.push(hex)
            }
        }
    }
  
      console.log('output', output)
      if (typeof output == "object") res.write(JSON.stringify(output))
      else if (typeof output == "string") res.write(output)
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.write(JSON.stringify(err));
      res.status(500).end()
    }
  };
  const startNode = (req, res) => {
    try {
      req.body.hostKey.publicKey = Buffer.from(Object.values(req.body.hostKey.publicKey));
      req.body.hostKey.secretKey = Buffer.from(Object.values(req.body.hostKey.secretKey));
      const output = node.run(sub, "startNode", {
        name: req.params.name
      });
      
      if (typeof output == "object") res.write(JSON.stringify(output));
      else if (typeof output == "string") res.write(output);
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.write(JSON.stringify(err));
      res.status(500).end()
    }
  };
  const router = express.Router();
  router.get("/callNode/:name", startNode);
  router.post("/findNodes/:name", findNodes);
  router.post("/getSub/:id", getSub);
  return router
};
module.exports = init;