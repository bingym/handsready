import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/Input';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'sql-formatter';

type SqlDialect = 'sql' | 'mysql' | 'mariadb' | 'postgresql' | 'plsql' | 'n1ql' | 'db2' | 'redshift' | 'spark' | 'tsql';
type KeywordCase = 'upper' | 'lower' | 'preserve';

export const SqlFormat = () => {
  const [input, setInput] = useState('');
  const [dialect, setDialect] = useState<SqlDialect>('sql');
  const [keywordCase, setKeywordCase] = useState<KeywordCase>('upper');
  const [indentSize, setIndentSize] = useState(2);

  // 实时格式化
  const formatResult = useMemo(() => {
    if (!input.trim()) {
      return { valid: true };
    }

    try {
      const formatted = format(input.trim(), {
        language: dialect,
        keywordCase: keywordCase === 'preserve' ? undefined : keywordCase,
        tabWidth: indentSize,
        linesBetweenQueries: 2,
      });
      return { valid: true, formatted };
    } catch (err) {
      const error = err as Error;
      return { valid: false, error: error.message || 'SQL formatting failed' };
    }
  }, [input, dialect, keywordCase, indentSize]);

  const displayFormatted = formatResult.valid ? formatResult.formatted : null;
  const displayError = formatResult.valid ? null : (formatResult.error || 'Invalid SQL');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SQL Formatter</h1>
      </div>

      {/* Format Options */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Dialect:</label>
          <select
            value={dialect}
            onChange={(e) => setDialect(e.target.value as SqlDialect)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          >
            <option value="sql">Standard SQL</option>
            <option value="mysql">MySQL</option>
            <option value="mariadb">MariaDB</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="plsql">PL/SQL</option>
            <option value="n1ql">N1QL</option>
            <option value="db2">DB2</option>
            <option value="redshift">Redshift</option>
            <option value="spark">Spark</option>
            <option value="tsql">T-SQL</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Keyword Case:</label>
          <select
            value={keywordCase}
            onChange={(e) => setKeywordCase(e.target.value as KeywordCase)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          >
            <option value="upper">UPPER</option>
            <option value="lower">lower</option>
            <option value="preserve">Preserve</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="8">8 spaces</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              SQL Input
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
              placeholder="Paste your SQL here..."
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
              Formatted SQL
            </label>
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            {displayFormatted ? (
              <Textarea
                rows={20}
                value={displayFormatted}
                readOnly
                className="w-full h-full font-mono text-sm resize-none bg-gray-50"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Formatted SQL will appear here...</div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
