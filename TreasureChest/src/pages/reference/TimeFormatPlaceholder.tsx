import { Card, CardContent } from '@/components/ui/Card';

const timeFormatData = [
  { meaning: 'Abbreviated weekday name', symbol: '%a' },
  { meaning: 'Full weekday name', symbol: '%A' },
  { meaning: 'Abbreviated month name', symbol: '%b' },
  { meaning: 'Full month name', symbol: '%B' },
  { meaning: 'Date and time representation', symbol: '%c' },
  { meaning: 'Year divided by 100 and truncated to integer', symbol: '%C' },
  { meaning: 'Day of the month, zero-padded (01-31)', symbol: '%d' },
  { meaning: 'Short date format (MM/DD/YY)', symbol: '%D' },
  { meaning: 'Day of the month, space-padded ( 1-31)', symbol: '%e' },
  { meaning: 'Short date format (YYYY-MM-DD)', symbol: '%F' },
  { meaning: 'ISO 8601 week-based year (2 digits)', symbol: '%g' },
  { meaning: 'ISO 8601 week-based year (4 digits)', symbol: '%G' },
  { meaning: 'Abbreviated month name (same as %b)', symbol: '%h' },
  { meaning: 'Hour in 24h format (00-23)', symbol: '%H' },
  { meaning: 'Hour in 12h format (01-12)', symbol: '%I' },
  { meaning: 'Day of the year (001-366)', symbol: '%j' },
  { meaning: 'Month as a decimal number (01-12)', symbol: '%m' },
  { meaning: 'Minute (00-59)', symbol: '%M' },
  { meaning: 'New-line character', symbol: '%n' },
  { meaning: 'AM or PM designation', symbol: '%p' },
  { meaning: '12-hour clock time (hh:mm:ss AM/PM)', symbol: '%r' },
  { meaning: '24-hour clock time (hh:mm:ss)', symbol: '%T' },
  { meaning: 'ISO 8601 weekday as number with Monday as 1 (1-7)', symbol: '%u' },
  { meaning: 'Week number with the first Sunday as the first day of week one (00-53)', symbol: '%U' },
  { meaning: 'ISO 8601 week number (01-53)', symbol: '%V' },
  { meaning: 'Weekday as a decimal number with Sunday as 0 (0-6)', symbol: '%w' },
  { meaning: 'Week number with the first Monday as the first day of week one (00-53)', symbol: '%W' },
  { meaning: 'Date representation', symbol: '%x' },
  { meaning: 'Time representation', symbol: '%X' },
  { meaning: 'Year, 4 digits', symbol: '%Y' },
  { meaning: 'Year, 2 digits', symbol: '%y' },
  { meaning: 'Timezone name or abbreviation', symbol: '%Z' },
  { meaning: 'A % sign', symbol: '%%' },
];

export const TimeFormatPlaceholder = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Time Format Placeholders</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold">Meaning</th>
                  <th className="text-left p-3 font-semibold">Symbol</th>
                </tr>
              </thead>
              <tbody>
                {timeFormatData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{item.meaning}</td>
                    <td className="p-3 font-mono">{item.symbol}</td>
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
