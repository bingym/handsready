package page

import (
	"github.com/gin-gonic/gin"
	"taiyuan/kits/retKit"
)

func getReferenceBaseRet() map[string]interface{} {
	return map[string]interface{}{
		"column": "reference",
	}
}

func ReferenceIndexCtl(c *gin.Context) {
	linkGroups := []LinkGroup{
		{
			Name: "开发",
			Data: []LinkSubGroup{
				{Name: "技术博客", Links: []Link{
					{Title: "美团技术博客", URL: "https://tech.meituan.com/"},
					{Title: "小米信息部技术团队", URL: "https://xiaomi-info.github.io/"},
				}},
				{Name: "代码规范", Links: []Link{
					{Title: "Google开源项目指南", URL: "https://zh-google-styleguide.readthedocs.io/en/latest/"},
					{Title: "Uber Go风格指南", URL: "https://github.com/xxjwxc/uber_go_guide_cn"},
					{Title: "PEP8", URL: " https://www.python.org/dev/peps/pep-008/"},
				}},
				{Name: "Web前端", Links: []Link{
					{Title: "MDN", URL: "https://developer.mozilla.org/zh-CN/docs/Web"},
					{Title: "Vue.js", URL: "https://cn.vuejs.org/v2/guide/"},
					{Title: "Bootstrap4中文文档", URL: "https://code.z01.com/v4/docs/"},
					{Title: "Moment.js中文文档", URL: "http://momentjs.cn/"},
					{Title: "HTML转义字符", URL: "/reference/http-mark"},
				}},
				{Name: "服务器开发", Links: []Link{
					{Title: "设计数据密集型应用", URL: "https://vonng.gitbooks.io/ddia-cn/content/"},
					{Title: "Linux C编程一站式学习", URL: "http://docs.linuxtone.org/ebooks/C&CPP/c/index.html"},
					{Title: "时间格式化占位符", URL: "/reference/time-format-placeholder"},
					{Title: "镜像源", URL: "/reference/source"},
				}},
				{Name: "数据库", Links: []Link{
					{Title: "PostgreSQL 10.1 手册", URL: "http://www.postgres.cn/docs/10/index.html"},
				}},
				{Name: "Golang", Links: []Link{
					{Title: "Go标准库中文文档", URL: "https://studygolang.com/pkgdoc"},
					{Title: "《Effective Go》中英双语版", URL: "https://bingohuang.gitbooks.io/effective-go-zh-en/content/"},
					{Title: "Go语言高级编程", URL: "https://chai2010.cn/advanced-go-programming-book/"},
					{Title: "Go101", URL: "https://gfw.go101.org/article/101.html"},
					{Title: "Go语言入门指南", URL: "https://github.com/unknwon/the-way-to-go_ZH_CN/blob/master/eBook/directory.md"},
				}},
				{Name: "Python", Links: []Link{
					{Title: "Python Cookbook", URL: "https://python3-cookbook.readthedocs.io/zh_CN/latest/preface.html"},
					{Title: "Effective Python", URL: "https://guoruibiao.gitbooks.io/effective-python/content/"},
					{Title: "Python数据结构和算法", URL: "https://xidianwlc.gitbooks.io/python-data-structrue-and-algrothms/content/"},
					{Title: "Python并行编程", URL: "https://python-parallel-programmning-cookbook.readthedocs.io/zh_CN/latest/index.html"},
				}},
			},
		},
		{
			Name: "生活",
			Data: []LinkSubGroup{
				{Name: "生活", Links: []Link{
					{Title: "全国车牌大全", URL: "/reference/carno"},
				}},
			},
		},
		{
			Name: "站长",
			Data: []LinkSubGroup{
				{Name: "域名", Links: []Link{
					{Title: "域名大全", URL: "/reference/domain"},
				}},
			},
		},
	}
	ret := getReferenceBaseRet()
	ret["linkGroups"] = linkGroups
	retKit.HTMLData(c, "reference/index.html", ret)

}
func GithubCtl(c *gin.Context) {
	ret := getReferenceBaseRet()
	repoGroups := []RepoGroup{
		{"大乱炖", []Repo{
			{Name: "GitHub-Chinese-Top-Charts", URL: "https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts", Description: "GitHub中文排行榜，帮助你发现高分优秀中文项目、更高效地吸收国人的优秀经验成果；榜单每周更新一次，敬请关注！"},
		}},
		{"C", []Repo{
			{Name: "Tinyhttpd", URL: "https://github.com/EZLippi/Tinyhttpd", Description: "Tinyhttpd 是J. David Blackstone在1999年写的一个不到 500 行的超轻量型 Http Server，用来学习非常不错，可以帮助我们真正理解服务器程序的本质"},
		}},
		{"Golang", []Repo{
			{Name: "golang-open-source-projects", Description: "为互联网IT人打造的中文版awesome-go", URL: "https://github.com/hackstoic/golang-open-source-projects"},
			{"Go语言四十二章经", "《Go语言四十二章经》详细讲述Go语言规范与语法细节及开发中常见的误区，通过研读标准库等经典代码设计模式，启发读者深刻理解Go语言的核心思维，进入Go语言开发的更高阶段。", "https://github.com/ffhelicopter/Go42"},
			{"Go夜读", "每周通过 zoom 在线直播的方式分享 Go 相关的技术话题，每天大家在微信/Slack 上及时沟通交流编程技术话题。", "https://github.com/tooler-learning/night-reading-go"},
			{"Mastering_Go_ZH_CN", "《Mastering GO》中文译本，暂时命名为《玩转 GO》。", "https://github.com/hantmac/Mastering_Go_ZH_CN"},
			{"machinery(Go版Celery)", "Machinery is an asynchronous task queue/job queue based on distributed message passing.", "https://github.com/RichardKnop/machinery"},
			{"identicon", "Go 语言版 identicon 头像产生工具", "https://github.com/issue9/identicon"},
			{"Wechat", "WeChat SDK for Go （微信SDK：简单、易用）", "https://github.com/silenceper/wechat"},
			{"goquery(Go版PyQuery)", "A little like that j-thing, only in Go.", "https://github.com/PuerkitoBio/goquery"},
			{"gojieba", "\"结巴\"中文分词的Golang版本", "https://github.com/yanyiwu/gojieba"},
			{"Gin Web Framework", "", "https://github.com/gin-gonic/gin"},
		}},
		{"Python", []Repo{
			{Name: "Awesome Python", URL: "https://github.com/vinta/awesome-python", Description: ""},
		}},
	}
	ret["repoGroups"] = repoGroups
	retKit.HTMLData(c, "tool/github.html", ret)
}

func EbookCtl(c *gin.Context) {
	bookGroups := []EbookGroup{
		{Name: "代码规范", Books: []Ebook{
			Ebook{"代码整洁之道(Clean Code)", "", "https://book.douban.com/subject/4199741/"},
		}},
		{Name: "版本控制", Books: []Ebook{
			Ebook{"Pro Git", "", "https://progit.bootcss.com"},
		}},
		{Name: "Unix", Books: []Ebook{
			Ebook{"Unix环境高级编程(APUE)", "", "https://book.douban.com/subject/25900403/"},
			Ebook{"理解Linux进程", "本书受理解Unix进程启发而作，用极简的篇幅深入学习进程知识", "https://tobegit3hub1.gitbooks.io/understanding-linux-processes/content/"},
		}},
		{Name: "C", Books: []Ebook{
			Ebook{"Linux C编程一站式学习", "", "http://docs.linuxtone.org/ebooks/C&CPP/c/index.html"},
		}},
		{Name: "Python", Books: []Ebook{
			Ebook{"Python并行编程 中文版", "Python Parallel Programmning Cookbook", "https://python-parallel-programmning-cookbook.readthedocs.io/zh_CN/latest/index.html"},
			Ebook{"Python3-Cookbook", "", "https://python3-cookbook.readthedocs.io/zh_CN/latest/preface.html"},
			Ebook{"Python数据结构和算法", "", "https://xidianwlc.gitbooks.io/python-data-structrue-and-algrothms/content/"},
			Ebook{"Effective Python", "", "https://guoruibiao.gitbooks.io/effective-python/content/"},
		}},
		{Name: "Golang", Books: []Ebook{
			Ebook{"Go语言圣经中文版", "", "https://books.studygolang.com/gopl-zh/"},
			Ebook{"Go语言高级编程", "books 《Go语言高级编程》开源图书，涵盖CGO、Go汇编语言、RPC实现、Protobuf插件实现、Web框架实现、分布式系统等高阶主题", "https://github.com/chai2010/advanced-go-programming-book"},
			Ebook{"Go 入门指南", "《The Way to Go》中文译本", "https://github.com/unknwon/the-way-to-go_ZH_CN"},
			Ebook{"build-web-application-with-golang", "", "https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/preface.md"},
		}},
		{Name: "JavaScript", Books: []Ebook{
			Ebook{"ECMAScript6 入门", "", "http://es6.ruanyifeng.com/"},
		}},
	}
	ret := getReferenceBaseRet()
	ret["bookGroups"] = bookGroups
	retKit.HTMLData(c, "reference/ebook.html", ret)
}

func SourceCtl(c *gin.Context) {
	retKit.HTMLData(c, "reference/source.html", getReferenceBaseRet())
}

func DomainCtl(c *gin.Context) {
	retKit.HTMLData(c, "reference/domain.html", getReferenceBaseRet())
}

func CarnoCtl(c *gin.Context) {
	retKit.HTMLData(c, "reference/carno.html", getReferenceBaseRet())
}

func HttpcodeCtl(c *gin.Context) {
	retKit.HTMLData(c, "reference/http_code.html", getReferenceBaseRet())
}

func HtmlMarkCtl(c *gin.Context) {
	retKit.HTMLData(c, "reference/html_mark.html", getReferenceBaseRet())
}

func TimeFormatPlaceholderCtl(c *gin.Context) {
	retKit.HTMLData(c, "reference/time_format_placeholder.html", getReferenceBaseRet())
}
