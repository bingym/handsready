package controllers

import (
	"strings"

	"github.com/bingym/collects_next/kits/retKit"
	"github.com/gin-gonic/gin"
)

func NoRoute(c *gin.Context) {
	if strings.HasPrefix(c.Request.RequestURI, "/api/") {
		retKit.APINotFound(c, retKit.URL_NOT_MATCHED)
	} else {
		retKit.HTMLNotFound(c)
	}
}
