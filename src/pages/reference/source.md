# 镜像源

## 通用源

- [`清华大学`](https://mirror.tuna.tsinghua.edu.cn)
- [`腾讯云`](https://mirrors.cloud.tencent.com)
- [`阿里云`](https://opsx.alibaba.com/mirror?lang=zh-CN)

## Python pip源

### 地址

- `清华` https://pypi.tuna.tsinghua.edu.cn/simple
- `中科大` https://pypi.mirrors.ustc.edu.cn/simple/
- `阿里云` https://mirrors.aliyun.com/pypi/simple

### 使用

在Linux系统中，修改~/.pip/pip.conf文件；在Windows系统中，修改C:\Users\XXX\pip\pip.ini文件。如果没有上述文件，需要手动建立。
在文件中输入以下内容：

```ini
[global]
index-url = https://pypi.mirrors.ustc.edu.cn/simple/
[install]
trusted-host = mirrors.ustc.edu.cn
```

## Go Modules 代理

```bash
export GOPROXY="https://goproxy.cn"
export GOPROXY="https://goproxy.io"
```

## Ubuntu源

- [清华](https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/)
- [中科大](https://mirrors.ustc.edu.cn/help/ubuntu.htm)

```bash
# sources.list格式
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list

# DEB822格式
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list.d/ubuntu.sources
```

## Debian源

[清华](https://mirror.tuna.tsinghua.edu.cn/help/debian/)
[中科大](https://mirrors.ustc.edu.cn/help/debian.html)

```bash
# sources.list格式
sudo sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

# DEB822格式
sudo sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources
```
