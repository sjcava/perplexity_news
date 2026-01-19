'use client';

import { useState, useEffect } from 'react';
import CategoryButton from '@/components/CategoryButton';
import NewsCard from '@/components/NewsCard';
import SearchHistory from '@/components/SearchHistory';
import LoadingSpinner from '@/components/LoadingSpinner';

interface NewsData {
  topic: string;
  country: string;
  content: string;
  sources: string[];
  date: string;
}

interface HistoryItem {
  topic: string;
  date: string;
}

const CATEGORIES = [
  { label: 'Venezuela', topic: 'Venezuela economía' },
  { label: 'Economia', topic: 'economía finanzas' },
  { label: 'Politica', topic: 'política gobierno' },
  { label: 'Tecnologia', topic: 'tecnología innovación' },
  { label: 'Deportes', topic: 'deportes fútbol' },
  { label: 'Internacional', topic: 'noticias internacionales mundo' },
];

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<string>('');
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [customTopic, setCustomTopic] = useState('');

  useEffect(() => {
    const savedHistory = localStorage.getItem('newsHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (topic: string) => {
    const newItem: HistoryItem = {
      topic,
      date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
    const newHistory = [newItem, ...history.filter((h) => h.topic !== topic)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('newsHistory', JSON.stringify(newHistory));
  };

  const fetchNews = async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setActiveTopic(topic);

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        setNewsData(result.data);
        saveToHistory(topic);
      } else {
        setError(result.error || 'Error al obtener noticias');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      fetchNews(customTopic.trim());
      setCustomTopic('');
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('newsHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Portal de Noticias
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Powered by Perplexity AI + n8n
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categorias
              </h2>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <CategoryButton
                    key={cat.topic}
                    label={cat.label}
                    topic={cat.topic}
                    isActive={activeTopic === cat.topic}
                    isLoading={isLoading}
                    onClick={fetchNews}
                  />
                ))}
              </div>

              <form onSubmit={handleCustomSearch} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Buscar tema personalizado..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading || !customTopic.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Buscar
                </button>
              </form>
            </section>

            <section>
              {isLoading && <LoadingSpinner />}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              {!isLoading && !error && newsData && (
                <NewsCard
                  topic={newsData.topic}
                  content={newsData.content}
                  sources={newsData.sources}
                  date={newsData.date}
                />
              )}

              {!isLoading && !error && !newsData && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Selecciona una categoria
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Elige una categoria arriba o busca un tema personalizado para ver las ultimas noticias
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <SearchHistory history={history} onSelect={fetchNews} onClear={clearHistory} />

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Acerca de</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Esta aplicacion utiliza Perplexity AI para buscar y resumir las noticias mas
                recientes sobre cualquier tema. Los resultados se procesan a traves de un flujo de
                n8n.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>Construido con Next.js + n8n + Perplexity AI</p>
        </div>
      </footer>
    </div>
  );
}
