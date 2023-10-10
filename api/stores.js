const Hyperbee = require('hyperbee')
const Hypercore = require('hypercore')
const Hyperswarm = require('hyperswarm')

const dbs = []

const prepDb = async (name) => {
    if (!dbs[name]) {
      const core = new Hypercore('./' + name)
      await core.ready()
      const db = new Hyperbee(core, { keyEncoding: 'utf-8', valueEncoding: 'binary' })
      dbs[name] = db;
      swarm = Hyperswarm()
      swarm.join(core.discoveryKey)
      swarm.on('connection', conn => core.replicate(conn))
      return db
    }
}

module.exports = {prepDb}