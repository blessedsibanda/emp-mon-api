const Task = require("../models/Task");

const getUserTasks = (req, res) => {
  Task.find({ owner: req.user._id }, (err, tasks) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message
      });
    }
    tasks = tasks.map(t => {
      return {
        ...t._doc,
        owner: req.user.name
      };
    });
    return res.json(tasks);
  });
};

const createTask = (req, res) => {
  const { name, description, startTime, endTime, place } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: true,
      message:
        "Provide name, description, start time, end time and place for your task"
    });
  }
  const newTask = new Task({
    name,
    description,
    startTime,
    endTime,
    place,
    owner: req.user._id
  });

  newTask.save((err, task) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      });
    }
    return res.status(201).json({
      message: "Task created successfully!",
      ...task._doc,
      owner: req.user.name
    });
  });
};

module.exports = {
  getUserTasks,
  createTask
};
