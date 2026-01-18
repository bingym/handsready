import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Input';

const getByteCount = (str: string): number => {
  return new Blob([str]).size;
};

export const ByteCount = () => {
  const [text, setText] = useState('');

  const byteCount = getByteCount(text);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Byte Count</h1>
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
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-2xl font-bold text-green-700">{byteCount} bytes</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
