import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { Upload, Image as ImageIcon, Copy, X } from 'lucide-react';
import { toast } from '@/lib/toast';
import exifr from 'exifr';

export const ExifInfo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [exifData, setExifData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setLoading(true);
    setFile(selectedFile);

    // 创建预览 URL
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    try {
      // 读取 EXIF 信息
      const exif = await exifr.parse(selectedFile, {
        pick: [
          'Make', 'Model', 'DateTimeOriginal', 'CreateDate', 'ModifyDate',
          'ISO', 'FNumber', 'ExposureTime', 'FocalLength', 'Flash',
          'WhiteBalance', 'Orientation', 'ImageWidth', 'ImageHeight',
          'GPSLatitude', 'GPSLongitude', 'GPSAltitude', 'GPSDateStamp',
          'LensModel', 'LensMake', 'Software', 'Artist', 'Copyright',
        ],
        translateKeys: true,
        translateValues: true,
        reviveValues: true,
      });

      if (exif && Object.keys(exif).length > 0) {
        setExifData(exif);
        toast.success('EXIF data extracted successfully');
      } else {
        setExifData({ message: 'No EXIF data found in this image' });
        toast.info('No EXIF data found');
      }
    } catch (error) {
      console.error('EXIF extraction error:', error);
      setExifData({ error: 'Failed to extract EXIF data' });
      toast.error('Failed to extract EXIF data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
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
      const selectedFile = files[0];
      processFile(selectedFile);
    }
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl('');
    setExifData(null);
    dragCounterRef.current = 0;
    setIsDragging(false);
  };

  const handleCopy = () => {
    if (exifData) {
      const jsonString = JSON.stringify(exifData, null, 2);
      navigator.clipboard.writeText(jsonString);
      toast.success('EXIF data copied');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">EXIF Info</h1>
      </div>

      {/* Options */}
      <div className="flex items-center gap-4 flex-wrap">
        <label className="cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
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
            Upload Image
          </Button>
        </label>
        {file && (
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleClear}
            type="button"
          >
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input - Image Preview */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Image Preview
            </label>
            {file && (
              <div className="text-xs text-gray-600">
                {file.name}
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
              {previewUrl ? (
                <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-400 text-sm">
                      {isDragging ? (
                        <div>
                          <div className="font-medium mb-1">Drop image here</div>
                          <div className="text-xs">to extract EXIF data</div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium mb-1">Drag & drop an image here</div>
                          <div className="text-xs">or click Upload Image button</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {isDragging && (
                <div className="absolute inset-0 bg-blue-50 bg-opacity-90 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <div className="text-blue-700 font-medium">Drop image here to upload</div>
                  </div>
                </div>
              )}
            </div>
            {loading && (
              <div className="text-xs text-gray-600 mt-2 text-center">
                Extracting EXIF data...
              </div>
            )}
          </div>
        </div>

        {/* Output - EXIF Data */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              EXIF Data
            </label>
            {exifData && (
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
            {exifData ? (
              <Textarea
                rows={20}
                value={JSON.stringify(exifData, null, 2)}
                readOnly
                className="w-full h-full font-mono text-sm resize-none bg-gray-50"
              />
            ) : (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm text-center">
                  {loading ? 'Extracting EXIF data...' : 'EXIF data will appear here...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
