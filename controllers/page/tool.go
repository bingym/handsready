package page

import (
	"github.com/gin-gonic/gin"
	"taiyuan/kits/retKit"
)

var toolData []FuncGroup

func init() {
	loadDataFile("tool_data.json", &toolData)
}

func getToolBaseRet() map[string]interface{} {
	return map[string]interface{}{
		"column": "tool",
	}
}

func ToolIndexCtl(c *gin.Context) {
	ret := getToolBaseRet()
	ret["funcGroups"] = toolData
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
