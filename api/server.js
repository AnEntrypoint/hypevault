/**
 * Loads the environment variables and starts the server.
 */
require("dotenv").config()
const express = require("express")
const tasks = require("./tasks.js")
const run = require("./run.js")
const nodes = require("./nodes.js")
const stores = require("./stores.js")
const fs = require("fs")


let node = require("hyper-ipc-secure")()

async function exitHandler(options, exitCode) {
  console.log('restarted node')
  node = require("hyper-ipc-secure")()
}

process.on('exit', exitHandler.bind(null, 'cleanup'))
process.on('uncaughtException', exitHandler.bind(null, 'uncaughtException'))
process.on('unhandledRejection', exitHandler.bind(null, 'unhandledRejection'))

/**
 * Creates a folder if it doesn't exist.
 * @param {string} folderPath - The path of the folder.
 */
function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    // If the folder doesn't exist, create it
    fs.mkdirSync(folderPath)
    console.log(`Folder "${folderPath}" created.`)
  } else {
    console.log(`Folder "${folderPath}" already exists.`)
  }
}
createFolderIfNotExists("saves")
const app = express()
const port = process.env.PORT || 3011
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use((function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type")
  res.setHeader("Access-Control-Allow-Credentials", true)
  next()
}))
const vault = nodes(node)
console.log(vault)
app.use(express.static('public'))
app.use("/vault", vault)
app.use("/task", tasks(node))
app.use("/store", stores())
app.use("/run", run(node))
app.use(express.static('public'))
app.listen(port, (() => {
  console.log(`Example app listening on port ${port}`)
}))