import React from 'react';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <ul className="space-y-2 mb-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex justify-between items-center border p-2 rounded ${
            task.completed ? 'bg-green-100 line-through' : 'bg-white'
          }`}
        >
          <span>{task.content}</span>
          <div className="space-x-2">
            <button
              onClick={() => onToggleComplete(task.id, !task.completed)}
              className="text-sm bg-yellow-400 px-2 py-1 rounded"
            >
              {task.completed ? 'Undo' : 'Done'}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-sm bg-red-400 px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
