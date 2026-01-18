import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from '@/lib/toast';

export const UUID = () => {
  const [input, setInput] = useState('');
  const [formats, setFormats] = useState({
    lowerWithoutSep: '',
    lowerWithSep: '',
    upperWithoutSep: '',
    upperWithSep: '',
  });

  const generateUUID = () => {
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

  const fillSep = (value: string) => {
    const list = value.split('');
    list.splice(8, 0, '-');
    list.splice(13, 0, '-');
    list.splice(18, 0, '-');
    list.splice(23, 0, '-');
    return list.join('');
  };

  const handleGenerate = () => {
    const uuid = generateUUID();
    setInput(uuid);
    handleFormat(uuid);
  };

  const handleFormat = (value?: string) => {
    const val = value || input.trim();
    
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

    if (cond1 || cond2) {
      const lowerWithoutSep = val.replace(/-/g, '').toLowerCase();
      const upperWithoutSep = lowerWithoutSep.toUpperCase();
      setFormats({
        lowerWithoutSep,
        lowerWithSep: fillSep(lowerWithoutSep),
        upperWithoutSep,
        upperWithSep: fillSep(upperWithoutSep),
      });
    } else {
      toast.error('Invalid format');
    }
  };

  const tableData = [
    { key: '1', type: 'Lowercase without separator', value: formats.lowerWithoutSep },
    { key: '2', type: 'Lowercase with separator', value: formats.lowerWithSep },
    { key: '3', type: 'Uppercase without separator', value: formats.upperWithoutSep },
    { key: '4', type: 'Uppercase with separator', value: formats.upperWithSep },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">UUID</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter UUID"
              className="flex-1"
            />
            <Button onClick={handleGenerate}>Generate UUID</Button>
            <Button onClick={() => handleFormat()}>
              Validate & Format
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.key} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{row.type}</td>
                    <td className="p-3 font-mono">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
