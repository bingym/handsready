import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

interface JsonViewerProps {
  data: unknown;
  collapsed?: boolean;
  theme?: 'light' | 'dark';
  indentWidth?: number;
}

export const JsonViewer = ({ 
  data, 
  collapsed = false,
  theme = 'light',
  indentWidth = 4,
}: JsonViewerProps) => {
  if (data === null || data === undefined || (typeof data !== 'object' && !Array.isArray(data))) {
    return (
      <div className={`json-viewer-container rounded-lg border p-4 overflow-auto h-full min-h-[500px] flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-700 text-gray-400' 
          : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <div>Invalid JSON data</div>
      </div>
    );
  }

  return (
    <div className={`json-viewer-container rounded-lg border p-4 overflow-auto h-full min-h-[500px] ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <JsonView
        src={data as object}
        collapsed={collapsed}
        collapseStringsAfterLength={120}
        enableClipboard
        theme={theme === 'dark' ? 'a11y' : 'default'}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
          fontSize: '14px',
          '--json-property': theme === 'dark' ? '#f8f8f2' : undefined,
        } as React.CSSProperties}
      />
    </div>
  );
};
