const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  text: String,
  done: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.patch("/api/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { done: req.body.done },
    { new: true }
  );
  res.json(todo);
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
