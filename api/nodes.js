const express = require('express')
const init = node => {
  const getSub = async (req, res) => {
    try {
      console.log('get sub', req.body)
      req.body.key.publicKey = Buffer.from(req.body.key.publicKey, 'hex');
      if (req.body.key.secretKey) req.body.key.secretKey = Buffer.from(req.body.key.secretKey, 'hex');
      if (req.body.key.scalar) req.body.key.scalar = Buffer.from(req.body.key.scalar, 'hex');
      console.log('get sub', req.body.key.publicKey.toString('hex'), req.params.id);
      const output = node.getSub(req.body.key, req.params.id);
      output.publicKey = output.publicKey.toString('hex')
      if (output.secretKey) output.secretKey = output.secretKey.toString('hex')
      if (output.scalar) output.scalar = output.scalar.toString('hex')
      res.write(JSON.stringify(output));
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.write(JSON.stringify(err));
      res.status(500).end()
    }
  };
  const findHosts = async (req, res) => {
    try {
      console.log(req.body.key.publicKey)
      const results = await node.lookup(req.body.key.publicKey)
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
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.write(JSON.stringify(err));
      res.status(500).end()
    }
  };
  const getNodes = async (req, res) => {
    console.log('test');
    try {
      const publicKey = Buffer.from(req.body.hostKey.publicKey, 'hex')
      const sub = node.getSub({ publicKey }, 'getNodes');
      const output = await node.runKey(sub.publicKey, {});
      console.log('output', output)
      if (typeof output == "object") res.write(JSON.stringify(output))
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.write(JSON.stringify(err));
      res.status(500).end()
    }
  };
  const startNode = async (req, res) => {
    try {
      const publicKey = Buffer.from(req.body.hostKey.publicKey, 'hex')
      const kp = node.getSub({ publicKey }, 'startNode')
      const output = await node.runKey(kp.publicKey, { nodes: [{ name: req.params.name, callKey: req.body.sub }] });
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
  router.post("/getNodes", getNodes);
  router.post("/startNode/:name", startNode);
  router.post("/findHosts", findHosts);
  router.post("/getSub/:id", getSub);
  return router
};
module.exports = init;