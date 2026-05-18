import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from '@/lib/toast';

type Mode = 'encode' | 'decode';

const ALL_VALUES = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'] as const;
const VALUES_STR = '富强民主文明和谐自由平等公正法治爱国敬业诚信友善';

// ── Original algorithm (compatible with sym233/core-values-encoder) ──

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

function originalEncode(str: string): string {
  const duo = hex2duo(str2utf8(str));
  return duo.map(d => VALUES_STR[2 * d] + VALUES_STR[2 * d + 1]).join('');
}

function originalDecode(encoded: string): string {
  const duo: number[] = [];
  for (const c of encoded) {
    const i = VALUES_STR.indexOf(c);
    if (i === -1 || i & 1) continue;
    duo.push(i >> 1);
  }
  const hexs = duo2hex(duo);
  if (hexs.length % 2 !== 0) throw new Error('Invalid');
  return utf82str(hexs);
}

// ── General base-N algorithm (for custom value sets) ──

function baseNEncode(text: string, values: string[]): string {
  const bytes = new TextEncoder().encode(text);
  if (bytes.length === 0) return '';
  let num = 1n;
  for (const b of bytes) num = num * 256n + BigInt(b);
  const base = BigInt(values.length);
  const digits: number[] = [];
  while (num > 0n) {
    digits.push(Number(num % base));
    num = num / base;
  }
  digits.reverse();
  return digits.map(d => values[d]).join('');
}

function baseNDecode(encoded: string, values: string[]): string {
  const digits: number[] = [];
  let i = 0;
  while (i < encoded.length) {
    let found = false;
    for (let v = 0; v < values.length; v++) {
      if (encoded.startsWith(values[v], i)) {
        digits.push(v);
        i += values[v].length;
        found = true;
        break;
      }
    }
    if (!found) i++;
  }
  if (digits.length === 0) return '';
  const base = BigInt(values.length);
  let num = 0n;
  for (const d of digits) num = num * base + BigInt(d);
  const bytes: number[] = [];
  while (num > 1n) {
    bytes.push(Number(num % 256n));
    num = num / 256n;
  }
  bytes.reverse();
  return new TextDecoder().decode(new Uint8Array(bytes));
}

// ── Component ──

export const CoreValuesEncoder = () => {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState<Set<string>>(() => new Set(ALL_VALUES));
  const [encodeKey, setEncodeKey] = useState(0);

  const selectedValues = useMemo(
    () => ALL_VALUES.filter(v => selected.has(v)),
    [selected],
  );

  const isOriginalMode = selectedValues.length === 12;

  const toggleValue = useCallback((value: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => setSelected(new Set(ALL_VALUES)), []);
  const deselectAll = useCallback(() => setSelected(new Set()), []);

  const reEncode = useCallback(() => setEncodeKey(k => k + 1), []);

  const result = useMemo<{ ok: true; text: string } | { ok: false; error: string }>(() => {
    void encodeKey;
    if (!input.trim()) return { ok: true, text: '' };
    if (selectedValues.length < 2) return { ok: false, error: '至少需要选择 2 个核心价值观词语' };

    try {
      if (mode === 'encode') {
        const text = isOriginalMode
          ? originalEncode(input)
          : baseNEncode(input, selectedValues);
        return { ok: true, text };
      } else {
        const text = isOriginalMode
          ? originalDecode(input)
          : baseNDecode(input, selectedValues);
        return { ok: true, text };
      }
    } catch {
      return { ok: false, error: mode === 'encode' ? '编码失败' : '解码失败，请检查输入和所选词语是否匹配' };
    }
  }, [input, mode, selectedValues, isOriginalMode, encodeKey]);

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

      {/* Value selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-700">选择词语：</span>
          <button onClick={selectAll} className="text-xs text-blue-600 hover:text-blue-800 underline">全选</button>
          <button onClick={deselectAll} className="text-xs text-blue-600 hover:text-blue-800 underline">全不选</button>
          <span className="text-xs text-gray-500">（已选 {selectedValues.length} / {ALL_VALUES.length}）</span>
          {!isOriginalMode && selectedValues.length >= 2 && (
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
              自定义模式，与原版网站不兼容
            </span>
          )}
          {isOriginalMode && (
            <span className="text-xs text-green-600 bg-green-50 border border-green-200 rounded px-2 py-0.5">
              兼容原版
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_VALUES.map(value => (
            <button
              key={value}
              onClick={() => toggleValue(value)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                selected.has(value)
                  ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'
                  : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        {selectedValues.length < 2 && (
          <p className="text-xs text-red-500">至少需要选择 2 个词语才能进行编解码</p>
        )}
      </div>

      {/* Mode + actions */}
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
        {mode === 'encode' && isOriginalMode && input.trim() && (
          <Button onClick={reEncode} variant="outline" className="flex items-center gap-1.5 text-sm">
            <RefreshCw className="w-3.5 h-3.5" />
            重新编码
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
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

        {/* Output */}
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
