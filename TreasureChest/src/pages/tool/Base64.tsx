import { useState, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Copy, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from '@/lib/toast';

type Mode = 'encode' | 'decode';

export const Base64 = () => {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [fileBase64, setFileBase64] = useState<string | null>(null); // 存储上传文件的 Base64
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 实时编码/解码
  const conversionResult = useMemo(() => {
    // 如果是从文件上传的 Base64（编码模式），直接返回
    if (mode === 'encode' && fileBase64) {
      return { valid: true, result: fileBase64 };
    }

    if (!input.trim()) {
      return { valid: true, result: '' };
    }

    try {
      if (mode === 'encode') {
        // 编码：文本 → Base64
        const value = unescape(encodeURIComponent(input));
        const encoded = window.btoa(value);
        return { valid: true, result: encoded };
      } else {
        // 解码：Base64 → 文本
        try {
          const decoded = window.atob(input.trim());
          const value = escape(decoded);
          const result = decodeURIComponent(value);
          return { valid: true, result };
        } catch {
          return { valid: false, error: 'Invalid Base64 string' };
        }
      }
    } catch {
      return { valid: false, error: mode === 'encode' ? 'Encoding failed' : 'Decoding failed' };
    }
  }, [input, mode, fileBase64]);

  const displayResult = conversionResult.valid ? conversionResult.result : null;
  const displayError = conversionResult.valid ? null : (conversionResult.error || 'Invalid input');

  // 当模式切换时，如果当前有输出结果，将其设为输入
  const handleModeChange = (newMode: Mode) => {
    if (displayResult && input && !fileBase64) {
      setInput(displayResult);
    }
    // 清除文件 Base64，因为模式切换了
    setFileBase64(null);
    setMode(newMode);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // 移除 data:image/...;base64, 前缀，只保留 Base64 部分
      const base64Data = result.includes(',') ? result.split(',')[1] : result;
      
      if (mode === 'encode') {
        // 编码模式：文件上传后，Base64 直接显示在右侧输出区域
        // 左侧输入框可以显示文件名提示，或者留空
        setFileBase64(base64Data);
        setInput(''); // 清空输入框，因为文件内容不是文本
        toast.success(`File "${file.name}" loaded. Base64 encoded value shown on the right.`);
      } else {
        // 解码模式：Base64 数据作为输入，右侧显示解码结果
        setFileBase64(null); // 清除文件 Base64
        setInput(base64Data);
        toast.success(`File "${file.name}" loaded. Base64 value set as input.`);
      }
    };
    reader.onerror = () => {
      toast.error('File read failed');
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // 重置文件输入，允许重复选择同一文件
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer?.types.includes('Files')) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
    }
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
        <h1 className="text-3xl font-bold">Base64 Encode/Decode</h1>
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
            <option value="encode">Encode (Text → Base64)</option>
            <option value="decode">Decode (Base64 → Text)</option>
          </select>
        </div>
        <label className="cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            <Upload className="w-4 h-4" />
            Upload File
          </Button>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Input Text' : 'Base64 String'}
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
          <div 
            className="flex-1 flex flex-col min-h-[500px]"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={`relative flex-1 flex flex-col ${isDragging ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
              <Textarea
                rows={20}
                placeholder={mode === 'encode' ? 'Enter text to encode or drag & drop a file here...' : 'Enter Base64 string to decode or drag & drop a file here...'}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setFileBase64(null); // 用户手动输入时，清除文件 Base64
                }}
                className={`w-full h-full font-mono text-sm resize-none ${
                  displayError ? 'border-red-300 focus-visible:ring-red-500' : ''
                }`}
              />
              {isDragging && (
                <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <div className="text-blue-700 font-medium">Drop file here to upload</div>
                  </div>
                </div>
              )}
            </div>
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
              {mode === 'encode' ? 'Base64 String' : 'Decoded Text'}
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
                  {mode === 'encode' ? 'Base64 string will appear here...' : 'Decoded text will appear here...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
