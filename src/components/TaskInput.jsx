import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DefaultSeparator } from '../constants';

const TaskInput = ({ input, setInput, separator, setSeparator, onImport }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 transition"
      >
        <span className="font-semibold">📥 Import Tasks</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Accordion content */}
      {isOpen && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows={3}
            placeholder="Enter tasks or paste text separated by symbol"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <input
              className="border p-1 rounded w-full"
              placeholder={`Separator (default: ${DefaultSeparator})`}
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            />
            <button
              onClick={onImport}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Import
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInput;
