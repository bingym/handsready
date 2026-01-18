import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { toast } from '@/lib/toast';

export const ByteCalc = () => {
  const [values, setValues] = useState({
    bit: '',
    byte: '',
    kilobyte: '',
    megabyte: '',
    gigabyte: '',
    terabyte: '',
  });

  const updateValues = (type: string, value: number) => {
    if (isNaN(value)) {
      toast.error('Please enter a valid number');
      return;
    }

    let bits = 0;
    let bytes = 0;
    let kbs = 0;
    let mbs = 0;
    let gbs = 0;
    let tbs = 0;

    switch (type) {
      case 'bit':
        bits = value;
        bytes = value / 8;
        kbs = value / 8 / 1024;
        mbs = value / 8 / Math.pow(1024, 2);
        gbs = value / 8 / Math.pow(1024, 3);
        tbs = value / 8 / Math.pow(1024, 4);
        break;
      case 'byte':
        bits = value * 8;
        bytes = value;
        kbs = value / 1024;
        mbs = value / Math.pow(1024, 2);
        gbs = value / Math.pow(1024, 3);
        tbs = value / Math.pow(1024, 4);
        break;
      case 'kilobyte':
        bits = value * 8 * 1024;
        bytes = value * 1024;
        kbs = value;
        mbs = value / 1024;
        gbs = value / Math.pow(1024, 2);
        tbs = value / Math.pow(1024, 3);
        break;
      case 'megabyte':
        bits = value * 8 * Math.pow(1024, 2);
        bytes = value * Math.pow(1024, 2);
        kbs = value * 1024;
        mbs = value;
        gbs = value / 1024;
        tbs = value / Math.pow(1024, 2);
        break;
      case 'gigabyte':
        bits = value * 8 * Math.pow(1024, 3);
        bytes = value * Math.pow(1024, 3);
        kbs = value * Math.pow(1024, 2);
        mbs = value * 1024;
        gbs = value;
        tbs = value / 1024;
        break;
      case 'terabyte':
        bits = value * 8 * Math.pow(1024, 4);
        bytes = value * Math.pow(1024, 4);
        kbs = value * Math.pow(1024, 3);
        mbs = value * Math.pow(1024, 2);
        gbs = value * 1024;
        tbs = value;
        break;
    }

    setValues({
      bit: bits.toString(),
      byte: bytes.toString(),
      kilobyte: kbs.toString(),
      megabyte: mbs.toString(),
      gigabyte: gbs.toString(),
      terabyte: tbs.toString(),
    });
  };

  const handleChange = (type: string, value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || isNaN(numValue)) {
      setValues({ ...values, [type]: value });
      return;
    }
    updateValues(type, numValue);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Byte Calculator</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label className="block text-sm font-medium mb-2">bit(b)</label>
            <Input
              value={values.bit}
              onChange={(e) => handleChange('bit', e.target.value)}
              placeholder="Enter bit value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">byte(B)</label>
            <Input
              value={values.byte}
              onChange={(e) => handleChange('byte', e.target.value)}
              placeholder="Enter byte value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">kilobyte(KB)</label>
            <Input
              value={values.kilobyte}
              onChange={(e) => handleChange('kilobyte', e.target.value)}
              placeholder="Enter KB value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">megabyte(MB)</label>
            <Input
              value={values.megabyte}
              onChange={(e) => handleChange('megabyte', e.target.value)}
              placeholder="Enter MB value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">gigabyte(GB)</label>
            <Input
              value={values.gigabyte}
              onChange={(e) => handleChange('gigabyte', e.target.value)}
              placeholder="Enter GB value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">terabyte(TB)</label>
            <Input
              value={values.terabyte}
              onChange={(e) => handleChange('terabyte', e.target.value)}
              placeholder="Enter TB value"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
