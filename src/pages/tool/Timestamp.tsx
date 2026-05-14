import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const Timestamp = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentTimestampS, setCurrentTimestampS] = useState(0);
  const [currentTimestampM, setCurrentTimestampM] = useState(0);
  const [timestampInput, setTimestampInput] = useState('');
  const [datetimeInput, setDatetimeInput] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US'));
      setCurrentTimestampS(Math.round(now.getTime() / 1000));
      setCurrentTimestampM(now.getTime());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // 时间戳 → 时间转换
  const timestampToTime = useMemo(() => {
    if (!timestampInput.trim()) {
      return { valid: true };
    }

    const ts = timestampInput.trim();
    let timestamp: number;

    // 判断是秒还是毫秒时间戳
    if (ts.length === 13) {
      timestamp = parseInt(ts);
    } else if (ts.length === 10) {
      timestamp = parseInt(ts) * 1000;
    } else {
      return { valid: false, error: 'Timestamp must be 10 (seconds) or 13 (milliseconds) digits' };
    }

    if (isNaN(timestamp)) {
      return { valid: false, error: 'Invalid timestamp format' };
    }

    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return { valid: false, error: 'Invalid timestamp value' };
      }
      return { valid: true, time: date.toLocaleString('en-US') };
    } catch {
      return { valid: false, error: 'Conversion failed' };
    }
  }, [timestampInput]);

  // 时间 → 时间戳转换
  const datetimeToTimestamp = useMemo(() => {
    if (!datetimeInput.trim()) {
      return { valid: true };
    }

    try {
      const date = new Date(datetimeInput.trim());
      if (isNaN(date.getTime())) {
        return { valid: false, error: 'Invalid date format' };
      }
      const timestampS = Math.round(date.getTime() / 1000);
      const timestampM = date.getTime();
      return { valid: true, timestampS, timestampM };
    } catch {
      return { valid: false, error: 'Conversion failed' };
    }
  }, [datetimeInput]);

  const displayTime = timestampToTime.valid ? timestampToTime.time : null;
  const displayTimestampError = timestampToTime.valid ? null : (timestampToTime.error || 'Invalid timestamp');

  const displayTimestampS = datetimeToTimestamp.valid ? datetimeToTimestamp.timestampS : null;
  const displayTimestampM = datetimeToTimestamp.valid ? datetimeToTimestamp.timestampM : null;
  const displayDatetimeError = datetimeToTimestamp.valid ? null : (datetimeToTimestamp.error || 'Invalid datetime');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Timestamp Converter</h1>
      </div>

      {/* Current Time Display */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-700">Current Time</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Current Time</div>
            <div className="text-lg font-mono font-semibold">{currentTime}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Timestamp (seconds)</div>
            <div className="text-lg font-mono font-semibold">{currentTimestampS}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Timestamp (milliseconds)</div>
            <div className="text-lg font-mono font-semibold">{currentTimestampM}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp to Time */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Timestamp → Time
            </label>
            {timestampInput && (
              <div className="flex items-center gap-2">
                {displayTimestampError ? (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Invalid
                  </span>
                ) : (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Valid
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-[300px]">
            <Input
              placeholder="Enter timestamp (10 or 13 digits)"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              className={`w-full font-mono text-sm ${
                displayTimestampError ? 'border-red-300 focus-visible:ring-red-500' : ''
              }`}
            />
            {displayTimestampError && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 mt-2">
                {displayTimestampError}
              </div>
            )}
            <div className="mt-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Converted Time
              </label>
              {displayTime ? (
                <Textarea
                  rows={8}
                  value={displayTime}
                  readOnly
                  className="w-full font-mono text-sm bg-gray-50"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center min-h-[150px]">
                  <div className="text-gray-400 text-sm">Converted time will appear here...</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Time to Timestamp */}
        <div className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Time → Timestamp
            </label>
            {datetimeInput && (
              <div className="flex items-center gap-2">
                {displayDatetimeError ? (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Invalid
                  </span>
                ) : (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Valid
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-[300px]">
            <Input
              placeholder="Enter date/time (e.g., 2024-01-01 12:00:00)"
              value={datetimeInput}
              onChange={(e) => setDatetimeInput(e.target.value)}
              className={`w-full font-mono text-sm ${
                displayDatetimeError ? 'border-red-300 focus-visible:ring-red-500' : ''
              }`}
            />
            {displayDatetimeError && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 mt-2">
                {displayDatetimeError}
              </div>
            )}
            <div className="mt-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Converted Timestamps
              </label>
              {displayTimestampS !== null && displayTimestampM !== null ? (
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Seconds (10 digits)</div>
                    <Textarea
                      rows={3}
                      value={displayTimestampS?.toString() || ''}
                      readOnly
                      className="w-full font-mono text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Milliseconds (13 digits)</div>
                    <Textarea
                      rows={3}
                      value={displayTimestampM?.toString() || ''}
                      readOnly
                      className="w-full font-mono text-sm bg-gray-50"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center min-h-[150px]">
                  <div className="text-gray-400 text-sm">Converted timestamps will appear here...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
