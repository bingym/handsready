import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const Source = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">镜像源</h1>
      <div className="space-y-6">
        {/* 通用源 */}
        <Card>
          <CardHeader>
            <CardTitle>通用源</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                  <a href="https://mirror.tuna.tsinghua.edu.cn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    清华大学
                  </a>
                </code>
              </li>
              <li>
                <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                  <a href="https://mirrors.cloud.tencent.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    腾讯云
                  </a>
                </code>
              </li>
              <li>
                <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                  <a href="https://opsx.alibaba.com/mirror?lang=zh-CN" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    阿里云
                  </a>
                </code>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Python pip源 */}
        <Card>
          <CardHeader>
            <CardTitle>Python pip源</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">地址</h5>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">清华</code>
                  <samp className="font-mono text-sm">https://pypi.tuna.tsinghua.edu.cn/simple</samp>
                </li>
                <li className="flex items-center gap-2">
                  <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">中科大</code>
                  <samp className="font-mono text-sm">https://pypi.mirrors.ustc.edu.cn/simple/</samp>
                </li>
                <li className="flex items-center gap-2">
                  <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">阿里云</code>
                  <samp className="font-mono text-sm">https://mirrors.aliyun.com/pypi/simple</samp>
                </li>
                <li className="flex items-center gap-2">
                  <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">豆瓣</code>
                  <samp className="font-mono text-sm">https://pypi.douban.com/simple/</samp>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">使用</h5>
              <p className="mb-2 text-gray-700">
                在Linux系统中，修改~/.pip/pip.conf文件；在Windows系统中，修改C:\Users\XXX\pip\pip.ini文件。如果没有上述文件，需要手动建立。
                在文件中输入以下内容：
              </p>
              <pre className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
{`[global]
index-url = https://pypi.mirrors.ustc.edu.cn/simple/
[install]
trusted-host = mirrors.ustc.edu.cn`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Go Modules 代理 */}
        <Card>
          <CardHeader>
            <CardTitle>Go Modules 代理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">地址</h5>
              <ul className="space-y-2">
                <li>
                  <samp className="font-mono text-sm">https://goproxy.io</samp>
                </li>
                <li>
                  <samp className="font-mono text-sm">https://goproxy.cn</samp>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">使用</h5>
              <code className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                export GOPROXY="https://goproxy.cn"
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Ubuntu源 */}
        <Card>
          <CardHeader>
            <CardTitle>Ubuntu源</CardTitle>
          </CardHeader>
          <CardContent>
            <a href="https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Ubuntu镜像使用帮助
            </a>
          </CardContent>
        </Card>

        {/* Debian源 */}
        <Card>
          <CardHeader>
            <CardTitle>Debian源</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href="https://mirror.tuna.tsinghua.edu.cn/help/debian/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
              Debian镜像使用帮助
            </a>
            <hr className="border-gray-200" />
            <div>
              <p className="mb-2">debian11</p>
              <pre className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
{`echo -e "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free\ndeb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free\ndeb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free\ndeb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free" > /etc/apt/sources.list`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
