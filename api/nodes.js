const express = require('express')
const init = node => {
  const getSub = async (req, res) => {
    try {
      console.log(req.params.id);
      req.body.key.publicKey = Buffer.from(Object.values(req.body.key.publicKey));
      if(req.body.key.secretKey) req.body.key.secretKey = Buffer.from(Object.values(req.body.key.secretKey));
      if(req.body.key.scalar) req.body.key.scalar = Buffer.from(Object.values(req.body.key.scalar));
      const output = node.getSub(req.body.key, req.params.id);
      if (typeof output == "object") res.write(JSON.stringify(output));
      else if (typeof output == "string") res.write(output);
      res.status(200).end()
    } catch (err) {
      console.log(err)
      res.write(JSON.stringify(err));
      res.status(500).end()
    }
  };
  const findHosts = async (req, res) => {
    try {
      console.log(req.params.id)
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
   const getNodes = async (req, res) => {
    console.log('test');
    try {
      req.body.hostKey.publicKey = Buffer.from(req.body.hostKey.publicKey, 'hex')
      const kp = node.getSub({publicKey:req.body.hostKey.publicKey},'getNodes')
      const output = await node.runKey(kp.publicKey, {});
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
  const startNode = async (req, res) => {
    try {
      req.body.hostKey.publicKey = Buffer.from(req.body.hostKey.publicKey, 'hex')
      req.body.sub = JSON.parse(req.body.sub)
      req.body.sub.publicKey = Buffer.from(Object.values(req.body.sub.publicKey.data))
      req.body.sub.scalar = Buffer.from(Object.values(req.body.sub.scalar.data))
      const rootkp = node.getSub(req.body.sub)
      const kp = node.getSub(req.body.hostKey,'startNode')
      const output = await node.runKey(kp.publicKey, {nodes:[{name:req.params.name, callKey:node.getSub(rootkp, req.params.name)}]});

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
  router.post("/findHosts/:id", findHosts);
  router.post("/getSub/:id", getSub);
  return router
};
module.exports = init;