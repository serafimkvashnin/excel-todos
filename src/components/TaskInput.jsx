import React from 'react';

const TaskInput = ({ input, setInput, separator, setSeparator, onImport }) => {
  return (
    <div>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder="Enter tasks or paste text separated by symbol"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex items-center gap-2 mb-2">
        <input
          className="border p-1 rounded w-1/3"
          placeholder="Separator (default: newline)"
          value={separator}
          onChange={(e) => setSeparator(e.target.value || '\n')}
        />
        <button
          onClick={onImport}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Import
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
