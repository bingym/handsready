import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload } from 'lucide-react';
import { toast } from '@/lib/toast';

export const ExifInfo = () => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.info('EXIF info reading feature is under development, requires exif-js library');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">EXIF Info</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Select Image File
              </Button>
            </label>
          </div>
          <div className="text-gray-600 space-y-2">
            <p>Description: Upload an image file to display EXIF information (shooting parameters, GPS location, etc.)</p>
            <p className="text-sm text-gray-500">Note: This feature requires integration with exif-js library</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
