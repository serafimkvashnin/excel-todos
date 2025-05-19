import { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('\n');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .eq('created_at', selectedDate)
      .order('id');
    setTasks(data || []);
  };

  const addTask = async (content) => {
    const { data } = await supabase
      .from('todos')
      .insert({ content, completed: false, created_at: selectedDate })
      .select();
    if (data) setTasks((prev) => [...prev, ...data]);
  };

  const handleImport = () => {
    const items = input
      .split(separator)
      .map((t) => t.trim())
      .filter(Boolean);
    items.forEach((item) => addTask(item));
    setInput('');
  };

  const toggleComplete = async (id, completed) => {
    await supabase.from('todos').update({ completed }).eq('id', id);
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const deleteTask = async (id) => {
    await supabase.from('todos').delete().eq('id', id);
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  };

  const exportCompleted = () => {
    return tasks
      .filter((t) => t.completed)
      .map((t) => t.content)
      .join(separator);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-800">
      <div className="max-w-xl mx-auto bg-white shadow-xl p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>

        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Select Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <TaskInput
          input={input}
          setInput={setInput}
          separator={separator}
          setSeparator={setSeparator}
          onImport={handleImport}
        />

        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
        />

        <div className="mb-2">
          <label className="block text-sm mb-1">Export Separator</label>
          <input
            className="border p-1 rounded w-full"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          />
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(exportCompleted())}
          className="bg-green-500 text-white px-3 py-2 rounded w-full"
        >
          📋 Copy Completed Tasks
        </button>
      </div>
    </div>
  );
};

export default App;
