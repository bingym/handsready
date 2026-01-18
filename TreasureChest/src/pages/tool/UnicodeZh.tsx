import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy } from 'lucide-react';
import { toast } from '@/lib/toast';

const toUnicode = (s: string): string => {
  return escape(s).replace(/%/g, '\\').toLowerCase();
};

const toZh = (uni: string): string => {
  return unescape(uni.replace(/\\u/g, '%u'));
};

export const UnicodeZh = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleToZh = () => {
    try {
      setOutput(toZh(input));
    } catch (error) {
      toast.error('Conversion failed');
    }
  };

  const handleToUnicode = () => {
    try {
      setInput(toUnicode(output));
    } catch (error) {
      toast.error('Conversion failed');
    }
  };

  const handleCopyInput = () => {
    navigator.clipboard.writeText(input);
    toast.success('Copied to clipboard');
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Unicode/Chinese Converter</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Textarea
              rows={10}
              placeholder="Unicode"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleToZh}>
              To Chinese ↓
            </Button>
            <Button onClick={handleToUnicode}>
              To Unicode ↑
            </Button>
          </div>
          <div>
            <Textarea
              rows={10}
              placeholder="Chinese"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {input && (
              <Button onClick={handleCopyInput} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Unicode
              </Button>
            )}
            {output && (
              <Button onClick={handleCopyOutput} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Chinese
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
