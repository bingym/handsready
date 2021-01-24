package page

import (
	"github.com/bingym/threestories/constant"
	"github.com/bingym/threestories/kits/retKit"
	"github.com/gin-gonic/gin"
)

func IndexCtl(c *gin.Context) {
	retKit.HTMLData(c, "index.html", map[string]interface{}{})
}

func AboutCtl(c *gin.Context) {
	retKit.HTMLData(c, "about.html", map[string]interface{}{
		"column": constant.COLUMN_ABOUT,
	})
}
