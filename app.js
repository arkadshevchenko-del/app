const express = require("express")
const path = require('path');
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000
let chat = []
app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname,"index.html"))
})
app.get("/getChat",(req,res) => {
  res.json(chat)
})
app.post("/addToChatMessege",(req,res)=>{
  chat[chat.length + 1].name = req.body.name
  chat[chat.length + 1].message = req.body.message
})
app.listen(PORT)
