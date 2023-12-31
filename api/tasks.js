const express = require('express')
const { prepDb } = require('./stores.js')


const init = (node) => {

  const saveTask = async (req, res) => {
    const db = await prepDb('./tasks')
    console.log(req.body, req.params)
    await db.put(req.params.name, JSON.stringify(req.body))
    res.write(`{"success":"true"}`)
    res.status(200).end()
  };

  const loadTask = async (req, res) => {
    const db = await prepDb('./tasks')
    console.log("loading task");
    try {
      const lookup = await db.get(req.params.name);
      console.log(lookup.value.toString('utf-8'))
      res.write(lookup.value)
      res.status(200).end();
    } catch (e) {
      console.error(e);
      res.write(JSON.stringify({
        error: e
      }));
      res.status(500).end();
    }
  };

  const runTask = async (req, res) => {
    console.log("run called");
    var params = req.params;
    let body = req.body,
      pk = req.params.pk;
    const args = {
      ...req.params
    };
    console.log({
      body: body,
      args: args
    });
    delete args.actionname;
    delete args.pk;
    try {
      console.log("running", pk, params);
      const kp = {
        publicKey: Buffer.from(pk, "hex")
      };
      const lbkey = await node.lbfind(kp, "task");
      const output = await node.runKey(Buffer.from(lbkey[0], "hex"), {
        name: req.params.actionname,
        pk: req.params.pk,
        params: body || args
      });
      console.log("output:", output);
      if (typeof output == "object")
        res.write(JSON.stringify(output));
      else if (typeof output == "string")
        res.write(output);
      res.status(200).end();
    } catch (err) {
      res.write(JSON.stringify(err));
      res.status(500).end();
    }
  };
  console.log('tasks')
  const router = express.Router();
  router.post("/run/:pk/:actionname", runTask);
  return router;
};

module.exports = init;