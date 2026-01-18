import type { LinkGroup } from '@/types';

export const referenceData: LinkGroup[] = [
  {
    Name: 'Book & Handbook',
    Data: [
      {
        Name: 'Web Development',
        Links: [
          { Title: 'RFC(Request For Comments)', URL: 'https://www.ietf.org/rfc/' },
          { Title: '设计数据密集型应用(DDIA)', URL: 'https://vonng.gitbooks.io/ddia-cn/content/' },
          { Title: 'OpenResty 最佳实践', URL: 'https://moonbingbing.gitbooks.io/openresty-best-practices/content/' },
        ],
      },
      {
        Name: 'Linux & C',
        Links: [
          { Title: 'Linux C编程一站式学习', URL: 'http://docs.linuxtone.org/ebooks/C&CPP/c/index.html' },
          { Title: 'Linux C API 参考手册', URL: 'https://wizardforcel.gitbooks.io/linux-c-api-ref/content/index.html' },
          { Title: '阮一峰C语言教程', URL: 'https://wangdoc.com/clang/' },
        ],
      },
      {
        Name: 'Data structure & Algorithm',
        Links: [
          { Title: 'labuladong的算法小抄', URL: 'https://labuladong.github.io/algo/' },
        ],
      },
      {
        Name: 'Python',
        Links: [
          { Title: 'Python Cookbook', URL: 'https://python3-cookbook.readthedocs.io/zh_CN/latest/preface.html' },
          { Title: 'Effective Python', URL: 'https://guoruibiao.gitbooks.io/effective-python/content/' },
          { Title: 'Python数据结构和算法', URL: 'https://xidianwlc.gitbooks.io/python-data-structrue-and-algrothms/content/' },
          { Title: 'Python并行编程', URL: 'https://python-parallel-programmning-cookbook.readthedocs.io/zh_CN/latest/index.html' },
          { Title: 'Django Admin Cookbook', URL: 'https://django-admin-cookbook-cn.readthedocs.io/en/latest/index.html' },
        ],
      },
      {
        Name: 'Golang',
        Links: [
          { Title: 'Go标准库中文文档', URL: 'https://studygolang.com/pkgdoc' },
          { Title: '《Effective Go》中英双语版', URL: 'https://bingohuang.gitbooks.io/effective-go-zh-en/content/' },
          { Title: 'GO语言高级编程', URL: 'https://chai2010.cn/advanced-go-programming-book/' },
          { Title: 'Go101', URL: 'https://gfw.go101.org/article/101.html' },
          { Title: 'Go语言入门指南', URL: 'https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/directory.md' },
          { Title: 'Golang修养之路', URL: 'https://github.com/aceld/golang' },
          { Title: 'Go语言高性能编程', URL: 'https://geektutu.com/post/high-performance-go.html' },
          { Title: 'Go语言设计与实现', URL: 'https://draveness.me/golang/' },
          { Title: 'Golang修养之路', URL: 'https://www.kancloud.cn/aceld/golang/1858955' },
        ],
      },
      {
        Name: 'Rust',
        Links: [
          { Title: 'Rust程序设计语言', URL: 'https://rustwiki.org/zh-CN/book/title-page.html' },
        ],
      },
    ],
  },
  {
    Name: 'Development',
    Data: [
      {
        Name: 'Documentation/Manual',
        Links: [
          { Title: 'quickref.me', URL: 'https://quickref.me/' },
          { Title: 'PostgreSQL 10.1 手册', URL: 'http://www.postgres.cn/docs/10/index.html' },
          { Title: 'MDN', URL: 'https://developer.mozilla.org/zh-CN/docs/Web' },
          { Title: 'Consul 简介和快速入门', URL: 'https://book-consul-guide.vnzmi.com/' },
          { Title: 'Vue.js', URL: 'https://cn.vuejs.org/v2/guide/' },
          { Title: 'Bootstrap4中文文档', URL: 'https://code.z01.com/v4/docs/' },
          { Title: 'Moment.js中文文档', URL: 'http://momentjs.cn/' },
        ],
      },
      {
        Name: 'Tech Blogs',
        Links: [
          { Title: '美团技术博客', URL: 'https://tech.meituan.com/' },
          { Title: '小米信息部技术团队', URL: 'https://xiaomi-info.github.io/' },
          { Title: '小菜学编程', URL: 'https://fasionchan.com/' },
          { Title: '左书祺', URL: 'https://draveness.me/' },
          { Title: 'DarkSun的个人博客 linux和它的小伙伴', URL: 'http://blog.lujun9972.win/tags/linux%E5%92%8C%E5%AE%83%E7%9A%84%E5%B0%8F%E4%BC%99%E4%BC%B4/' },
          { Title: '曹春晖', URL: 'https://www.xargin.com/' },
          { Title: '饶全成', URL: 'https://qcrao.com/' },
        ],
      },
      {
        Name: 'Code Style',
        Links: [
          { Title: 'Google开源项目指南', URL: 'https://zh-google-styleguide.readthedocs.io/en/latest/' },
          { Title: 'Uber Go风格指南', URL: 'https://github.com/xxjwxc/uber_go_guide_cn' },
          { Title: 'PEP8', URL: ' https://www.python.org/dev/peps/pep-008/' },
        ],
      },
      {
        Name: 'Web Frontend',
        Links: [
          { Title: 'HTML转义字符', URL: '/reference/http-mark' },
        ],
      },
      {
        Name: 'Server Development',
        Links: [
          { Title: 'ASCII码表', URL: '/reference/ascii-table' },
          { Title: '时间格式化占位符', URL: '/reference/time-format-placeholder' },
          { Title: '镜像源', URL: '/reference/source' },
        ],
      },
    ],
  },
  {
    Name: 'Work',
    Data: [
      {
        Name: 'Resume',
        Links: [
          { Title: '木及简历', URL: 'https://www.mujicv.com' },
        ],
      },
    ],
  },
  {
    Name: 'Life',
    Data: [
      {
        Name: 'Life',
        Links: [
          { Title: '全国车牌大全', URL: '/reference/carno' },
        ],
      },
    ],
  },
  {
    Name: 'Webmaster',
    Data: [
      {
        Name: 'Domain',
        Links: [
          { Title: '域名大全', URL: '/reference/domain' },
        ],
      },
    ],
  },
];
