import TodoModel from "../../model/Todo/index.js";

const TodoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await TodoModel.findAll();
      res.status(200).json({ todos });
    } catch (error) {
      console.error(error); // Log errors for debugging
      res.status(500).json({ message: 'Error fetching todos' }); // Send a generic error response
    }
  },

  addTodo: async (req, res) => {
    try {
      const { text, isCompleted } = req.body; // Destructure payload

      // Validate input (optional but recommended)
      if (!text) {
        return res.status(400).json({ message: 'Text is required' });
      }

      const todo = await TodoModel.create({ text, isCompleted });
      res.status(201).json({ todo }); // Use 201 Created for successful creation
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating todo' });
    }
  },
};

export default TodoController;
