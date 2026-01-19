import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/Input';
import { Database } from 'lucide-react';

const getUTF8ByteCount = (str: string): number => {
  return new Blob([str]).size;
};

const getUTF16ByteCount = (str: string): number => {
  return str.length * 2;
};

const getUTF32ByteCount = (str: string): number => {
  return str.length * 4;
};

export const ByteCount = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const utf8Bytes = getUTF8ByteCount(text);
    const utf16Bytes = getUTF16ByteCount(text);
    const utf32Bytes = getUTF32ByteCount(text);
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;

    return {
      utf8Bytes,
      utf16Bytes,
      utf32Bytes,
      charCount,
      charCountNoSpaces,
    };
  }, [text]);

  const statItems = [
    { label: 'UTF-8 Bytes', value: stats.utf8Bytes, unit: 'bytes', color: 'blue' },
    { label: 'UTF-16 Bytes', value: stats.utf16Bytes, unit: 'bytes', color: 'green' },
    { label: 'UTF-32 Bytes', value: stats.utf32Bytes, unit: 'bytes', color: 'purple' },
    { label: 'Characters', value: stats.charCount, unit: '', color: 'orange' },
    { label: 'Characters (no spaces)', value: stats.charCountNoSpaces, unit: '', color: 'pink' },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    pink: 'bg-pink-50 border-pink-200 text-pink-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Byte Count</h1>
      </div>

      {/* Statistics Display */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-700">Byte Statistics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statItems.map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-lg border ${colorClasses[item.color as keyof typeof colorClasses]}`}
            >
              <div className="text-xs font-medium mb-1 opacity-80">{item.label}</div>
              <div className="text-2xl font-bold">
                {item.value.toLocaleString()}
                {item.unit && <span className="text-base ml-1">{item.unit}</span>}
              </div>
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
            placeholder="Enter text to count bytes..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full font-mono text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};
