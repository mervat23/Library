const express=require("express")
const app=express()
require("dotenv").config()
const createTables=require('./createTables')
const indexRoutes=require("../routes/index.routes")

app.use(express.json())
app.use(indexRoutes)
createTables()


module.exports=app