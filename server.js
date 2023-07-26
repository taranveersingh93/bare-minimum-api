const express = require('express');
const cors = require('cors');
const knex = require('./knex');
const app = express();
const taskData = require('./Data/tasks');
const savedTasks = require('./Data/savedtasks');

app.locals.title = "Bare Minimum API"
app.locals.tasks = taskData
app.locals.savedTasks = savedTasks

app.set('port', process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get('/api/v1/tasks', async (req, res) => {
  try {
    const tasks = await knex.from("allTasks").select();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({message: error})
  }
});

app.get('/api/v1/savedtasks', async (req, res) => {
  try {
    const savedTasks = await knex.from("allTasks").select().where({ saved: true});
    res.status(200).json(savedTasks);
  } catch (error) {
    res.status(500).json({message: error})
  }
});

app.get('/api/v1/tasks/:category', async (req, res) => {
  try {
    const category = req.params.category
    const foundCategory = await knex.from("allTasks").select("category").where({category: category})
    if (foundCategory.length) {
      const foundTasks = await knex.from("allTasks").select().where({category: category})
      res.status(200).json(foundTasks);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({message: error});
  }
});

app.post('/api/v1/savedTasks', async (req, res) => {
  try {
    const requestID = req.body.id;
    const matchedTask = await knex("allTasks").select("saved").where({id:requestID});
    const alreadySaved = matchedTask[0].saved;
    if (alreadySaved) {
      res.status(404).json({message: 'This task is already saved.'});
    } else {
      await knex("allTasks").where({id: requestID}).update({saved: true});
      res.status(201).json({task: req.body.task})
    }
  } catch (error) {
    res.status(500).json({message:error})
  }
});

app.delete('/api/v1/savedtasks', async (req, res) => {
  try {
    const requestID = req.body.id;
    const matchedTask = await knex("allTasks").select("saved").where({id:requestID});
    const alreadySaved = matchedTask[0].saved;
    if (alreadySaved) {
      await knex("allTasks").where({id: requestID}).update({saved: false});
      res.status(201).json({task:req.body.task})
    } else {
      res.status(404).json({message: 'This task is not saved to begin with'})
    }
  } catch (error) {
    res.status(500).json({message: 'Oh no, something went wrong'})
  }

  
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});