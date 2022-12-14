const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(cors({ origin: "https://todo-aydin.netlify.app", credentials: true }));

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/todos", require("./routers/api/todos"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
