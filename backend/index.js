// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Task = require('./model/task');
const dotenv = require('dotenv');
const cors = require('cors'); 

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL;  
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Retrieve all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({ title, description, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Retrieve a single task by its ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update an existing task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate }, { new: true });
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.status(204).send();
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
