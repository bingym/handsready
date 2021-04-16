package page

import (
	"github.com/gin-gonic/gin"
	"taiyuan/constant"
	"taiyuan/kits/retKit"
)

func IndexCtl(c *gin.Context) {
	retKit.Redirect(c, "/tool")
}

func AboutCtl(c *gin.Context) {
	retKit.HTMLData(c, "about.html", map[string]interface{}{
		"column": constant.COLUMN_ABOUT,
	})
}
