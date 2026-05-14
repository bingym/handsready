import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Download, X } from 'lucide-react';
import QRCode from 'qrcode';
import { toast } from '@/lib/toast';

export const Qrcode = () => {
  const [content, setContent] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast.error('Content cannot be empty');
      return;
    }

    try {
      const url = await QRCode.toDataURL(content, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(url);
      toast.success('QR code generated successfully');
    } catch (error) {
      toast.error('Failed to generate QR code');
      console.error(error);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('QR code downloaded');
  };

  const handleClear = () => {
    setContent('');
    setQrCodeUrl('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">QR Code Generator</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content to encode
          </label>
          <Textarea
            rows={8}
            placeholder="Enter text, URL, or any content to generate QR code..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleGenerate} variant="primary" disabled={!content.trim()}>
            Generate QR Code
          </Button>
          {qrCodeUrl && (
            <>
              <Button 
                onClick={handleDownload} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button 
                onClick={handleClear} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            </>
          )}
        </div>
      </div>

      {qrCodeUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="max-w-full h-auto"
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            Scan the QR code with your device camera or QR code scanner
          </p>
        </div>
      )}
    </div>
  );
};
