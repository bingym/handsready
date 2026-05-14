import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import content from './source.md?raw';

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mb-8">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold mt-8 mb-4 pb-2 border-b border-gray-200">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-2 mb-4 list-disc list-inside">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="text-gray-700">{children}</li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-blue-600 hover:underline"
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className="text-sm">{children}</code>
      );
    }
    return (
      <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto mb-4">{children}</pre>
  ),
  hr: () => <hr className="border-gray-200 my-4" />,
};

export const Source = () => {
  return (
    <div>
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
};
