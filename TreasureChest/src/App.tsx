import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppLayout } from './components/Layout';
import './App.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const ToolIndex = lazy(() => import('./pages/tool/ToolIndex').then(m => ({ default: m.ToolIndex })));
const ReferenceIndex = lazy(() => import('./pages/reference/ReferenceIndex').then(m => ({ default: m.ReferenceIndex })));

// Lazy load tool pages
const JSONFormat = lazy(() => import('./pages/tool/JSONFormat').then(m => ({ default: m.JSONFormat })));
const Base64 = lazy(() => import('./pages/tool/Base64').then(m => ({ default: m.Base64 })));
const Timestamp = lazy(() => import('./pages/tool/Timestamp').then(m => ({ default: m.Timestamp })));
const UUID = lazy(() => import('./pages/tool/UUID').then(m => ({ default: m.UUID })));
const Md5 = lazy(() => import('./pages/tool/Md5').then(m => ({ default: m.Md5 })));
const UrlEncodeDecode = lazy(() => import('./pages/tool/UrlEncodeDecode').then(m => ({ default: m.UrlEncodeDecode })));
const WordCount = lazy(() => import('./pages/tool/WordCount').then(m => ({ default: m.WordCount })));
const SqlFormat = lazy(() => import('./pages/tool/SqlFormat').then(m => ({ default: m.SqlFormat })));
const UnicodeZh = lazy(() => import('./pages/tool/UnicodeZh').then(m => ({ default: m.UnicodeZh })));
const ByteCalc = lazy(() => import('./pages/tool/ByteCalc').then(m => ({ default: m.ByteCalc })));
const TextDiff = lazy(() => import('./pages/tool/TextDiff').then(m => ({ default: m.TextDiff })));
const ByteCount = lazy(() => import('./pages/tool/ByteCount').then(m => ({ default: m.ByteCount })));
const ExifInfo = lazy(() => import('./pages/tool/ExifInfo').then(m => ({ default: m.ExifInfo })));
const Qrcode = lazy(() => import('./pages/tool/Qrcode').then(m => ({ default: m.Qrcode })));
const RandomChars = lazy(() => import('./pages/tool/RandomChars').then(m => ({ default: m.RandomChars })));

// Lazy load reference pages
const HttpCode = lazy(() => import('./pages/reference/HttpCode').then(m => ({ default: m.HttpCode })));
const AsciiTable = lazy(() => import('./pages/reference/AsciiTable').then(m => ({ default: m.AsciiTable })));
const TimeFormatPlaceholder = lazy(() => import('./pages/reference/TimeFormatPlaceholder').then(m => ({ default: m.TimeFormatPlaceholder })));
const HtmlMark = lazy(() => import('./pages/reference/HtmlMark').then(m => ({ default: m.HtmlMark })));
const Source = lazy(() => import('./pages/reference/Source').then(m => ({ default: m.Source })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-600">Loading...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            
            {/* Tool routes */}
            <Route path="tool" element={<ToolIndex />} />
            <Route path="tool/json-format" element={<JSONFormat />} />
            <Route path="tool/sql-format" element={<SqlFormat />} />
            <Route path="tool/timestamp" element={<Timestamp />} />
            <Route path="tool/md5" element={<Md5 />} />
            <Route path="tool/base64" element={<Base64 />} />
            <Route path="tool/unicode-zh" element={<UnicodeZh />} />
            <Route path="tool/byte-calc" element={<ByteCalc />} />
            <Route path="tool/uuid" element={<UUID />} />
            <Route path="tool/url-encode-decode" element={<UrlEncodeDecode />} />
            <Route path="tool/text-diff" element={<TextDiff />} />
            <Route path="tool/word-count" element={<WordCount />} />
            <Route path="tool/byte-count" element={<ByteCount />} />
            <Route path="tool/exif-info" element={<ExifInfo />} />
            <Route path="tool/qrcode" element={<Qrcode />} />
            <Route path="tool/random-chars" element={<RandomChars />} />
            
            {/* Reference routes */}
            <Route path="reference" element={<ReferenceIndex />} />
            <Route path="reference/http-code" element={<HttpCode />} />
            <Route path="reference/ascii-table" element={<AsciiTable />} />
            <Route path="reference/time-format-placeholder" element={<TimeFormatPlaceholder />} />
            <Route path="reference/http-mark" element={<HtmlMark />} />
            <Route path="reference/source" element={<Source />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
