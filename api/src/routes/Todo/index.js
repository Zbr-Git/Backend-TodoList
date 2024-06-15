import { Router } from "express";
import TodoController from "../../controller/Todo/index.js";

const todoRoute = Router();

todoRoute.get('/todos', TodoController.getTodos)
todoRoute.post('/todos', TodoController.addTodo)
// todoRoute.put('/todos/:id', TodoController.updateTodo)
todoRoute.put('/todos/:id/toggle', TodoController.toggleTodo); 
todoRoute.delete('/todos/:id', TodoController.deleteTodo)

export default todoRoute;