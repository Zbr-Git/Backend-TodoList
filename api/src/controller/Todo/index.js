import { where } from "sequelize";
import TodoModel from "../../model/Todo/index.js";

const TodoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await TodoModel.findAll();
      res.status(200).json({ todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching todos" });
    }
  },

  addTodo: async (req, res) => {
    try {
      const { text, isCompleted } = req.body;

      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }

      const todo = await TodoModel.create({ text, isCompleted });
      res.status(201).json({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating todo" });
    }
  },

  updateTodo: async (req, res) => {
    const { id } = req.params;
    const { text, isCompleted } = req.body;
  
    try {
  
      const updatedResult = await TodoModel.update(
        { text, isCompleted },
        { where: { id: id } }
      );
  
      if (!updatedResult || (updatedResult && updatedResult[0] === 0)) {
        return res.status(400).json({ message: "Todo not found or update failed" });
      }
  
      res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating the todo" });
    }
  },
  
  toggleTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await TodoModel.findByPk(id);

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      // Toggle the completed status
      todo.isCompleted = !todo.isCompleted;
      await todo.save();

      res.status(200).json({ todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error toggling the todo" });
    }
  },


  deleteTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await TodoModel.findByPk(id);

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      await todo.destroy();

      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting the todo" });
    }
  },
};

export default TodoController;
