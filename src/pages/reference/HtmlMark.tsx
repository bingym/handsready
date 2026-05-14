import { Card, CardContent } from '@/components/ui/Card';

const htmlEscapeData = [
  { char: '"', decimal: '&#34;', entity: '&quot;' },
  { char: '&', decimal: '&#38;', entity: '&amp;' },
  { char: '<', decimal: '&#60;', entity: '&lt;' },
  { char: '>', decimal: '&#62;', entity: '&gt;' },
  { char: 'Non-breaking space', decimal: '&#160;', entity: '&nbsp;' },
  { char: '¡', decimal: '&#161;', entity: '&iexcl;' },
  { char: '¢', decimal: '&#162;', entity: '&cent;' },
  { char: '£', decimal: '&#163;', entity: '&pound;' },
  { char: '¥', decimal: '&#165;', entity: '&yen;' },
  { char: '©', decimal: '&#169;', entity: '&copy;' },
  { char: '®', decimal: '&#174;', entity: '&reg;' },
  { char: '°', decimal: '&#176;', entity: '&deg;' },
  { char: '±', decimal: '&#177;', entity: '&plusmn;' },
  { char: '×', decimal: '&#215;', entity: '&times;' },
  { char: '÷', decimal: '&#247;', entity: '&divide;' },
];

export const HtmlMark = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">HTML Escape Characters</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold">Character</th>
                  <th className="text-left p-3 font-semibold">Decimal</th>
                  <th className="text-left p-3 font-semibold">Entity</th>
                </tr>
              </thead>
              <tbody>
                {htmlEscapeData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-bold">{item.char}</td>
                    <td className="p-3 font-mono">{item.decimal}</td>
                    <td className="p-3 font-mono">{item.entity}</td>
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
