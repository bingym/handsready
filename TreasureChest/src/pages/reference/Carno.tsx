import { Card, CardContent } from '@/components/ui/Card';

const carnoData = [
  { code: '京', province: '北京' },
  { code: '津', province: '天津' },
  { code: '沪', province: '上海' },
  { code: '渝', province: '重庆' },
  { code: '冀', province: '河北' },
  { code: '豫', province: '河南' },
  { code: '云', province: '云南' },
  { code: '辽', province: '辽宁' },
  { code: '黑', province: '黑龙江' },
  { code: '湘', province: '湖南' },
  { code: '皖', province: '安徽' },
  { code: '鲁', province: '山东' },
  { code: '新', province: '新疆' },
  { code: '苏', province: '江苏' },
  { code: '浙', province: '浙江' },
  { code: '赣', province: '江西' },
  { code: '鄂', province: '湖北' },
  { code: '桂', province: '广西' },
  { code: '甘', province: '甘肃' },
  { code: '晋', province: '山西' },
  { code: '蒙', province: '内蒙古' },
  { code: '陕', province: '陕西' },
  { code: '吉', province: '吉林' },
  { code: '闽', province: '福建' },
  { code: '贵', province: '贵州' },
  { code: '粤', province: '广东' },
  { code: '青', province: '青海' },
  { code: '藏', province: '西藏' },
  { code: '川', province: '四川' },
  { code: '宁', province: '宁夏' },
  { code: '琼', province: '海南' },
  { code: '港', province: '香港' },
  { code: '澳', province: '澳门' },
  { code: '台', province: '台湾' },
];

export const Carno = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">License Plate Codes</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold">Code</th>
                  <th className="text-left p-3 font-semibold">Province/Region</th>
                </tr>
              </thead>
              <tbody>
                {carnoData.map((item) => (
                  <tr key={item.code} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-bold text-lg">{item.code}</td>
                    <td className="p-3">{item.province}</td>
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
