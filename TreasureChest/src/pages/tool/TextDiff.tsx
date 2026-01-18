import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Input';

export const TextDiff = () => {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  const getDiffLines = () => {
    const leftLines = left.split('\n');
    const rightLines = right.split('\n');
    const maxLines = Math.max(leftLines.length, rightLines.length);
    const diff: Array<{ left: string; right: string; type: 'same' | 'diff' | 'left-only' | 'right-only' }> = [];

    for (let i = 0; i < maxLines; i++) {
      const leftLine = leftLines[i] || '';
      const rightLine = rightLines[i] || '';
      
      if (leftLine === rightLine) {
        diff.push({ left: leftLine, right: rightLine, type: 'same' });
      } else if (leftLine && rightLine) {
        diff.push({ left: leftLine, right: rightLine, type: 'diff' });
      } else if (leftLine) {
        diff.push({ left: leftLine, right: '', type: 'left-only' });
      } else {
        diff.push({ left: '', right: rightLine, type: 'right-only' });
      }
    }

    return diff;
  };

  const diffLines = getDiffLines();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Text Diff</h1>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Text 1</h3>
            <Textarea
              rows={15}
              value={left}
              onChange={(e) => setLeft(e.target.value)}
              placeholder="Enter first text"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Text 2</h3>
            <Textarea
              rows={15}
              value={right}
              onChange={(e) => setRight(e.target.value)}
              placeholder="Enter second text"
            />
          </div>
          {left && right && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Diff Result</h3>
              <div className="border border-gray-300 rounded-lg p-2 max-h-96 overflow-auto font-mono text-sm">
                {diffLines.map((line, index) => (
                  <div
                    key={index}
                    className={`
                      flex p-1
                      ${line.type === 'same' ? 'bg-transparent' : ''}
                      ${line.type === 'diff' ? 'bg-yellow-50' : ''}
                      ${line.type === 'left-only' ? 'bg-red-50' : ''}
                      ${line.type === 'right-only' ? 'bg-green-50' : ''}
                    `}
                  >
                    <div className={`
                      flex-1 pr-2 border-r border-gray-200
                      ${line.type === 'left-only' || line.type === 'diff' ? 'text-red-600' : ''}
                    `}>
                      {line.left || <span className="text-gray-400">(empty)</span>}
                    </div>
                    <div className={`
                      flex-1 pl-2
                      ${line.type === 'right-only' || line.type === 'diff' ? 'text-green-600' : ''}
                    `}>
                      {line.right || <span className="text-gray-400">(empty)</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
