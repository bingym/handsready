import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Input';

export const WordCount = () => {
  const [text, setText] = useState('');

  const charCount = text.length;
  const lineCount = text.split('\n').length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Word Count</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Textarea
              rows={20}
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Characters</div>
              <div className="text-2xl font-bold text-green-700">{charCount}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Lines</div>
              <div className="text-2xl font-bold text-green-700">{lineCount}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
