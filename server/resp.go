package server

import (
	"github.com/flosch/pongo2"
	"github.com/gin-gonic/gin"
	"net/http"
)

func HTMLData(c *gin.Context, htmlFile string, context map[string]interface{}) {
	c.HTML(http.StatusOK, htmlFile, pongo2.Context(context))
}
