'use client';

interface NewsCardProps {
  topic: string;
  content: string;
  sources: string[];
  date: string;
}

export default function NewsCard({ topic, content, sources, date }: NewsCardProps) {
  const formatContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="font-bold text-lg mt-4 mb-2 text-gray-900 dark:text-white">
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }
      if (paragraph.startsWith('- ') || paragraph.startsWith('• ')) {
        return (
          <li key={index} className="ml-4 mb-1 text-gray-700 dark:text-gray-300">
            {paragraph.substring(2)}
          </li>
        );
      }
      if (paragraph.trim()) {
        return (
          <p key={index} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          {topic}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
      </div>

      <div className="prose dark:prose-invert max-w-none">{formatContent(content)}</div>

      {sources && sources.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Fuentes:
          </h4>
          <ul className="space-y-1">
            {sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
