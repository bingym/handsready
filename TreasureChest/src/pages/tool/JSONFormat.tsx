import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy } from 'lucide-react';
import { toast } from '@/lib/toast';

export const JSONFormat = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    try {
      const jsonData = JSON.parse(input.trim());
      const formatted = JSON.stringify(jsonData, null, 4);
      setOutput(formatted);
    } catch (error) {
      toast.error('Invalid JSON format');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">JSON Formatter</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Textarea
              rows={10}
              placeholder="Enter JSON to format"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={handleFormat}>
              Format ↓
            </Button>
          </div>
          <div>
            <Textarea
              rows={15}
              placeholder="Formatted JSON"
              value={output}
              readOnly
            />
          </div>
          {output && (
            <Button onClick={handleCopy} className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Result
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
