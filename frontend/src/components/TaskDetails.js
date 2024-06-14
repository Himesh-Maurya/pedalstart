import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (isLoading) {
    return <p>Loading task details...</p>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 min-h-screen p-4 text-white">
      <h2 className="text-3xl font-bold mb-6">{task.title}</h2>
      <div className="bg-zinc-800 px-6 py-4 rounded mb-6 shadow max-w-3xl">
        <p className="text-lg leading-relaxed">{task.description}</p>
        <p className="text-sm text-gray-400 mt-2">Due Date: {format(new Date(task.dueDate), "MMMM d, yyyy h:mm a")}</p>
      </div>
      <Link
        to="/"
        className="text-white bg-gray-600 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg"
      >
        Go Back
      </Link>
    </div>
  );
}

export default TaskDetails;
