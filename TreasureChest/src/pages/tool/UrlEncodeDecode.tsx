import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy } from 'lucide-react';
import { toast } from '@/lib/toast';

export const UrlEncodeDecode = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch {
      toast.error('Encoding failed');
    }
  };

  const handleDecode = () => {
    try {
      setInput(decodeURIComponent(output));
    } catch {
      toast.error('Decoding failed');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">URL Encode/Decode</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Textarea
              rows={10}
              placeholder="URL to encode"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleEncode}>
              Encode ↓
            </Button>
            <Button onClick={handleDecode}>
              Decode ↑
            </Button>
          </div>
          <div>
            <Textarea
              rows={10}
              placeholder="Encoded URL"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
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
