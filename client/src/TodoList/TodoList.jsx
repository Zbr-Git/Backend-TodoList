  import { useEffect, useState } from "react";
  import { v4 as uuidv4 } from "uuid";
  import TodoItem from "../TodoItem/TodoItem";
  import axios from 'axios';

  function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");
  

    useEffect(()=> {
      const fetchTodos = async() => {
        try {
          const response = await axios.get('http://localhost:3000/todos');
          setTasks(response.data.todos) 
          } catch (err) {
          console.log(err.message);
          } 
      } 
      fetchTodos()
      },[])
    


    const addTask = (text) => {
      if (text.length !== 0) {
        const newTask = { id: uuidv4(), text, completed: false };
        setTasks([...tasks, newTask]);
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
        setText("");
      }
    };

    const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleCompleted = (id) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };

    return (
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
         
       <div class="mt-8 space-y-8">
          <div class="space-y-6">

            <input  type="text"
            placeholder="Write your Task..."
              value={text}
              onChange={(e) => setText(e.target.value)} autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
         

          <a href="#" class="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center hover:bg-slate-200" onClick={() => addTask(text)}>
                   
                      <span class="text-sm hidden md:block">Add Task</span>                    
                </a>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <div>
            <h1 className="text-3xl font-medium">Tasks list</h1>
          </div>
          <div className="inline-flex space-x-2 items-center">
            <a href="#" className="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-indigo-200 hover:text-white bg-indigo-600 hover:bg-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
              <span className="text-sm font-medium hidden md:block">Urgent</span>
            </a>
            <a href="#" class="p-2 border border-slate-200 rounded-md inline-flex space-x-1 items-center hover:bg-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg> 
                      <span class="text-sm hidden md:block">Latest</span>                    
                </a>
          </div>
        </div>
        <p className="text-slate-500">Hello, here are your latest tasks</p>
  
        <div id="tasks" className="my-5">
        {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
        </div>
  
      </div>
    );
  }

  export default TodoList;
