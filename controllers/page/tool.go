package page

import (
	"github.com/gin-gonic/gin"
	"taiyuan/kits/retKit"
)

func getToolBaseRet() map[string]interface{} {
	return map[string]interface{}{
		"column": "tool",
	}
}

func ToolIndexCtl(c *gin.Context) {
	funcGroups := []FuncGroup{
		{
			"开发",
			[]SingleFunc{
				{Name: "JSON格式化", Path: "/tool/json-format"},
				{Name: "SQL格式化", Path: "/tool/sql-format"},
				{Name: "时间戳", Path: "/tool/timestamp"},
				{Name: "MD5", Path: "/tool/md5"},
				{Name: "Base64编/解码", Path: "/tool/base64"},
				{Name: "unicode/中文", Path: "/tool/unicode-zh"},
				{Name: "正则表达式", Path: "/tool/regex"},
				{Name: "字节计算器", Path: "/tool/byte-calc"},
				{Name: "UUID", Path: "/tool/uuid"},
				{Name: "URL编/解码", Path: "/tool/url-encode-decode"},
				{Name: "字符统计", Path: "/tool/word-count"},
				{Name: "字节统计", Path: "/tool/byte-count"},
			},
		},
		{
			"摄影",
			[]SingleFunc{
				{
					Name: "EXIF信息",
					Path: "/tool/exif-info",
				},
				{
					Name: "索尼微单快门数查询",
					Path: "/tool/sony-shutters",
				},
			},
		},
		{
			"其他",
			[]SingleFunc{
				{Name: "推送到iOS", Path: "/tool/push2ios"},
				{Name: "二维码", Path: "/tool/qrcode"},
				{Name: "随机密码生成", Path: "/tool/random-chars"},
				{Name: "文本对比", Path: "/tool/text-diff"},
			},
		},
	}
	ret := getToolBaseRet()
	ret["funcGroups"] = funcGroups
	retKit.HTMLData(c, "tool/index.html", ret)
}

func ExifInfoCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/exif-info.html", getToolBaseRet())
}

func SonyShuttersCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/sony_shutters.html", getToolBaseRet())
}

func Push2iOSCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/push2ios.html", getToolBaseRet())
}

func QrcodeCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/qrcode.html", getToolBaseRet())
}

func RandomCharsCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/random_chars.html", getToolBaseRet())
}

func TextDiffCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/text-diff.html", getToolBaseRet())
}

func Md5Ctl(c *gin.Context) {
	retKit.HTMLData(c, "tool/md5.html", getToolBaseRet())
}

func TimestampCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/timestamp.html", getToolBaseRet())
}

func Base64Ctl(c *gin.Context) {
	retKit.HTMLData(c, "tool/base64.html", getToolBaseRet())
}

func UnicodeZhCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/unicode_zh.html", getToolBaseRet())
}

func RegCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/reg.html", getToolBaseRet())
}

func UrlEncodeDecodeCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/url_encode_decode.html", getToolBaseRet())
}

func SqlFormatCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/sql_format.html", getToolBaseRet())
}

func JSONFormatCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/json_format.html", getToolBaseRet())
}

func ByteCalcCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/byte_calc.html", getToolBaseRet())
}

func UUIDCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/uuid.html", getToolBaseRet())
}

func WordCountCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/word_count.html", getToolBaseRet())
}

func ByteCountCtl(c *gin.Context) {
	retKit.HTMLData(c, "tool/byte_count.html", getToolBaseRet())
}
