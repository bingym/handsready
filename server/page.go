package server

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

var (
	referenceData []LinkGroup
	toolData      []FuncGroup
)

func getReferenceBaseRet() map[string]interface{} {
	return map[string]interface{}{
		"column": "reference",
	}
}

func getToolBaseRet() map[string]interface{} {
	return map[string]interface{}{
		"column": "tool",
	}
}

func loadDataFile(fileName string, v interface{}) {
	filePath := fmt.Sprintf("./data/%s", fileName)
	file, err := os.Open(filePath)
	defer file.Close()
	if err != nil {
		log.Panicf("read %s failed!", fileName)
	}
	content, err := ioutil.ReadAll(file)
	if err != nil {
		log.Panicf("read %s failed!", fileName)
	}
	if err = json.Unmarshal(content, v); err != nil {
		log.Panicf("json unmarshal %s failed, please check file!", fileName)
	}
}

func init() {
	loadDataFile("reference_data.json", &referenceData)
	loadDataFile("tool_data.json", &toolData)
}
func IndexCtl(c *gin.Context) {
	c.Redirect(http.StatusFound, "/tool")
}

func AboutCtl(c *gin.Context) {
	HTMLData(c, "about.html", map[string]interface{}{
		"column": "about",
	})
}

type SingleFunc struct {
	Name string
	Path string
}

type FuncGroup struct {
	Name string
	Data []SingleFunc
}

type Link struct {
	Title string
	URL   string
}

type LinkSubGroup struct {
	Name  string
	Links []Link
}

type LinkGroup struct {
	Name string
	Data []LinkSubGroup
}

func ToolIndexCtl(c *gin.Context) {
	ret := getToolBaseRet()
	ret["funcGroups"] = toolData
	HTMLData(c, "tool/index.html", ret)
}

func ExifInfoCtl(c *gin.Context) {
	HTMLData(c, "tool/exif-info.html", getToolBaseRet())
}

func SonyShuttersCtl(c *gin.Context) {
	HTMLData(c, "tool/sony_shutters.html", getToolBaseRet())
}

func QrcodeCtl(c *gin.Context) {
	HTMLData(c, "tool/qrcode.html", getToolBaseRet())
}

func RandomCharsCtl(c *gin.Context) {
	HTMLData(c, "tool/random_chars.html", getToolBaseRet())
}

func TextDiffCtl(c *gin.Context) {
	HTMLData(c, "tool/text-diff.html", getToolBaseRet())
}

func Md5Ctl(c *gin.Context) {
	HTMLData(c, "tool/md5.html", getToolBaseRet())
}

func TimestampCtl(c *gin.Context) {
	HTMLData(c, "tool/timestamp.html", getToolBaseRet())
}

func Base64Ctl(c *gin.Context) {
	HTMLData(c, "tool/base64.html", getToolBaseRet())
}

func UnicodeZhCtl(c *gin.Context) {
	HTMLData(c, "tool/unicode_zh.html", getToolBaseRet())
}

func RegCtl(c *gin.Context) {
	HTMLData(c, "tool/reg.html", getToolBaseRet())
}

func UrlEncodeDecodeCtl(c *gin.Context) {
	HTMLData(c, "tool/url_encode_decode.html", getToolBaseRet())
}

func SqlFormatCtl(c *gin.Context) {
	HTMLData(c, "tool/sql_format.html", getToolBaseRet())
}

func JSONFormatCtl(c *gin.Context) {
	HTMLData(c, "tool/json_format.html", getToolBaseRet())
}

func ByteCalcCtl(c *gin.Context) {
	HTMLData(c, "tool/byte_calc.html", getToolBaseRet())
}

func UUIDCtl(c *gin.Context) {
	HTMLData(c, "tool/uuid.html", getToolBaseRet())
}

func WordCountCtl(c *gin.Context) {
	HTMLData(c, "tool/word_count.html", getToolBaseRet())
}

func ByteCountCtl(c *gin.Context) {
	HTMLData(c, "tool/byte_count.html", getToolBaseRet())
}

func ReferenceIndexCtl(c *gin.Context) {
	ret := getReferenceBaseRet()
	ret["linkGroups"] = referenceData
	HTMLData(c, "reference/index.html", ret)

}
func SourceCtl(c *gin.Context) {
	HTMLData(c, "reference/source.html", getReferenceBaseRet())
}

func DomainCtl(c *gin.Context) {
	HTMLData(c, "reference/domain.html", getReferenceBaseRet())
}

func CarnoCtl(c *gin.Context) {
	HTMLData(c, "reference/carno.html", getReferenceBaseRet())
}

func HttpcodeCtl(c *gin.Context) {
	HTMLData(c, "reference/http_code.html", getReferenceBaseRet())
}

func HtmlMarkCtl(c *gin.Context) {
	HTMLData(c, "reference/html_mark.html", getReferenceBaseRet())
}

func TimeFormatPlaceholderCtl(c *gin.Context) {
	HTMLData(c, "reference/time_format_placeholder.html", getReferenceBaseRet())
}

func AsciiTableCtl(c *gin.Context) {
	HTMLData(c, "reference/ascii_table.html", getReferenceBaseRet())
}
