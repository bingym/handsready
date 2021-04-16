package controllers

import (
	"strings"

	"github.com/gin-gonic/gin"
	"taiyuan/kits/retKit"
)

func NoRoute(c *gin.Context) {
	if strings.HasPrefix(c.Request.RequestURI, "/api/") {
		retKit.APINotFound(c, retKit.URL_NOT_MATCHED)
	} else {
		retKit.HTMLNotFound(c)
	}
}
