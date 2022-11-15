const TodoRepo = require('../repository/todoRepository')

class TodoController {
    async getAll(request, response) {
        try {
            const todoRepo = new TodoRepo();
            let res = await todoRepo.getAllTasks();
            response.json({
                todo: res.rows
            });
        } catch (error) {
            response.json({
                error: "Opps! Something went wrong"
            });
        }
    }

    async createTask(request, response) {
        const todoRepo = new TodoRepo();
        let res = await todoRepo.createTaskRepo(request.body.id,
            request.body.task, request.body.done);

        response.json({
            "status": "Task created"
            })
    }
}

module.exports = TodoController;