import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdate = (id) => {
    navigate(`/add-task/${id}`);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen p-4">
      <div className="text-white text-3xl font-bold mb-4">Tasks</div>
      {isLoading ? (
        <p className="text-white">Loading tasks...</p>
      ) : (
        <ul className="w-full max-w-2xl">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex flex-col md:flex-row justify-between items-center bg-zinc-800 px-4 py-2 rounded mb-4 shadow"
            >
              <Link
                to={`/tasks/${task._id}`}
                className="flex flex-col md:flex-row items-center md:items-start md:flex-1 mr-4 cursor-pointer"
              >
                <div className="text-white text-lg font-semibold truncate md:mr-2 md:w-1/3">
                  {task.title}
                </div>
                <div className="text-gray-400 text-sm md:w-2/3 md:mx-4">
                  Due Date: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTaskUpdate(task._id)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleTaskDelete(task._id)}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate("/add-task")}
              className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Add Todo
            </button>
          </div>
        </ul>
      )}
    </div>
  );
}

export default TaskList;
