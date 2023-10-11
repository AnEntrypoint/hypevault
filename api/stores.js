const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const Hyperswarm = require('hyperswarm')

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

const init = (node) => {

    const save = async (req, res) => {
        const db = await prepDb('./' + req.params.db)
        console.log(req.body, req.params)
        await db.put(req.params.name, JSON.stringify(req.body))
        res.write("{success:true}")
        res.status(200).end()
    };

    const load = async (req, res) => {
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
    router.get("/load/:name", load);
    router.post("/save/:name", save);
    console.log('stores')
    return router;
}

module.exports = init