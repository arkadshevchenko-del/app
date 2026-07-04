const express = require("express")
const path = require('path');
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000
let chat = []
app.use(express.json());
app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname,"index.html"))
})
app.get("/getChat",(req,res) => {
  res.json(chat)
})
app.post("/addToChatMessege",(req,res)=>{

  chat.push({name:req.body.name,message:req.body.message})
  res.json()
})
app.listen(PORT)
