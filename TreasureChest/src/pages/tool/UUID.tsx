import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from '@/lib/toast';

const generateUUID = (): string => {
  const s: string[] = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((parseInt(s[19], 16) & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};

const fillSep = (value: string): string => {
  const list = value.split('');
  list.splice(8, 0, '-');
  list.splice(13, 0, '-');
  list.splice(18, 0, '-');
  list.splice(23, 0, '-');
  return list.join('');
};

const validateUUID = (val: string): boolean => {
  const cond1 = val.length === 32 && !val.includes('-');
  const cond2 = (() => {
    if (val.length === 36) {
      const matches = val.match(/-/g);
      if (matches && matches.length === 4) {
        const s = new Set([val[8], val[13], val[18], val[23]]);
        return s.size === 1 && Array.from(s)[0] === '-';
      }
    }
    return false;
  })();
  return cond1 || cond2;
};

export const UUID = () => {
  const [input, setInput] = useState('');

  // 实时验证和格式化
  const uuidResult = useMemo(() => {
    if (!input.trim()) {
      return { valid: false, formats: null };
    }

    const val = input.trim();
    const isValid = validateUUID(val);

    if (isValid) {
      const lowerWithoutSep = val.replace(/-/g, '').toLowerCase();
      const upperWithoutSep = lowerWithoutSep.toUpperCase();
      return {
        valid: true,
        formats: {
          lowerWithoutSep,
          lowerWithSep: fillSep(lowerWithoutSep),
          upperWithoutSep,
          upperWithSep: fillSep(upperWithoutSep),
        },
      };
    }

    return { valid: false, formats: null };
  }, [input]);

  const handleGenerate = () => {
    const uuid = generateUUID();
    setInput(uuid);
    toast.success('UUID generated');
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied`);
  };

  const formatItems = [
    { key: 'lowerWithoutSep', label: 'Lowercase without separator', value: uuidResult.formats?.lowerWithoutSep },
    { key: 'lowerWithSep', label: 'Lowercase with separator', value: uuidResult.formats?.lowerWithSep },
    { key: 'upperWithoutSep', label: 'Uppercase without separator', value: uuidResult.formats?.upperWithoutSep },
    { key: 'upperWithSep', label: 'Uppercase with separator', value: uuidResult.formats?.upperWithSep },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">UUID Generator & Formatter</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              UUID Input
            </label>
            <div className="flex items-center gap-2">
              {input && (
                <div className="flex items-center gap-2">
                  {uuidResult.valid ? (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Valid
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Invalid
                    </span>
                  )}
                </div>
              )}
              <Button
                onClick={handleGenerate}
                variant="outline"
                className="px-3 py-1.5 text-sm flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Generate
              </Button>
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            <Textarea
              rows={20}
              placeholder="Enter UUID or click Generate to create a new one..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full h-full font-mono text-sm resize-none ${
                input && !uuidResult.valid ? 'border-red-300 focus-visible:ring-red-500' : ''
              }`}
            />
            {input && !uuidResult.valid && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 mt-2">
                Invalid UUID format. UUID should be 32 characters (without separators) or 36 characters (with separators).
              </div>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              UUID Formats
            </label>
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            {uuidResult.valid && uuidResult.formats ? (
              <div className="space-y-3">
                {formatItems.map((item) => (
                  <div
                    key={item.key}
                    className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-gray-600">{item.label}</div>
                      {item.value && (
                        <Button
                          onClick={() => handleCopy(item.value!, item.label)}
                          variant="outline"
                          className="px-2 py-1 text-xs flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </Button>
                      )}
                    </div>
                    <div className="font-mono text-sm text-gray-900 break-all">
                      {item.value || '-'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm text-center">
                  {input ? 'Invalid UUID format' : 'UUID formats will appear here...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
