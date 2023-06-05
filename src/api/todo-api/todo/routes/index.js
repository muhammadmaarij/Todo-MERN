var express = require("express");
var router = express.Router();
var Todo = require("./../models/todo.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("App");
});

router.get("/get-todos", (req, res, next) => {
  Todo.find({})
    .exec()
    .then((todos) => {
      res.statusCode = 200;
      res.statusMessage = "OK";
      res.json(todos);
    })
    .catch((err) => next(err));
});

router.post("/add-todo", (req, res, next) => {
  Todo.create({ todo: req.body.todo })
    .then((todo) => res.json(todo))
    .catch((err) => next(err));
});
router.put("/update-todo/:id", (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, {
    completed: true,
    completedTime: Date.now(),
  })
    .then((todo) => res.json(todo), {
      new: true,
    })
    .catch((err) => next(err));
});

router.delete("/delete-todo/:id", (req, res, next) => {
  console.log(req.params);
  Todo.findByIdAndDelete(req.params.id)
    .then((todos) => res.json(todos))
    .catch((err) => next(err));
});

module.exports = router;
