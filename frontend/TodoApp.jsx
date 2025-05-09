import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    const res = await axios.post("/api/todos", { text: newTask });
    setTodos([...todos, res.data]);
    setNewTask("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (id, done) => {
    const res = await axios.patch(`/api/todos/${id}`, { done: !done });
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Add new task"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <span
              className={`flex-1 cursor-pointer ${todo.done ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleComplete(todo._id, todo.done)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
