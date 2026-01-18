import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy } from 'lucide-react';
import { toast } from '@/lib/toast';

const formatSQL = (sql: string): string => {
  let formatted = sql.trim();
  
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL',
    'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'UNION', 'INSERT', 'INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER',
    'DROP', 'INDEX', 'AND', 'OR', 'AS', 'CASE', 'WHEN', 'THEN', 'ELSE',
    'END', 'DISTINCT', 'LIMIT', 'OFFSET', 'IN', 'EXISTS', 'NOT', 'NULL',
    'IS', 'BETWEEN', 'LIKE', 'ASC', 'DESC'
  ];
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    formatted = formatted.replace(regex, keyword.toUpperCase());
  });
  
  formatted = formatted
    .replace(/\bSELECT\b/gi, '\nSELECT')
    .replace(/\bFROM\b/gi, '\nFROM')
    .replace(/\bWHERE\b/gi, '\nWHERE')
    .replace(/\bJOIN\b/gi, '\nJOIN')
    .replace(/\bINNER\s+JOIN\b/gi, '\nINNER JOIN')
    .replace(/\bLEFT\s+JOIN\b/gi, '\nLEFT JOIN')
    .replace(/\bRIGHT\s+JOIN\b/gi, '\nRIGHT JOIN')
    .replace(/\bGROUP\s+BY\b/gi, '\nGROUP BY')
    .replace(/\bORDER\s+BY\b/gi, '\nORDER BY')
    .replace(/\bHAVING\b/gi, '\nHAVING')
    .replace(/\bUNION\b/gi, '\nUNION');
  
  formatted = formatted.replace(/,\s*/g, ',\n  ');
  formatted = formatted.replace(/\n{3,}/g, '\n\n').trim();
  
  return formatted;
};

export const SqlFormat = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    try {
      const formatted = formatSQL(input);
      setOutput(formatted);
    } catch (error) {
      toast.error('SQL formatting failed');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">SQL Formatter</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Textarea
              rows={10}
              placeholder="Enter SQL to format"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={handleFormat}>
              Format ↓
            </Button>
          </div>
          <div>
            <Textarea
              rows={15}
              placeholder="Formatted SQL"
              value={output}
              readOnly
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
