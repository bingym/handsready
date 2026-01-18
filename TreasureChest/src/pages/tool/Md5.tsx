import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Copy } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { toast } from '@/lib/toast';

export const Md5 = () => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');

  const handleEncrypt = () => {
    if (key.trim() !== '') {
      setOutput(CryptoJS.HmacMD5(input, key).toString());
    } else {
      setOutput(CryptoJS.MD5(input).toString());
    }
  };

  const handleToUpper = () => {
    setOutput(output.toUpperCase());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">MD5</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Textarea
              rows={10}
              placeholder="Content to encrypt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="HMAC-MD5 key (optional)"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleEncrypt}>
              Encrypt ↓
            </Button>
            <Button disabled>Decrypt ↑ (Not supported)</Button>
          </div>
          <div>
            <Textarea
              rows={10}
              placeholder="Encrypted content"
              value={output}
              readOnly
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleToUpper}>To Uppercase</Button>
            {output && (
              <Button onClick={handleCopy} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Result
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
