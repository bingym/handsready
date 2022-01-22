package server

import (
	"github.com/gin-gonic/gin"
	"github.com/stnc/pongo2gin"
	"os"
)

func CreateServer() *gin.Engine {
	if os.Getenv("APP_MODE") == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}
	e := gin.Default()
	serveStatic(e)
	addUrlRule(e)
	return e
}

func serveStatic(e *gin.Engine) {
	e.Static("/static", "./static")
	e.StaticFile("favicon.ico", "./static/favicon.ico")
}

func addUrlRule(e *gin.Engine) {
	e.HTMLRender = pongo2gin.TemplatePath("templates")
	addPageRoutes(e)
}

func addPageRoutes(e *gin.Engine) {
	group := e.Group("/")
	{
		group.GET("/", IndexCtl)
		group.GET("/about", AboutCtl)

		// tool
		group.GET("/tool", ToolIndexCtl)
		group.GET("/tool/exif-info", ExifInfoCtl)
		group.GET("/tool/sony-shutters", SonyShuttersCtl)
		group.GET("/tool/qrcode", QrcodeCtl)
		group.GET("/tool/random-chars", RandomCharsCtl)
		group.GET("/tool/json-format", JSONFormatCtl)
		group.GET("/tool/sql-format", SqlFormatCtl)
		group.GET("/tool/timestamp", TimestampCtl)
		group.GET("/tool/md5", Md5Ctl)
		group.GET("/tool/base64", Base64Ctl)
		group.GET("/tool/unicode-zh", UnicodeZhCtl)
		group.GET("/tool/regex", RegCtl)
		group.GET("/tool/byte-calc", ByteCalcCtl)
		group.GET("/tool/uuid", UUIDCtl)
		group.GET("/tool/url-encode-decode", UrlEncodeDecodeCtl)
		group.GET("/tool/text-diff", TextDiffCtl)
		group.GET("/tool/word-count", WordCountCtl)
		group.GET("/tool/byte-count", ByteCountCtl)

		// reference
		group.GET("/reference", ReferenceIndexCtl)
		group.GET("/reference/http-code", HttpcodeCtl)
		group.GET("/reference/ascii-table", AsciiTableCtl)
		group.GET("/reference/time-format-placeholder", TimeFormatPlaceholderCtl)
		group.GET("/reference/http-mark", HtmlMarkCtl)
		group.GET("/reference/source", SourceCtl)
		group.GET("/reference/domain", DomainCtl)
		group.GET("/reference/carno", CarnoCtl)
	}
}
