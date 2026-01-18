import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea, Input } from '@/components/ui/Input';
import { Copy, RefreshCw, X } from 'lucide-react';
import { toast } from '@/lib/toast';

export const RandomChars = () => {
  const [digits, setDigits] = useState(true);
  const [letter, setLetter] = useState(true);
  const [letterUp, setLetterUp] = useState(true);
  const [sym, setSym] = useState('!@#$%^&,.-_');
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
    
    if (!digits && !letter && !letterUp && !sym.trim()) {
      toast.error('Please select at least one character type');
      return;
    }
    
    const charLength = newChars.length;
    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += newChars[randomIndex(charLength)];
    }
    
    setResult(generated);
    toast.success('Password generated successfully');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard');
  };

  const handleClear = () => {
    setResult('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Random Password Generator</h1>
      
      <div className="space-y-6">
        {/* Character Types */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Character Types
          </label>
          <div className="flex gap-6 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
              <input
                type="checkbox"
                checked={digits}
                onChange={(e) => setDigits(e.target.checked)}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm">Digits (0-9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
              <input
                type="checkbox"
                checked={letter}
                onChange={(e) => setLetter(e.target.checked)}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
              <input
                type="checkbox"
                checked={letterUp}
                onChange={(e) => setLetterUp(e.target.checked)}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm">Uppercase (A-Z)</span>
            </label>
          </div>
        </div>

        {/* Special Characters */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Special Characters
          </label>
          <Textarea
            rows={3}
            value={sym}
            onChange={(e) => setSym(e.target.value)}
            placeholder="Enter special characters (e.g., !@#$%^&*)"
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Characters that will be included in the password
          </p>
        </div>

        {/* Exclude Characters */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Exclude Characters
          </label>
          <Textarea
            rows={3}
            value={exclude}
            onChange={(e) => setExclude(e.target.value)}
            placeholder="Enter characters to exclude (e.g., 0O1l)"
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Characters that will be excluded from the password
          </p>
        </div>

        {/* Length */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password Length
          </label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min={1}
              max={64}
              value={length}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setLength(Math.max(1, Math.min(1000, val)));
              }}
              className="w-32"
            />
            <div className="flex-1">
              <input
                type="range"
                min="1"
                max="64"
                value={Math.min(length, 64)}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
            </div>
            <span className="text-sm text-gray-600 min-w-[3rem] text-right">
              {length}
            </span>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex gap-2">
          <Button 
            onClick={handleGenerate} 
            variant="primary"
            disabled={!digits && !letter && !letterUp && !sym.trim()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Password
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="font-mono text-lg break-all text-center select-all">
                {result}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={handleCopy} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button 
                onClick={handleClear} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
