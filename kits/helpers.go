package kits

import (
	"github.com/flosch/pongo2"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

func Abort(ctx *gin.Context, statusCode int, templateFile string) {
	ctx.HTML(statusCode, templateFile, pongo2.Context{})
}

func GetUUIDFromContext(c *gin.Context, key string, trimSuffix bool) (uuid.UUID, error) {
	raw := c.Param(key)
	if trimSuffix == true {
		runeBuffer := []rune(raw)
		raw = string(runeBuffer[0:36])
	}
	return uuid.FromString(raw)
}
