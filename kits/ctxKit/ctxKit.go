package ctxKit

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
	"strconv"
)

func GetParamInt(ctx *gin.Context, key string) (int, error) {
	keyString := ctx.Param(key)
	keyInt, err := strconv.Atoi(keyString)
	return keyInt, err
}

func GetQueryInt(c *gin.Context, key string) (int, error) {
	keyString := c.DefaultQuery(key, "")
	if keyString == "" {
		return 0, errors.New(fmt.Sprintf("empty %s", key))
	}
	return strconv.Atoi(keyString)
}

func GetUUID(c *gin.Context, key string, trimSuffix bool) (uuid.UUID, error) {
	raw := c.Param(key)
	if len(raw) < 36 {
		return uuid.Nil, errors.New("invalid uuid")
	}
	if trimSuffix == true {
		runeBuffer := []rune(raw)
		raw = string(runeBuffer[0:36])
	}
	return uuid.FromString(raw)
}
