const express = require("express");
const router = express();
const { check, validationResult } = require("express-validator");

const Todo = require("../../models/todos");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: 1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      completed: false,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Todo not found" });
    }
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    await todo.remove();
    res.json(todo);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Todo not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
