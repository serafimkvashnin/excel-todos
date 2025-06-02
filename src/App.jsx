import { useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { DefaultSeparator } from './constants';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [copyStatus, setCopyStatus] = useState(false);
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('');
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

  const handleCopy = () => {
    const text = exportCompleted();
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  const handleImport = () => {
    const items = input
      .split(separator || DefaultSeparator)
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
      .join(separator || DefaultSeparator);
  };

  const formatDate = (date) => date.toISOString().split('T')[0];

  const addDays = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(formatDate(newDate));
  };

  return (
    <div className="min-h-screen p-4 text-gray-800 bg-white md:bg-gray-100">
      <div className="max-w-xl mx-auto bg-white md:shadow-xl p-6 rounded-none md:rounded-xl">
        <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="date"
            className="border p-1 rounded w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => addDays(-1)}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => addDays(1)}
          >
            Next
          </button>
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

        <div className="flex items-center gap-2">
          <input
            className="border p-1 rounded w-full"
            placeholder={`Separator (default: ${DefaultSeparator})`}
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          />
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            {copyStatus ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
