'use client';

interface HistoryItem {
  topic: string;
  date: string;
}

interface SearchHistoryProps {
  history: HistoryItem[];
  onSelect: (topic: string) => void;
  onClear: () => void;
}

export default function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Historial de busquedas</h3>
        <button
          onClick={onClear}
          className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Limpiar
        </button>
      </div>
      <div className="space-y-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item.topic)}
            className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium text-gray-800 dark:text-gray-200">{item.topic}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{item.date}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
