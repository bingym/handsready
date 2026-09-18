import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { Textarea } from '@/components/ui/Input';
import { FileUp } from 'lucide-react';
import { toast } from '@/lib/toast';

const SAMPLE = `# Markdown Preview

Left is **Markdown**, right is live preview.

## Features
- GitHub Flavored Markdown (tables, task lists, strikethrough)
- Code blocks and inline \`code\`
- Links: [Hands Ready](https://example.com)

## Table

| Name | Description |
| ---- | ----------- |
| Left | Markdown input |
| Right | Rendered preview |

## Task List

- [x] Write markdown
- [ ] Preview on the right

## Code

\`\`\`ts
const hello = 'world';
console.log(hello);
\`\`\`

> Tip: drag a \`.md\` file onto the left pane to open it.
`;

const components: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 pb-2 border-b border-gray-200">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3 pb-2 border-b border-gray-200">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>,
  h4: ({ children }) => <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>,
  p: ({ children }) => <p className="mb-3 text-gray-800 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 ml-5 space-y-1.5 list-disc">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 ml-5 space-y-1.5 list-decimal">{children}</ol>,
  li: ({ children, ...props }) => {
    const checked = (props as { checked?: boolean }).checked;
    if (typeof checked === 'boolean') {
      return (
        <li className="flex items-start gap-2 list-none -ml-5">
          <input type="checkbox" checked={checked} readOnly className="mt-1.5" />
          <span>{children}</span>
        </li>
      );
    }
    return <li>{children}</li>;
  },
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-blue-600 hover:underline break-all"
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return <code className="text-sm font-mono">{children}</code>;
    }
    return <code className="font-mono text-sm bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded">{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">{children}</pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 py-1 mb-4 text-gray-600 italic">{children}</blockquote>
  ),
  hr: () => <hr className="border-gray-200 my-6" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-gray-300 text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
  th: ({ children }) => <th className="border border-gray-300 px-3 py-2 text-left font-semibold">{children}</th>,
  td: ({ children }) => <td className="border border-gray-300 px-3 py-2">{children}</td>,
  img: ({ src, alt }) => <img src={src} alt={alt ?? ''} className="max-w-full rounded-lg my-4" />,
};

export const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);

  const openFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setMarkdown(String(reader.result ?? ''));
      toast.success(`File "${file.name}" loaded`);
    };
    reader.onerror = () => toast.error('File read failed');
    reader.readAsText(file);
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
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
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
    const file = e.dataTransfer.files?.[0];
    if (file) openFile(file);
  };

  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold shrink-0">Markdown Preview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="flex flex-col min-h-0">
          <label className="block text-sm font-medium text-gray-700 mb-2 shrink-0">Markdown</label>
          <div
            className="relative flex-1 min-h-0 flex flex-col min-h-[60vh] lg:min-h-0"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type Markdown on the left, preview on the right... (or drag a .md file here)"
              className={`w-full flex-1 h-full font-mono text-sm resize-none ${isDragging ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            />
            {isDragging && (
              <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-500 rounded-md flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center">
                  <FileUp className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <div className="text-blue-700 font-medium">Drop file here to open</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col min-h-0">
          <label className="block text-sm font-medium text-gray-700 mb-2 shrink-0">Preview</label>
          <div className="flex-1 min-h-0 min-h-[60vh] lg:min-h-0 overflow-auto rounded-md border border-gray-300 bg-white px-5 py-4">
            {markdown ? (
              <Markdown remarkPlugins={[remarkGfm]} components={components}>
                {markdown}
              </Markdown>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Preview will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
