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
  let category = req.params.category[0].toUpperCase() + req.params.category.substring(1);
  categoryKeys.forEach(key => {
    app.locals.tasks[key].forEach((task) => {
      if (task.category === category) {
        arr.push(task)
      }
    })
    return arr
  })
  res.status(200).json(arr)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});