const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const pool = require('./dbConn')
const TodoController = require('./controllers/todoController')
const CheckBasicToken = require('./middlewares/testMiddleware')
const ValidateTask = require('./middlewares/taskValidationMiddleware')

const TODO_BASE_ROUTE = '/todo';

const todoController = new TodoController()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(CheckBasicToken);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get(TODO_BASE_ROUTE, todoController.getAll)

app.post(TODO_BASE_ROUTE, ValidateTask, todoController.createTask)


app.put(TODO_BASE_ROUTE, async (req, res) => {
  await pool.query(`UPDATE public.todolist
  SET task=$1, done=$2
  WHERE id=$3`,
    [req.body.task, req.body.done, req.body.id])
  res.json({
    "status": "Task updated"
  })
})

app.delete(TODO_BASE_ROUTE + '/:id', async (req, res) => {
  await pool.query(`delete from public.todolist WHERE id=$1`,
    [req.params.id])
    res.json({
      "status": "Task deleted"
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})