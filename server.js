import { nanoid } from 'nanoid'
const express = require('express');
const cors = require('cors');
const app = express();
const taskData = require('./Data/tasks')

app.locals.title = "Bare Minimum API"
app.locals.tasks = taskData

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

app.post('/api/v1/savedtasks', (request, response) => {
  const id = nanoid(5)
  const { name, type } = request.body;

  app.locals.pets.push({ id, name, type });

  response.status(201).json({ id, name, type });
});
// model.id = nanoid(5)


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});