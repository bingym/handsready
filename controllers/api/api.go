package api

import (
	"github.com/bingym/threestories/kits/retKit"
	"github.com/gin-gonic/gin"
)

type ByteCountForm struct {
	Content string `json:"content" binding:"required"`
}

func ByteCountCtl(c *gin.Context) {
	var (
		form  *ByteCountForm
		err   error
		count int
	)
	form = new(ByteCountForm)
	if err = c.ShouldBindJSON(form); err != nil {
		retKit.APIBadRequest(c, err.Error())
		return
	}
	count = len(form.Content)
	retKit.APIData(c, count)
}
