require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const lrServer = express()

lrServer.use(cors())
lrServer.use(express.json())
lrServer.use(router)

const PORT = 3000 || process.env.PORT

lrServer.listen(PORT,()=>{
    console.log(`Server Started at ${PORT} and waiting for client request`);
    
})

// resolving get request
lrServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:blue">Server started and waiting for client request</h1>`)
})

