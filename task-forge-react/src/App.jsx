import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const addTask = () => {
    if (task.trim() === "") {
      setError("Please enter a task");
      return;
    }

    setTasks([...tasks, task]);
    setTask("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center pt-16 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 p-5 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-white mb-5">
          Task Forge
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          />

          <button
            onClick={addTask}
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        {tasks.length > 0 && (
          <ul className="mt-4 space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg"
              >
                {task}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
