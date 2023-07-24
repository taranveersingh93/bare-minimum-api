const express = require('express');
const cors = require('cors');
const app = express();
const tasks = require('./Data/tasks')


app.locals = {
  title: 'Bare Minimum API',
  tasks
}
app.set('port', process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get('/api/v1/tasks', (request, response) => {
  const tasks = app.locals.tasks
  res.status(200).json({tasks});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});