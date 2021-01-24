package controllers

import (
	"github.com/bingym/threestories/kits/retKit"
	"github.com/gin-gonic/gin"
	"strings"
)

func NoRoute(c *gin.Context) {
	if strings.HasPrefix(c.Request.RequestURI, "/api/") {
		retKit.APINotFound(c, retKit.URL_NOT_MATCHED)
	} else {
		retKit.HTMLNotFound(c)
	}
}
