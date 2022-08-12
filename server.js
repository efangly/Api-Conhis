const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const Route = require('./routes/conhisRoute')
const jsdRoute = require('./routes/jsdRoute')
const AuthRoute = require('./routes/authRoute')

require("dotenv").config()
const app = express()
// Socket
const server = http.createServer(app)
// Database
const conhis = require('./configs/conhisdb')
const jsd = require('./configs/jsddb')
// Test DB
conhis.authenticate()
  .then(() => console.log('Conhis Database Connected...'))
  .catch(err => console.log('Error: ' + err))
jsd.authenticate()
  .then(() => console.log('JSD Database Connected...'))
  .catch(err => console.log('Error: ' + err))

//middleware
app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.use(morgan("dev"))
//start Socket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`)
  })
})
//route
app.use('/api',Route)
app.use('/api',jsdRoute)
app.use('/api',AuthRoute)

const port = process.env.PORT
server.listen(port,()=>console.log('Start server in port '+port))