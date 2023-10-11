const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const Hyperswarm = require('hyperswarm')
const express = require('express')
const dbs = []

const prepDb = async (name) => {
    if (dbs[name]) return dbs[name];
    const core = new Hypercore('./' + name)
    await core.ready()
    const db = new Hyperbee(core, { keyEncoding: 'utf-8', valueEncoding: 'binary' })
    dbs[name] = db;
    swarm = new Hyperswarm()
    swarm.join(core.discoveryKey)
    swarm.on('connection', conn => core.replicate(conn))
    return db
}

const init = () => {

    const save = async (req, res) => {
        const db = await prepDb('./' + req.params.db)
        console.log(req.body, req.params)
        await db.put(req.params.name, JSON.stringify(req.body))
        res.write("{success:true}")
        res.status(200).end()
    };

    const key = async (req, res) => {
        console.log('key')
        const db = await prepDb('./' + req.params.db)
        const out = db.core.key  
        console.log({publicKey:out.toString('hex')})
        res.write(JSON.stringify({publicKey:out.toString('hex')}))
        res.status(200).end() 
    }
    const load = async (req, res) => {
        console.log('load')
        const db = await prepDb('./' + req.params.db)
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
    const loadAll = async (req, res) => {
        console.log('loadAll')
        const db = await prepDb('./' + req.params.db)
        try {
            const lookup = { values: {} };
            for await (const node of db.createReadStream()) {
                console.log(node)
                lookup.values[node.key] =node.value.toString()
            }
            console.log(lookup)
            res.write(JSON.stringify(lookup))
            res.status(200).end();
        } catch (e) {
            console.error(e);
            res.write(JSON.stringify({
                error: e
            }));
            res.status(500).end();
        }
    };
    const router = express.Router();
    router.get("/load/:db/:name", load);
    router.get("/loadAll/:db", loadAll);
    router.get("/key/:db", key);
    router.post("/save/:name", save);
    return router;
}

module.exports = init