import { Card, CardContent } from '@/components/ui/Card';

const domainData = [
  { tld: '.com', description: 'Commercial organizations, most common TLD' },
  { tld: '.org', description: 'Non-profit organizations' },
  { tld: '.net', description: 'Network service providers' },
  { tld: '.edu', description: 'Educational institutions' },
  { tld: '.gov', description: 'Government agencies' },
  { tld: '.cn', description: 'China country code TLD' },
  { tld: '.com.cn', description: 'China commercial organizations' },
  { tld: '.net.cn', description: 'China network service providers' },
  { tld: '.org.cn', description: 'China non-profit organizations' },
  { tld: '.io', description: 'Input/Output, commonly used by tech companies' },
  { tld: '.co', description: 'Company, commercial use' },
  { tld: '.me', description: 'Personal websites' },
  { tld: '.info', description: 'Information websites' },
  { tld: '.biz', description: 'Business' },
  { tld: '.xyz', description: 'Generic TLD' },
];

export const Domain = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Domain Extensions</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold">TLD</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {domainData.map((item) => (
                  <tr key={item.tld} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-mono font-medium">{item.tld}</td>
                    <td className="p-3">{item.description}</td>
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
