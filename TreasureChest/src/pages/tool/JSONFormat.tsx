import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { CheckCircle2, AlertCircle, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/lib/toast';
import { JsonViewer } from '@/components/JsonViewer';

export const JSONFormat = () => {
  const [input, setInput] = useState('');
  const [indent] = useState(2);
  const [indentWidth] = useState(4);
  const [collapsedAll, setCollapsedAll] = useState<boolean>(false);
  
  const handleToggleCollapse = () => {
    setCollapsedAll(prev => !prev);
  };
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 验证 JSON
  const validateJSON = (jsonString: string): { valid: boolean; error?: string } => {
    if (!jsonString.trim()) {
      return { valid: true };
    }

    try {
      JSON.parse(jsonString.trim().replace(/^\uFEFF/, ''));
      return { valid: true };
    } catch (err) {
      const error = err as Error;
      // 提取更友好的错误信息
      let message = error.message;
      
      // 尝试提取位置信息
      const positionMatch = message.match(/position (\d+)/);
      if (positionMatch) {
        const pos = parseInt(positionMatch[1]);
        const lines = jsonString.substring(0, pos).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        message = `${message} (Line ${line}, Column ${column})`;
      }
      
      return { valid: false, error: message };
    }
  };

  // 实时验证
  const validation = useMemo(() => {
    if (!input.trim()) {
      return { valid: true };
    }
    return validateJSON(input);
  }, [input]);

  // 自动格式化（当输入改变且有效时）
  const autoParsedData = useMemo(() => {
    if (input.trim() && validation.valid) {
      try {
        const cleaned = input.trim().replace(/^\uFEFF/, '');
        return JSON.parse(cleaned);
      } catch {
        return null;
      }
    }
    return null;
  }, [input, validation.valid]);

  // 使用自动解析的数据
  const displayData = autoParsedData;
  const displayError = validation.valid ? null : (validation.error || 'Invalid JSON');


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">JSON Formatter</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              JSON Input
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
              placeholder="Paste your JSON here..."
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
              JSON Viewer
            </label>
            {displayData && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleToggleCollapse}
                  variant="outline"
                  className="px-2 py-1 text-xs flex items-center gap-1"
                  title={collapsedAll ? 'Expand All' : 'Collapse All'}
                >
                  {collapsedAll ? (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      <span className="hidden sm:inline">Expand</span>
                    </>
                  ) : (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      <span className="hidden sm:inline">Collapse</span>
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  variant="outline"
                  className="px-2 py-1 text-xs"
                  title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
                >
                  {theme === 'light' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                </Button>
              </div>
            )}
          </div>
          <div className="flex-1 min-h-[500px]">
            {displayData ? (
              <JsonViewer 
                data={displayData} 
                collapsed={collapsedAll}
                theme={theme}
                indentWidth={indentWidth}
              />
            ) : (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Formatted JSON will appear here...</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1" />
          {displayData && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Copy:</span>
              <Button
                onClick={() => {
                  if (displayData) {
                    const jsonString = JSON.stringify(displayData, null, indent);
                    navigator.clipboard.writeText(jsonString);
                    toast.success('Beautified JSON copied');
                  }
                }}
                variant="outline"
                className="px-3 py-1.5 text-sm"
              >
                Beautified
              </Button>
              <Button
                onClick={() => {
                  if (displayData) {
                    const jsonString = JSON.stringify(displayData);
                    navigator.clipboard.writeText(jsonString);
                    toast.success('Minified JSON copied');
                  }
                }}
                variant="outline"
                className="px-3 py-1.5 text-sm"
              >
                Minified
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
