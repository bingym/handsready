import { Card, CardContent } from '@/components/ui/Card';

const generateAsciiData = () => {
  const data: Array<{ key: string; value1: string; char1: string; value2: string; char2: string; value3: string; char3: string; value4: string; char4: string }> = [];
  
  for (let i = 0; i < 32; i++) {
    const row: any = {
      key: `${i}`,
      value1: i.toString(),
      char1: getAsciiChar(i),
      value2: (i + 32).toString(),
      char2: getAsciiChar(i + 32),
      value3: (i + 64).toString(),
      char3: getAsciiChar(i + 64),
      value4: (i + 96).toString(),
      char4: getAsciiChar(i + 96),
    };
    data.push(row);
  }
  
  return data;
};

const getAsciiChar = (code: number): string => {
  if (code < 32) {
    const controlChars: { [key: number]: string } = {
      0: 'NUT', 1: 'SOH', 2: 'STX', 3: 'ETX', 4: 'EOT', 5: 'ENQ', 6: 'ACK',
      7: 'BEL', 8: 'BS', 9: 'HT', 10: 'LF', 11: 'VT', 12: 'FF', 13: 'CR',
      14: 'SO', 15: 'SI', 16: 'DLE', 17: 'DC1', 18: 'DC2', 19: 'DC3',
      20: 'DC4', 21: 'NAK', 22: 'SYN', 23: 'ETB', 24: 'CAN', 25: 'EM',
      26: 'SUB', 27: 'ESC', 28: 'FS', 29: 'GS', 30: 'RS', 31: 'US',
    };
    return controlChars[code] || '';
  }
  if (code === 32) return '(space)';
  if (code === 127) return 'DEL';
  return String.fromCharCode(code);
};

const asciiData = generateAsciiData();

export const AsciiTable = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">ASCII Table</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3 font-semibold">ASCII Value</th>
                  <th className="p-3 font-semibold">Character</th>
                  <th className="p-3 font-semibold">ASCII Value</th>
                  <th className="p-3 font-semibold">Character</th>
                  <th className="p-3 font-semibold">ASCII Value</th>
                  <th className="p-3 font-semibold">Character</th>
                  <th className="p-3 font-semibold">ASCII Value</th>
                  <th className="p-3 font-semibold">Character</th>
                </tr>
              </thead>
              <tbody>
                {asciiData.map((row) => (
                  <tr key={row.key} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2">{row.value1}</td>
                    <td className="p-2">{row.char1}</td>
                    <td className="p-2">{row.value2}</td>
                    <td className="p-2">{row.char2}</td>
                    <td className="p-2">{row.value3}</td>
                    <td className="p-2">{row.char3}</td>
                    <td className="p-2">{row.value4}</td>
                    <td className="p-2">{row.char4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
