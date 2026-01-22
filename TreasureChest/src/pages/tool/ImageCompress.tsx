import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, Image as ImageIcon, Download, X, CheckCircle2 } from 'lucide-react';
import { toast } from '@/lib/toast';

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dataUrl: string;
}

type CompressionMode = 'quality' | 'targetSize';

export const ImageCompress = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [compressionMode, setCompressionMode] = useState<CompressionMode>('quality');
  const [quality, setQuality] = useState(80);
  const [targetSizeKB, setTargetSizeKB] = useState(500);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const dragCounterRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const compressImageWithQuality = async (
    imageFile: File,
    imageDataUrl: string,
    targetQuality: number
  ): Promise<{ blob: Blob; dataUrl: string } | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        
        // Draw image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(null);
              return;
            }
            
            // Create data URL
            const reader = new FileReader();
            reader.onloadend = () => {
              const dataUrl = reader.result as string;
              resolve({ blob, dataUrl });
            };
            reader.readAsDataURL(blob);
          },
          imageFile.type || 'image/jpeg',
          targetQuality / 100
        );
      };
      
      img.onerror = () => {
        resolve(null);
      };
      
      img.src = imageDataUrl;
    });
  };

  const compressImage = async (imageFile: File): Promise<CompressionResult | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const imageDataUrl = e.target?.result as string;
        
        if (compressionMode === 'targetSize') {
          // Compress by target size using binary search
          const targetSizeBytes = targetSizeKB * 1024;
          let minQuality = 10;
          let maxQuality = 100;
          let bestResult: CompressionResult | null = null;
          let iterations = 0;
          const maxIterations = 15;
          const tolerance = 0.05; // 5% tolerance
          
          while (iterations < maxIterations && maxQuality - minQuality > 1) {
            const testQuality = Math.round((minQuality + maxQuality) / 2);
            const result = await compressImageWithQuality(imageFile, imageDataUrl, testQuality);
            
            if (!result) {
              resolve(null);
              return;
            }
            
            const compressedSize = result.blob.size;
            const originalSize = imageFile.size;
            const compressionRatio = ((1 - compressedSize / originalSize) * 100);
            
            const compressionResult: CompressionResult = {
              originalSize,
              compressedSize,
              compressionRatio,
              dataUrl: result.dataUrl,
            };
            
            // If compressed size is within target range, return immediately
            if (Math.abs(compressedSize - targetSizeBytes) / targetSizeBytes <= tolerance) {
              resolve(compressionResult);
              return;
            }
            
            // Update best result (closest to target size)
            if (!bestResult || 
                Math.abs(compressedSize - targetSizeBytes) < Math.abs(bestResult.compressedSize - targetSizeBytes)) {
              bestResult = compressionResult;
            }
            
            // Adjust quality range
            if (compressedSize > targetSizeBytes) {
              maxQuality = testQuality - 1;
            } else {
              minQuality = testQuality + 1;
            }
            
            iterations++;
          }
          
          // Return best result
          resolve(bestResult);
        } else {
          // Compress by quality
          const result = await compressImageWithQuality(imageFile, imageDataUrl, quality);
          
          if (!result) {
            resolve(null);
            return;
          }
          
          const originalSize = imageFile.size;
          const compressedSize = result.blob.size;
          const compressionRatio = ((1 - compressedSize / originalSize) * 100);
          
          resolve({
            originalSize,
            compressedSize,
            compressionRatio,
            dataUrl: result.dataUrl,
          });
        }
      };
      
      reader.onerror = () => {
        resolve(null);
      };
      
      reader.readAsDataURL(imageFile);
    });
  };

  const processFile = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setLoading(true);
    setFile(selectedFile);

    // Create preview URL
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    try {
      const result = await compressImage(selectedFile);
      
      if (result) {
        setCompressionResult(result);
        setCompressedUrl(result.dataUrl);
        if (compressionMode === 'targetSize') {
          const targetSizeBytes = targetSizeKB * 1024;
          const diff = Math.abs(result.compressedSize - targetSizeBytes);
          const diffPercent = (diff / targetSizeBytes * 100).toFixed(1);
          toast.success(
            `Compression completed! Size: ${formatFileSize(result.compressedSize)} (Target: ${formatFileSize(targetSizeBytes)}, Error: ${diffPercent}%)`
          );
        } else {
          toast.success(`Compression completed! Compression ratio: ${result.compressionRatio.toFixed(1)}%`);
        }
      } else {
        toast.error('Image compression failed');
      }
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Image compression failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
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

  const handleRecompress = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const result = await compressImage(file);
      
      if (result) {
        setCompressionResult(result);
        setCompressedUrl(result.dataUrl);
        if (compressionMode === 'targetSize') {
          const targetSizeBytes = targetSizeKB * 1024;
          const diff = Math.abs(result.compressedSize - targetSizeBytes);
          const diffPercent = (diff / targetSizeBytes * 100).toFixed(1);
          toast.success(
            `Recompression completed! Size: ${formatFileSize(result.compressedSize)} (Target: ${formatFileSize(targetSizeBytes)}, Error: ${diffPercent}%)`
          );
        } else {
          toast.success(`Recompression completed! Compression ratio: ${result.compressionRatio.toFixed(1)}%`);
        }
      } else {
        toast.error('Image compression failed');
      }
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Image compression failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl || !file) return;
    
    const link = document.createElement('a');
    link.href = compressedUrl;
    const extension = file.name.split('.').pop() || 'jpg';
    link.download = `compressed-${file.name.replace(/\.[^/.]+$/, '')}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded');
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl('');
    setCompressedUrl('');
    setCompressionResult(null);
    dragCounterRef.current = 0;
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Image Compress</h1>
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
          <>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleRecompress}
              type="button"
              disabled={loading}
            >
              {loading ? 'Compressing...' : 'Recompress'}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleClear}
              type="button"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          </>
        )}
      </div>

      {/* Compression Settings */}
      {file && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
          {/* Compression Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compression Mode
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="quality"
                  checked={compressionMode === 'quality'}
                  onChange={(e) => setCompressionMode(e.target.value as CompressionMode)}
                  className="w-4 h-4"
                />
                <span className="text-sm">By Quality</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="targetSize"
                  checked={compressionMode === 'targetSize'}
                  onChange={(e) => setCompressionMode(e.target.value as CompressionMode)}
                  className="w-4 h-4"
                />
                <span className="text-sm">By Target Size</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compressionMode === 'quality' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compression Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Size (KB)
                </label>
                <Input
                  type="number"
                  value={targetSizeKB}
                  onChange={(e) => setTargetSizeKB(Number(e.target.value))}
                  className="w-full"
                  min="10"
                  max="10000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Target: {formatFileSize(targetSizeKB * 1024)}
                </p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Width (px)
              </label>
              <Input
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="w-full"
                min="100"
                max="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Height (px)
              </label>
              <Input
                type="number"
                value={maxHeight}
                onChange={(e) => setMaxHeight(Number(e.target.value))}
                className="w-full"
                min="100"
                max="10000"
              />
            </div>
          </div>
        </div>
      )}

      {/* Compression Stats */}
      {compressionResult && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className={`grid grid-cols-1 ${compressionMode === 'targetSize' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 text-sm`}>
            <div>
              <div className="text-gray-600">Original Size</div>
              <div className="text-lg font-semibold text-gray-900">
                {formatFileSize(compressionResult.originalSize)}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Compressed Size</div>
              <div className="text-lg font-semibold text-green-600">
                {formatFileSize(compressionResult.compressedSize)}
              </div>
            </div>
            {compressionMode === 'targetSize' && (
              <div>
                <div className="text-gray-600">Target Size</div>
                <div className="text-lg font-semibold text-purple-600">
                  {formatFileSize(targetSizeKB * 1024)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Error: {((Math.abs(compressionResult.compressedSize - targetSizeKB * 1024) / (targetSizeKB * 1024)) * 100).toFixed(1)}%
                </div>
              </div>
            )}
            <div>
              <div className="text-gray-600">Compression Ratio</div>
              <div className="text-lg font-semibold text-blue-600">
                {compressionResult.compressionRatio.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input - Original Image */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Original Image
            </label>
            {file && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {formatFileSize(file.size)}
                </span>
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
                    alt="Original"
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
                          <div className="text-xs">to compress</div>
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
                Compressing image...
              </div>
            )}
          </div>
        </div>

        {/* Output - Compressed Image */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Compressed Image
            </label>
            {compressedUrl && (
              <Button
                onClick={handleDownload}
                variant="outline"
                className="px-2 py-1 text-xs flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Download
              </Button>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-[500px]">
            {compressedUrl ? (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm text-center">
                  {loading ? 'Compressing image...' : 'Compressed image will appear here...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
