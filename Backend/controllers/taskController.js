import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { name } = req.body;
  const task = new Task({ name, userId: req.userId });
  await task.save();
  res.status(201).json({ message: "Created successfully", task });
};

export const updateTask = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const updated = await Task.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { $set: { completed: true } },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Task not found" });
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const deleted = await Task.findOneAndDelete({ _id: id, userId: req.userId });
  if (!deleted) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};
