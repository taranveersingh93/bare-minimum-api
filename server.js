const express = require('express');
const cors = require('cors');
const app = express();
const taskData = require('./Data/tasks');
const savedTasks = require('./Data/savedtasks')

app.locals.title = "Bare Minimum API"
app.locals.tasks = taskData
app.locals.savedTasks = savedTasks

app.set('port', process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get('/api/v1/tasks', (req, res) => {
  res.status(200).json({ tasks: app.locals.tasks });
});

app.get('/api/v1/savedtasks', (req, res) => {
  res.status(200).json(app.locals.savedTasks);
});

app.get('/api/v1/tasks/:category', (req, res) => {
  let category = req.params.category
  const foundTasks = app.locals.tasks[category.toLowerCase()]

  if (foundTasks.length) {
    res.status(200).json(foundTasks)
  } else {
    res.sendStatus(404)
  }
});

app.post('/api/v1/savedtasks', (req, res) => {
  app.locals.savedTasks.push(req.body);

  res.status(201).json(app.locals.savedTasks);
});

app.delete('/api/v1/savedtasks', (req, res) => {
  const { id } = req.body;
  app.locals.savedTasks = app.locals.savedTasks.filter(task => task.id !== id)
  
  res.status(201).json(app.locals.savedTasks)
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});