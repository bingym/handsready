import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/Input';

type UnitType = 'bit' | 'byte' | 'kilobyte' | 'megabyte' | 'gigabyte' | 'terabyte' | 'petabyte';

interface UnitConfig {
  key: UnitType;
  label: string;
  shortLabel: string;
}

const units: UnitConfig[] = [
  { key: 'bit', label: 'Bit', shortLabel: 'b' },
  { key: 'byte', label: 'Byte', shortLabel: 'B' },
  { key: 'kilobyte', label: 'Kilobyte', shortLabel: 'KB' },
  { key: 'megabyte', label: 'Megabyte', shortLabel: 'MB' },
  { key: 'gigabyte', label: 'Gigabyte', shortLabel: 'GB' },
  { key: 'terabyte', label: 'Terabyte', shortLabel: 'TB' },
  { key: 'petabyte', label: 'Petabyte', shortLabel: 'PB' },
];

const formatNumber = (num: number): string => {
  if (num === 0) return '0';
  if (Math.abs(num) < 0.000001) {
    return num.toExponential(6);
  }
  if (Math.abs(num) >= 1000000000000) {
    return num.toExponential(6);
  }
  // 保留最多 6 位有效数字
  const magnitude = Math.floor(Math.log10(Math.abs(num)));
  const factor = Math.pow(10, 6 - magnitude - 1);
  const rounded = Math.round(num * factor) / factor;
  return rounded.toString();
};

export const ByteCalc = () => {
  const [activeUnit, setActiveUnit] = useState<UnitType | null>(null);
  const [inputValue, setInputValue] = useState('');

  const calculateValues = useMemo(() => {
    if (!activeUnit || !inputValue.trim()) {
      return {
        bit: '',
        byte: '',
        kilobyte: '',
        megabyte: '',
        gigabyte: '',
        terabyte: '',
        petabyte: '',
      };
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      return {
        bit: '',
        byte: '',
        kilobyte: '',
        megabyte: '',
        gigabyte: '',
        terabyte: '',
        petabyte: '',
      };
    }

    let bits = 0;
    let bytes = 0;
    let kbs = 0;
    let mbs = 0;
    let gbs = 0;
    let tbs = 0;
    let pbs = 0;

    switch (activeUnit) {
      case 'bit':
        bits = value;
        bytes = value / 8;
        kbs = value / 8 / 1024;
        mbs = value / 8 / Math.pow(1024, 2);
        gbs = value / 8 / Math.pow(1024, 3);
        tbs = value / 8 / Math.pow(1024, 4);
        pbs = value / 8 / Math.pow(1024, 5);
        break;
      case 'byte':
        bits = value * 8;
        bytes = value;
        kbs = value / 1024;
        mbs = value / Math.pow(1024, 2);
        gbs = value / Math.pow(1024, 3);
        tbs = value / Math.pow(1024, 4);
        pbs = value / Math.pow(1024, 5);
        break;
      case 'kilobyte':
        bits = value * 8 * 1024;
        bytes = value * 1024;
        kbs = value;
        mbs = value / 1024;
        gbs = value / Math.pow(1024, 2);
        tbs = value / Math.pow(1024, 3);
        pbs = value / Math.pow(1024, 4);
        break;
      case 'megabyte':
        bits = value * 8 * Math.pow(1024, 2);
        bytes = value * Math.pow(1024, 2);
        kbs = value * 1024;
        mbs = value;
        gbs = value / 1024;
        tbs = value / Math.pow(1024, 2);
        pbs = value / Math.pow(1024, 3);
        break;
      case 'gigabyte':
        bits = value * 8 * Math.pow(1024, 3);
        bytes = value * Math.pow(1024, 3);
        kbs = value * Math.pow(1024, 2);
        mbs = value * 1024;
        gbs = value;
        tbs = value / 1024;
        pbs = value / Math.pow(1024, 2);
        break;
      case 'terabyte':
        bits = value * 8 * Math.pow(1024, 4);
        bytes = value * Math.pow(1024, 4);
        kbs = value * Math.pow(1024, 3);
        mbs = value * Math.pow(1024, 2);
        gbs = value * 1024;
        tbs = value;
        pbs = value / 1024;
        break;
      case 'petabyte':
        bits = value * 8 * Math.pow(1024, 5);
        bytes = value * Math.pow(1024, 5);
        kbs = value * Math.pow(1024, 4);
        mbs = value * Math.pow(1024, 3);
        gbs = value * Math.pow(1024, 2);
        tbs = value * 1024;
        pbs = value;
        break;
    }

    return {
      bit: formatNumber(bits),
      byte: formatNumber(bytes),
      kilobyte: formatNumber(kbs),
      megabyte: formatNumber(mbs),
      gigabyte: formatNumber(gbs),
      terabyte: formatNumber(tbs),
      petabyte: formatNumber(pbs),
    };
  }, [activeUnit, inputValue]);

  const handleInputChange = (unit: UnitType, value: string) => {
    if (value.trim() === '') {
      setActiveUnit(null);
      setInputValue('');
    } else {
      setActiveUnit(unit);
      setInputValue(value);
    }
  };

  const getDisplayValue = (unit: UnitType): string => {
    if (activeUnit === unit) {
      return inputValue;
    }
    return calculateValues[unit];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Byte Calculator</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((unit) => (
          <div key={unit.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {unit.label} ({unit.shortLabel})
            </label>
            <Input
              value={getDisplayValue(unit.key)}
              onChange={(e) => handleInputChange(unit.key, e.target.value)}
              placeholder={`Enter ${unit.shortLabel} value`}
              className="font-mono"
            />
          </div>
        ))}
      </div>

      {activeUnit && inputValue && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800">
            <span className="font-semibold">Active:</span> {units.find(u => u.key === activeUnit)?.label} = {inputValue} {units.find(u => u.key === activeUnit)?.shortLabel}
          </div>
        </div>
      )}
    </div>
  );
};
