const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Get the model
const Todo = require("../../models/Todo");

// @route   GET api/todos
// @desc    Get all items
// @access  Public
router.get("/", (request, response) => {
  Todo.find()
    .sort({ date: -1 })
    .then((todos) => response.json(todos));
});

// @route   GET api/todos/:id
// @desc    Get a Todo
// @access  Public
router.get("/:id", (request, response) => {
  Todo.findById(request.params.id).then((todo) => response.json(todo));
});

// @route   POST api/todos
// @desc    Create a Todo
// @access  Private
router.post("/", auth, (request, response) => {
  const newTodo = new Todo({
    name: request.body.name,
  });

  newTodo.save().then((newTodo) => response.json(newTodo));
});

// @route   UPDATE api/todos/:id
// @desc    Update a Todo
// @access  Private
router.put("/:id", auth, (request, response) => {
  Todo.findByIdAndUpdate(
    { _id: request.params.id },
    { $set: { name: request.body.name, date: Date.now() } }
  )
    .then((result) => {
      Todo.findById({ _id: request.params.id }).then((todo) =>
        response.json(todo)
      );
    })
    .catch((err) => response.status(400).json(err));
});

// @route   DELETE api/todos/:id
// @desc    Delete a Todo
// @access  Private
router.delete("/:id", auth, (request, response) => {
  Todo.findById(request.params.id)
    .then((todo) => todo.remove().then(() => response.json({ success: true })))
    .catch((err) => response.status(400).json({ success: false }));
});

module.exports = router;
