import { nanoid } from 'nanoid'
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

app.get('/api/v1/tasks/:category', (req, res) => {
  let categoryKeys = Object.keys(app.locals.tasks)
  let arr = []
  let category = req.params.category
  categoryKeys.forEach(key => {
    app.locals.tasks[key].forEach((task) => {
      let lowercase = task.category
      let findWhiteSpace = lowercase.replace(/ /g, '')
      lowercase = findWhiteSpace.toLowerCase()
      if (lowercase === category) {
        arr.push(task)
      }
    })
  })
  if (arr.length !== 0) {
    res.status(200).json(arr)
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/v1/savedtasks', (req, res) => {
  const id = nanoid(5)
  const { category } = req.body;

  app.locals.savedTasks[category].push({ task, id, seen, category, saved });

  res.status(201).json({ category: [task, id, seen, category, saved ]});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});