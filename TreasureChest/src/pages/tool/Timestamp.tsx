import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const Timestamp = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentTimestampS, setCurrentTimestampS] = useState(0);
  const [currentTimestampM, setCurrentTimestampM] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const [convertedTime, setConvertedTime] = useState('');

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

  const handleConvert = () => {
    let ts = timestamp.trim();
    if (ts.length === 13) {
      ts = parseInt(ts).toString();
    } else if (ts.length === 10) {
      ts = (parseInt(ts) * 1000).toString();
    } else {
      return;
    }
    setConvertedTime(new Date(parseInt(ts)).toLocaleString('en-US'));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Timestamp</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Current Time: {currentTime}</p>
          <p className="mb-2">Current Timestamp (seconds): {currentTimestampS}</p>
          <p>Current Timestamp (milliseconds): {currentTimestampM}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Timestamp to Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              placeholder="Enter timestamp"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={handleConvert}>
              Convert
            </Button>
          </div>
          <div>
            <Input
              placeholder="Converted time"
              value={convertedTime}
              readOnly
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
