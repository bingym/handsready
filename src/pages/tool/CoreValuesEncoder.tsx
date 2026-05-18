import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from '@/lib/toast';

type Mode = 'encode' | 'decode';

const VALUES = '富强民主文明和谐自由平等公正法治爱国敬业诚信友善';

function str2utf8(str: string): string {
  const notEncoded = /[A-Za-z0-9\-_.!~*'()]/g;
  const str1 = str.replace(notEncoded, c => c.codePointAt(0)!.toString(16));
  const str2 = encodeURIComponent(str1);
  return str2.replace(/%/g, '').toUpperCase();
}

function utf82str(utfs: string): string {
  if (utfs.length % 2 !== 0) throw new Error('Invalid hex');
  const parts: string[] = [];
  for (let i = 0; i < utfs.length; i++) {
    if (i % 2 === 0) parts.push('%');
    parts.push(utfs[i]);
  }
  return decodeURIComponent(parts.join(''));
}

function hex2duo(hexs: string): number[] {
  const duo: number[] = [];
  for (const c of hexs) {
    const n = parseInt(c, 16);
    if (n < 10) {
      duo.push(n);
    } else {
      if (Math.random() >= 0.5) {
        duo.push(10);
        duo.push(n - 10);
      } else {
        duo.push(11);
        duo.push(n - 6);
      }
    }
  }
  return duo;
}

function duo2hex(duo: number[]): string {
  const hex: number[] = [];
  let i = 0;
  while (i < duo.length) {
    if (duo[i] < 10) {
      hex.push(duo[i]);
    } else if (duo[i] === 10) {
      i++;
      hex.push(duo[i] + 10);
    } else {
      i++;
      hex.push(duo[i] + 6);
    }
    i++;
  }
  return hex.map(v => v.toString(16).toUpperCase()).join('');
}

function encode(str: string): string {
  const duo = hex2duo(str2utf8(str));
  return duo.map(d => VALUES[2 * d] + VALUES[2 * d + 1]).join('');
}

function decode(encoded: string): string {
  const duo: number[] = [];
  for (const c of encoded) {
    const i = VALUES.indexOf(c);
    if (i === -1 || i & 1) continue;
    duo.push(i >> 1);
  }
  const hexs = duo2hex(duo);
  if (hexs.length % 2 !== 0) throw new Error('Invalid');
  return utf82str(hexs);
}

export const CoreValuesEncoder = () => {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [encodeKey, setEncodeKey] = useState(0);

  const reEncode = useCallback(() => setEncodeKey(k => k + 1), []);

  const result = useMemo<{ ok: true; text: string } | { ok: false; error: string }>(() => {
    void encodeKey;
    if (!input.trim()) return { ok: true, text: '' };
    try {
      const text = mode === 'encode' ? encode(input) : decode(input);
      return { ok: true, text };
    } catch {
      return { ok: false, error: mode === 'encode' ? '编码失败' : '解码失败，请检查输入是否正确' };
    }
  }, [input, mode, encodeKey]);

  const displayResult = result.ok ? result.text : null;
  const displayError = result.ok ? null : result.error;

  const handleModeChange = (newMode: Mode) => {
    if (displayResult && input) setInput(displayResult);
    setMode(newMode);
  };

  const handleCopy = () => {
    if (displayResult) {
      navigator.clipboard.writeText(displayResult);
      toast.success('已复制到剪贴板');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">核心价值观编码</h1>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">模式：</label>
          <select
            value={mode}
            onChange={e => handleModeChange(e.target.value as Mode)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          >
            <option value="encode">编码（文本 → 核心价值观）</option>
            <option value="decode">解码（核心价值观 → 文本）</option>
          </select>
        </div>
        {mode === 'encode' && input.trim() && (
          <Button onClick={reEncode} variant="outline" className="flex items-center gap-1.5 text-sm">
            <RefreshCw className="w-3.5 h-3.5" />
            重新编码
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? '输入文本' : '核心价值观文本'}
            </label>
            {input && (
              <div className="flex items-center gap-2">
                {displayError ? (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    错误
                  </span>
                ) : (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    就绪
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            <Textarea
              rows={20}
              placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入要解码的核心价值观文本...'}
              value={input}
              onChange={e => setInput(e.target.value)}
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

        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? '核心价值观文本' : '解码结果'}
            </label>
            {displayResult && (
              <Button
                onClick={handleCopy}
                variant="outline"
                className="px-2 py-1 text-xs flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                复制
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
                  {mode === 'encode' ? '编码结果将显示在这里...' : '解码结果将显示在这里...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
