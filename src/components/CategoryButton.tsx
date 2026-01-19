'use client';

interface CategoryButtonProps {
  label: string;
  topic: string;
  isActive: boolean;
  isLoading: boolean;
  onClick: (topic: string) => void;
}

export default function CategoryButton({
  label,
  topic,
  isActive,
  isLoading,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={() => onClick(topic)}
      disabled={isLoading}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg scale-105'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {label}
    </button>
  );
}
