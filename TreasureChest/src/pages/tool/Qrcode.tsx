import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import QRCode from 'qrcode';
import { toast } from '@/lib/toast';

export const Qrcode = () => {
  const [content, setContent] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast.error('Content cannot be empty');
      return;
    }

    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, content, {
          width: 200,
          margin: 2,
        });
        const url = canvas.toDataURL();
        setQrCodeUrl(url);
      }
    } catch (error) {
      toast.error('Failed to generate QR code');
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">QR Code</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate QR Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              rows={10}
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={handleGenerate}>
              Generate
            </Button>
          </div>
          {qrCodeUrl && (
            <div className="text-center">
              <canvas ref={canvasRef} className="hidden" />
              <img src={qrCodeUrl} alt="QR Code" className="max-w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
