import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/Input';
import { FileText } from 'lucide-react';

export const WordCount = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    const lineCount = text ? text.split('\n').length : 0;
    const paragraphCount = text.trim() ? text.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    const sentenceCount = text.trim() ? text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;

    return {
      charCount,
      charCountNoSpaces,
      wordCount,
      lineCount,
      paragraphCount,
      sentenceCount,
    };
  }, [text]);

  const statItems = [
    { label: 'Characters (with spaces)', value: stats.charCount, color: 'blue' },
    { label: 'Characters (no spaces)', value: stats.charCountNoSpaces, color: 'green' },
    { label: 'Words', value: stats.wordCount, color: 'purple' },
    { label: 'Lines', value: stats.lineCount, color: 'orange' },
    { label: 'Paragraphs', value: stats.paragraphCount, color: 'pink' },
    { label: 'Sentences', value: stats.sentenceCount, color: 'indigo' },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    pink: 'bg-pink-50 border-pink-200 text-pink-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Word Count</h1>
      </div>

      {/* Statistics Display */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-700">Statistics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-lg border ${colorClasses[item.color as keyof typeof colorClasses]}`}
            >
              <div className="text-xs font-medium mb-1 opacity-80">{item.label}</div>
              <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-2 flex flex-col">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Text Input
          </label>
        </div>
        <div className="flex-1 flex flex-col min-h-[500px]">
          <Textarea
            rows={20}
            placeholder="Enter text to analyze..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full font-mono text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};
