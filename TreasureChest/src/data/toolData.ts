import type { FuncGroup } from '@/types';

export const toolData: FuncGroup[] = [
  {
    Name: 'Development',
    Data: [
      { Name: 'JSON Formatter', Path: '/tool/json-format' },
      { Name: 'SQL Formatter', Path: '/tool/sql-format' },
      { Name: 'Timestamp', Path: '/tool/timestamp' },
      { Name: 'MD5', Path: '/tool/md5' },
      { Name: 'SHA256', Path: '/tool/sha256' },
      { Name: 'Base64 Encode/Decode', Path: '/tool/base64' },
      { Name: 'Unicode/Chinese', Path: '/tool/unicode-zh' },
      { Name: 'Byte Calculator', Path: '/tool/byte-calc' },
      { Name: 'UUID', Path: '/tool/uuid' },
      { Name: 'URL Encode/Decode', Path: '/tool/url-encode-decode' },
      { Name: 'Word Count', Path: '/tool/word-count' },
      { Name: 'Byte Count', Path: '/tool/byte-count' },
    ],
  },
  {
    Name: 'Photography',
    Data: [
      { Name: 'EXIF Info', Path: '/tool/exif-info' },
      { Name: 'Image Compress', Path: '/tool/image-compress' },
    ],
  },
  {
    Name: 'Others',
    Data: [
      { Name: 'QR Code', Path: '/tool/qrcode' },
      { Name: 'Random Password Generator', Path: '/tool/random-chars' },
      { Name: 'Text Diff', Path: '/tool/text-diff' },
    ],
  },
];
