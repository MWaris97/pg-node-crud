const pool = require('../dbConn')

class TodoRepo {

    async getAllTasks() {
        return await pool.query('select * from public.todoList');
    }

    async createTaskRepo(id, task, done) {
        return await pool.query(`INSERT INTO public.todolist
        (id, task, done)
        VALUES($1, $2, $3)`,
        [id, task, done]);
    }
}

module.exports = TodoRepo;