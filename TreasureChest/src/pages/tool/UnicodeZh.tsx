import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from '@/lib/toast';

type Mode = 'unicode-to-zh' | 'zh-to-unicode';

const toUnicode = (s: string): string => {
  return escape(s).replace(/%/g, '\\').toLowerCase();
};

const toZh = (uni: string): string => {
  return unescape(uni.replace(/\\u/g, '%u'));
};

export const UnicodeZh = () => {
  const [mode, setMode] = useState<Mode>('unicode-to-zh');
  const [input, setInput] = useState('');

  // 实时转换
  const conversionResult = useMemo(() => {
    if (!input.trim()) {
      return { valid: true, result: '' };
    }

    try {
      if (mode === 'unicode-to-zh') {
        // Unicode → 中文
        const result = toZh(input.trim());
        return { valid: true, result };
      } else {
        // 中文 → Unicode
        const result = toUnicode(input.trim());
        return { valid: true, result };
      }
    } catch (error) {
      return { valid: false, error: 'Conversion failed' };
    }
  }, [input, mode]);

  const displayResult = conversionResult.valid ? conversionResult.result : null;
  const displayError = conversionResult.valid ? null : (conversionResult.error || 'Invalid input');

  // 当模式切换时，如果当前有输出结果，将其设为输入
  const handleModeChange = (newMode: Mode) => {
    if (displayResult && input) {
      setInput(displayResult);
    }
    setMode(newMode);
  };

  const handleCopy = () => {
    if (displayResult) {
      navigator.clipboard.writeText(displayResult);
      toast.success('Copied to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Unicode/Chinese Converter</h1>
      </div>

      {/* Options */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Mode:</label>
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as Mode)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          >
            <option value="unicode-to-zh">Unicode → Chinese</option>
            <option value="zh-to-unicode">Chinese → Unicode</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'unicode-to-zh' ? 'Unicode String' : 'Chinese Text'}
            </label>
            {input && (
              <div className="flex items-center gap-2">
                {displayError ? (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Invalid
                  </span>
                ) : (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Valid
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            <Textarea
              rows={20}
              placeholder={mode === 'unicode-to-zh' ? 'Enter Unicode string (e.g., \\u4e2d\\u6587)...' : 'Enter Chinese text...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full h-full font-mono text-sm resize-none ${
                displayError ? 'border-red-300 focus-visible:ring-red-500' : ''
              }`}
            />
            {displayError && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 mt-2">
                {displayError}
              </div>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'unicode-to-zh' ? 'Chinese Text' : 'Unicode String'}
            </label>
            {displayResult && (
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
            {displayResult ? (
              <Textarea
                rows={20}
                value={displayResult}
                readOnly
                className="w-full h-full font-mono text-sm resize-none bg-gray-50"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm">
                  {mode === 'unicode-to-zh' ? 'Chinese text will appear here...' : 'Unicode string will appear here...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
