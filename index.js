const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const pool = require('./dbConn')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/testdb', async (request, response) => {
  let res = await pool.query('select * from public.todoList')
  response.json({
    todo: res.rows
  })
})

app.post('/todo/create', async (req, res) => {
  let result = await pool.query(`INSERT INTO public.todolist
  (id, task, done)
  VALUES($1, $2, $3)`, 
  [req.body.id, req.body.task, req.body.done])
  console.log(result);
  res.json({
    "status": "Task created"
  })
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})