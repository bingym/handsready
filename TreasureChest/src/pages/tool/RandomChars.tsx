import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea, Input } from '@/components/ui/Input';
import { Copy } from 'lucide-react';
import { toast } from '@/lib/toast';

export const RandomChars = () => {
  const [digits, setDigits] = useState(true);
  const [letter, setLetter] = useState(true);
  const [letterUp, setLetterUp] = useState(true);
  const [sym, setSym] = useState('!@#$%^&');
  const [exclude, setExclude] = useState('');
  const [length, setLength] = useState(8);
  const [result, setResult] = useState('');

  const randomIndex = (len: number): number => {
    return Math.floor(Math.random() * len);
  };

  const handleGenerate = () => {
    let chars = '';
    
    if (digits) {
      chars += '0123456789';
    }
    if (letter) {
      chars += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (letterUp) {
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    chars += sym;
    
    const excludeChars = exclude.split('');
    const charArray = chars.split('');
    const newChars = charArray.filter(char => !excludeChars.includes(char));
    
    if (newChars.length === 0) {
      toast.error('Available character set is empty, please check exclude characters');
      return;
    }
    
    const charLength = newChars.length;
    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += newChars[randomIndex(charLength)];
    }
    
    setResult(generated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Random Password Generator</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={digits}
                onChange={(e) => setDigits(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Digits</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={letter}
                onChange={(e) => setLetter(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Lowercase</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={letterUp}
                onChange={(e) => setLetterUp(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Uppercase</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Special Characters</label>
            <Textarea
              rows={4}
              value={sym}
              onChange={(e) => setSym(e.target.value)}
              placeholder="Enter special characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Exclude Characters</label>
            <Textarea
              rows={4}
              value={exclude}
              onChange={(e) => setExclude(e.target.value)}
              placeholder="Enter characters to exclude"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Length</label>
            <Input
              type="number"
              min={1}
              max={1000}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value) || 8)}
            />
          </div>
          <div>
            <Button onClick={handleGenerate}>
              Generate
            </Button>
          </div>
          {result && (
            <div className="space-y-2">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="font-mono break-all">{result}</div>
              </div>
              <Button onClick={handleCopy} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy Result
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
