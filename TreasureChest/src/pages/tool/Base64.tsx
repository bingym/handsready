import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy, Upload } from 'lucide-react';
import { toast } from '@/lib/toast';

export const Base64 = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    try {
      const value = unescape(encodeURIComponent(input));
      setOutput(window.btoa(value));
    } catch (error) {
      toast.error('Encoding failed');
    }
  };

  const handleDecode = () => {
    try {
      const value = escape(window.atob(output));
      setInput(decodeURIComponent(value));
    } catch (error) {
      toast.error('Invalid value');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setOutput(reader.result as string);
      };
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Base64 Encode/Decode</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Textarea
              rows={10}
              placeholder="Content to encode"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleEncode}>
              Encode ↓
            </Button>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Select File
              </Button>
            </label>
            <Button onClick={handleDecode}>
              Decode ↑
            </Button>
          </div>
          <div>
            <Textarea
              rows={10}
              placeholder="Content to decode"
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
