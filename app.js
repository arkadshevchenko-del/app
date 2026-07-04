const express = require("express");
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Твій рядок підключення до MongoDB Atlas
const mongoURI = "mongodb://Zlata:Gevko@ac-gbm2ajb-shard-00-00.romuaxa.mongodb.net:27017,ac-gbm2ajb-shard-00-01.romuaxa.mongodb.net:27017,ac-gbm2ajb-shard-00-02.romuaxa.mongodb.net:27017/?ssl=true&replicaSet=atlas-11g6h3-shard-0&authSource=admin&appName=Cluster0";

// Підключаємося до бази (додаємо назву бази, наприклад 'chatDB', перед знаком питання)
mongoose.connect(mongoURI + "&dbName=chatDB")
  .then(() => console.log("Підключено до MongoDB Atlas!"))
  .catch(err => console.error("Помилка підключення:", err));

// 2. Створюємо просту схему без дат
const messageSchema = new mongoose.Schema({
  name: { type: String, default: "Анонім" },
  message: { type: String, required: true }
}, { versionKey: false }); // versionKey: false прибирає поле __v, яке mongoose додає автоматично

const Message = mongoose.model('Message', messageSchema);

// Middleware для читання JSON від фронтенду
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 3. Отримання чату з бази даних
app.get("/getChat", async (req, res) => {
  try {
    const chat = await Message.find();
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати повідомлення" });
  }
});

// 4. Запис нового повідомлення в базу
app.post("/addToChatMessege", async (req, res) => {
  try {
    const newMessage = new Message({
      name: req.body.name,
      message: req.body.message
    });

    await newMessage.save();
    res.sendStatus(201); // Статус "Успішно створено"
  } catch (error) {
    res.status(400).json({ error: "Помилка при збереженні" });
  }
});

app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));
