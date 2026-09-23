import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layout';
import { About } from './pages/About';
import { ToolIndex } from './pages/tool/ToolIndex';
import { ReferenceIndex } from './pages/reference/ReferenceIndex';
import { JSONFormat } from './pages/tool/JSONFormat';
import { Base64 } from './pages/tool/Base64';
import { Timestamp } from './pages/tool/Timestamp';
import { UUID } from './pages/tool/UUID';
import { Md5 } from './pages/tool/Md5';
import { Sha256 } from './pages/tool/Sha256';
import { UrlEncodeDecode } from './pages/tool/UrlEncodeDecode';
import { WordCount } from './pages/tool/WordCount';
import { SqlFormat } from './pages/tool/SqlFormat';
import { UnicodeZh } from './pages/tool/UnicodeZh';
import { ByteCalc } from './pages/tool/ByteCalc';
import { TextDiff } from './pages/tool/TextDiff';
import { ByteCount } from './pages/tool/ByteCount';
import { ExifInfo } from './pages/tool/ExifInfo';
import { ImageCompress } from './pages/tool/ImageCompress';
import { Qrcode } from './pages/tool/Qrcode';
import { RandomChars } from './pages/tool/RandomChars';
import { CoreValuesEncoder } from './pages/tool/CoreValuesEncoder';
import { NoiseMeter } from './pages/tool/NoiseMeter';
import { FuelCostCalc } from './pages/tool/FuelCostCalc';
import { LicensePlate } from './pages/tool/LicensePlate';
import { MarkdownPreview } from './pages/tool/MarkdownPreview';
import { HttpCode } from './pages/reference/HttpCode';
import { AsciiTable } from './pages/reference/AsciiTable';
import { TimeFormatPlaceholder } from './pages/reference/TimeFormatPlaceholder';
import { HtmlMark } from './pages/reference/HtmlMark';
import { Source } from './pages/reference/Source';
import { toolData } from './data/toolData';

export const renderRoute = (url: string) => renderToString(
  <MemoryRouter initialEntries={[url]}>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ToolIndex />} />
        <Route path="about" element={<About />} />
        <Route path="tool" element={<ToolIndex />} />
        <Route path="tool/json-format" element={<JSONFormat />} /><Route path="tool/sql-format" element={<SqlFormat />} />
        <Route path="tool/timestamp" element={<Timestamp />} /><Route path="tool/md5" element={<Md5 />} /><Route path="tool/sha256" element={<Sha256 />} />
        <Route path="tool/base64" element={<Base64 />} /><Route path="tool/unicode-zh" element={<UnicodeZh />} /><Route path="tool/byte-calc" element={<ByteCalc />} />
        <Route path="tool/uuid" element={<UUID />} /><Route path="tool/url-encode-decode" element={<UrlEncodeDecode />} /><Route path="tool/text-diff" element={<TextDiff />} />
        <Route path="tool/word-count" element={<WordCount />} /><Route path="tool/byte-count" element={<ByteCount />} /><Route path="tool/exif-info" element={<ExifInfo />} />
        <Route path="tool/image-compress" element={<ImageCompress />} /><Route path="tool/qrcode" element={<Qrcode />} /><Route path="tool/random-chars" element={<RandomChars />} />
        <Route path="tool/core-values-encoder" element={<CoreValuesEncoder />} /><Route path="tool/noise-meter" element={<NoiseMeter />} /><Route path="tool/fuel-cost-calc" element={<FuelCostCalc />} />
        <Route path="tool/license-plate" element={<LicensePlate />} /><Route path="tool/markdown-preview" element={<MarkdownPreview />} />
        <Route path="reference" element={<ReferenceIndex />} /><Route path="reference/http-code" element={<HttpCode />} /><Route path="reference/ascii-table" element={<AsciiTable />} />
        <Route path="reference/time-format-placeholder" element={<TimeFormatPlaceholder />} /><Route path="reference/http-mark" element={<HtmlMark />} /><Route path="reference/source" element={<Source />} />
        <Route path="*" element={<Navigate to="/tool" replace />} />
      </Route>
    </Routes>
  </MemoryRouter>,
);

export const routeMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Developer Tools Online', description: 'Hands Ready is a collection of practical browser-based developer tools and reference resources.' },
  '/tool': { title: 'Developer Tools Online', description: 'Practical online tools for JSON, SQL, encoding, hashes, text, images and more.' },
  '/reference': { title: 'Developer Reference', description: 'Curated developer references, documentation links and built-in lookup tables.' },
  '/about': { title: 'About Hands Ready', description: 'Learn about Hands Ready, a browser-based developer toolbox.' },
  '/reference/http-code': { title: 'HTTP Status Code Reference', description: 'Searchable reference for HTTP response status codes and their meanings.' },
  '/reference/ascii-table': { title: 'ASCII Table', description: 'Look up ASCII characters, decimal values, hexadecimal values and HTML entities.' },
  '/reference/time-format-placeholder': { title: 'Time Format Placeholders', description: 'Reference for common date and time formatting placeholders.' },
  '/reference/http-mark': { title: 'HTML Escape Characters', description: 'Reference for HTML escape characters and entities.' },
  '/reference/source': { title: 'Mirror Sources', description: 'A list of useful package and software mirror sources.' },
};
for (const group of toolData) {
  for (const tool of group.Data) routeMetadata[tool.Path] = { title: tool.Name, description: tool.Description || `Use the ${tool.Name} browser tool online.` };
}

(globalThis as typeof globalThis & { __handsReadySSR?: { renderRoute: typeof renderRoute; routeMetadata: typeof routeMetadata } }).__handsReadySSR = { renderRoute, routeMetadata };
