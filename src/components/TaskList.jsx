import Task from './Task';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <ul className="space-y-2 mb-4">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
