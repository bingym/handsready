package routes

import (
	"errors"
	"net/http"
	"time"

	"github.com/bingym/collects_next/config"
	"github.com/bingym/collects_next/controllers/api"
	"github.com/bingym/collects_next/controllers/page"
	"github.com/bingym/collects_next/kits/retKit"
	"github.com/bingym/collects_next/kits/timeKit"
	"github.com/flosch/pongo2"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"gitlab.com/go-box/pongo2gin"
)

func CreateRouter() *gin.Engine {
	e := gin.Default()
	setTemplateEngine(e)
	serveStatic(e)
	addUrlRule(e)
	return e
}

func freshSessionTime(c *gin.Context) {
	sessionValue, _ := c.Cookie("session")
	maxAge, _ := config.Config.Section("cookie").Key("max_age").Int()
	c.SetCookie("session", sessionValue, maxAge, "/", "", false, true)
}

func authRequired(c *gin.Context) {
	var (
		session sessions.Session
		userID  interface{}
	)
	session = sessions.Default(c)
	userID = session.Get("userID")
	if userID != nil {
		c.Set("userID", userID)
		freshSessionTime(c)
		c.Next()
	} else {
		retKit.APIUnauthorized(c)
		c.Abort()
		return
	}
}

func pageAuthRequired(c *gin.Context) {
	var (
		session sessions.Session
		userID  interface{}
	)
	session = sessions.Default(c)
	userID = session.Get("userID")
	if userID != nil {
		c.Set("userID", userID)
		freshSessionTime(c)
		c.Next()
	} else {
		retKit.HTMLUnauthorized(c)
		c.Abort()
		return
	}
}

func serveStatic(e *gin.Engine) {
	e.Static("/static", "./static")
	e.StaticFile("favicon.ico", "./static/favicon.ico")
}

func setTemplateEngine(e *gin.Engine) {
	pongo2.RegisterFilter("datetime_format", func(in *pongo2.Value, param *pongo2.Value) (out *pongo2.Value, err *pongo2.Error) {
		switch t := in.Interface().(type) {
		case time.Time:
			return pongo2.AsValue(timeKit.Time2String(&t)), nil
		case *time.Time:
			return pongo2.AsValue(timeKit.Time2String(t)), nil
		default:
			return nil, &pongo2.Error{
				Sender:    "filter:date",
				OrigError: errors.New("error time format"),
			}
		}
	})
	var (
		pongoEngine *pongo2gin.Pongo2Render
	)
	pongoEngine = pongo2gin.Default()
	e.HTMLRender = pongoEngine
}

func addUrlRule(e *gin.Engine) {
	addPageRoutes(e)
	addApiRoutes(e)
}

func addApiRoutes(e *gin.Engine) {
	group := e.Group("/api/v1")
	group.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})
	group.POST("/byte-count", api.ByteCountCtl)
}

func addPageRoutes(e *gin.Engine) {
	group := e.Group("/")
	{
		group.GET("/", page.IndexCtl)
		group.GET("/about", page.AboutCtl)

		// tool
		group.GET("/tool", page.ToolIndexCtl)
		group.GET("/tool/exif-info", page.ExifInfoCtl)
		group.GET("/tool/sony-shutters", page.SonyShuttersCtl)
		group.GET("/tool/push2ios", page.Push2iOSCtl)
		group.GET("/tool/qrcode", page.QrcodeCtl)
		group.GET("/tool/random-chars", page.RandomCharsCtl)
		group.GET("/tool/json-format", page.JSONFormatCtl)
		group.GET("/tool/sql-format", page.SqlFormatCtl)
		group.GET("/tool/timestamp", page.TimestampCtl)
		group.GET("/tool/md5", page.Md5Ctl)
		group.GET("/tool/base64", page.Base64Ctl)
		group.GET("/tool/unicode-zh", page.UnicodeZhCtl)
		group.GET("/tool/regex", page.RegCtl)
		group.GET("/tool/byte-calc", page.ByteCalcCtl)
		group.GET("/tool/uuid", page.UUIDCtl)
		group.GET("/tool/url-encode-decode", page.UrlEncodeDecodeCtl)
		group.GET("/tool/text-diff", page.TextDiffCtl)
		group.GET("/tool/word-count", page.WordCountCtl)
		group.GET("/tool/byte-count", page.ByteCountCtl)

		// reference
		group.GET("/reference", page.ReferenceIndexCtl)
		group.GET("/reference/github", page.GithubCtl)
		group.GET("/reference/ebook", page.EbookCtl)
		group.GET("/reference/http-code", page.HttpcodeCtl)
		group.GET("/reference/time-format-placeholder", page.TimeFormatPlaceholderCtl)
		group.GET("/reference/http-mark", page.HtmlMarkCtl)
		group.GET("/reference/source", page.SourceCtl)

	}
}
