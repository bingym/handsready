import { useNavigate } from 'react-router-dom';
import { toolData } from '@/data/toolData';

export const ToolIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Tools</h1>
        <p className="text-gray-600">A collection of practical online development tools</p>
      </div>

      <div className="space-y-12">
        {toolData.map((group, groupIndex) => (
          <section key={groupIndex}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {group.Name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {group.Data.map((func, funcIndex) => (
                <button
                  key={funcIndex}
                  onClick={() => navigate(func.Path)}
                  className="group relative text-left p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-gray-900 group-hover:text-gray-950">
                    {func.Name}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 group-hover:text-gray-600">
                    Click to use →
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
