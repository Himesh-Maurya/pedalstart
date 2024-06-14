import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskInput() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/tasks/${id}`);
      const { title, description, dueDate } = response.data;
      setTitle(title);
      setDescription(description);
      setDate(new Date(dueDate));
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const addTodoHandler = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      dueDate: date,
    };
    try {
      if (id) {
        await axios.put(`http://localhost:8000/tasks/${id}`, newTodo);
      } else {
        await axios.post("http://localhost:8000/tasks", newTodo);
      }
      console.log("Todo saved successfully");
      setTitle("");
      setDescription("");
      setDate(new Date());
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={addTodoHandler}
        className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6 w-full max-w-lg"
      >
        <h2 className="text-2xl text-white font-semibold text-center">
          {id ? "Update Todo" : "Add New Todo"}
        </h2>
        <div>
          <input
            type="text"
            className="bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 w-full"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            className="bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 w-full"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
          />
        </div>
        <div>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="Pp"
            className="bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 w-full"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {id ? "Update Todo" : "Add Todo"}
          </button>
          <Link
            to="/"
            className="text-white bg-gray-600 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg"
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default TaskInput;
