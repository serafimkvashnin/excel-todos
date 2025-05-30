import { Trash2 } from 'lucide-react';

const Task = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li
      className={`flex items-center justify-between border p-2 rounded ${
        task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, !task.completed)}
          className="w-5 h-5 flex-shrink-0"
        />
        <span className="flex-1 break-words">{task.content}</span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};

export default Task;
