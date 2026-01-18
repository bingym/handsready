import { Card, CardContent } from '@/components/ui/Card';

const sourceData = [
  { name: 'npm', mirrors: ['https://registry.npmmirror.com', 'https://registry.npm.taobao.org'] },
  { name: 'yarn', mirrors: ['https://registry.npmmirror.com', 'https://registry.yarnpkg.com'] },
  { name: 'pip', mirrors: ['https://pypi.tuna.tsinghua.edu.cn/simple', 'https://mirrors.aliyun.com/pypi/simple'] },
  { name: 'Maven', mirrors: ['https://maven.aliyun.com/repository/public', 'https://repo1.maven.org/maven2'] },
  { name: 'Docker', mirrors: ['https://docker.mirrors.ustc.edu.cn', 'https://hub-mirror.c.163.com'] },
  { name: 'Go', mirrors: ['https://goproxy.cn', 'https://goproxy.io'] },
];

export const Source = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mirror Sources</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {sourceData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <h3 className="font-semibold text-lg mb-3">{item.name}</h3>
                <div className="space-y-2">
                  {item.mirrors.map((mirror, mirrorIndex) => (
                    <div key={mirrorIndex} className="font-mono text-sm bg-gray-50 p-2 rounded">
                      {mirror}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
