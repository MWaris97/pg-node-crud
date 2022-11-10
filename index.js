const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const pool = require('./dbConn')

const TODO_BASE_ROUTE = '/todo';

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get(TODO_BASE_ROUTE, async (request, response) => {
  let res = await pool.query('select * from public.todoList')
  response.json({
    todo: res.rows
  })
})

app.post(TODO_BASE_ROUTE, async (req, res) => {
  await pool.query(`INSERT INTO public.todolist
  (id, task, done)
  VALUES($1, $2, $3)`,
    [req.body.id, req.body.task, req.body.done])
  res.json({
    "status": "Task created"
  })
})


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