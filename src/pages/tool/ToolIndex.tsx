import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { toolData } from '@/data/toolData';

const ALL_TAG = 'All';
const categories = [ALL_TAG, ...toolData.map(g => g.Name)];

export const ToolIndex = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL_TAG);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return toolData
      .filter(g => activeCategory === ALL_TAG || g.Name === activeCategory)
      .map(g => ({
        ...g,
        Data: g.Data.filter(f =>
          !query ||
          f.Name.toLowerCase().includes(query) ||
          (f.Description?.toLowerCase().includes(query))
        ),
      }))
      .filter(g => g.Data.length > 0);
  }, [search, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tools</h1>
        <p className="text-gray-600">A collection of practical online development tools</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tools..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-colors"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool grid */}
      {filtered.length > 0 ? (
        <div className="space-y-10">
          {filtered.map((group, gi) => (
            <section key={gi}>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{group.Name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {group.Data.map((func, fi) => (
                  <button
                    key={fi}
                    onClick={() => navigate(func.Path)}
                    className="group relative text-left p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="font-medium text-gray-900 group-hover:text-gray-950">
                      {func.Name}
                    </div>
                    {func.Description && (
                      <div className="mt-1 text-sm text-gray-500 group-hover:text-gray-600 line-clamp-2">
                        {func.Description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <Search className="mx-auto h-10 w-10 mb-3 opacity-50" />
          <p className="text-lg">No tools match your search</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory(ALL_TAG); }}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
