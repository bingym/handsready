import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Copy, CheckCircle2 } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { toast } from '@/lib/toast';

export const Sha256 = () => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [caseType, setCaseType] = useState<'lower' | 'upper'>('lower');

  // Calculate SHA256 in real-time
  const sha256Result = useMemo(() => {
    if (!input.trim()) {
      return null;
    }

    try {
      let hash: string;
      if (key.trim() !== '') {
        hash = CryptoJS.HmacSHA256(input, key).toString();
      } else {
        hash = CryptoJS.SHA256(input).toString();
      }
      
      return caseType === 'upper' ? hash.toUpperCase() : hash.toLowerCase();
    } catch {
      return null;
    }
  }, [input, key, caseType]);

  const handleCopy = () => {
    if (sha256Result) {
      navigator.clipboard.writeText(sha256Result);
      toast.success('SHA256 hash copied');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SHA256 Hash</h1>
      </div>

      {/* Options */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">HMAC Key:</label>
          <Input
            placeholder="Optional HMAC-SHA256 key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-64 font-mono text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Case:</label>
          <select
            value={caseType}
            onChange={(e) => setCaseType(e.target.value as 'lower' | 'upper')}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          >
            <option value="lower">lowercase</option>
            <option value="upper">UPPERCASE</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            {input && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Ready
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            <Textarea
              rows={20}
              placeholder="Enter text to hash..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full font-mono text-sm resize-none"
            />
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              SHA256 Hash
            </label>
            {sha256Result && (
              <Button
                onClick={handleCopy}
                variant="outline"
                className="px-2 py-1 text-xs flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            {sha256Result ? (
              <Textarea
                rows={20}
                value={sha256Result}
                readOnly
                className="w-full h-full font-mono text-sm resize-none bg-gray-50"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm">SHA256 hash will appear here...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
