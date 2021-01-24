package retKit

import (
	"fmt"
	"github.com/flosch/pongo2"
	"github.com/gin-gonic/gin"
	"net/http"
)

func sendJsonError(c *gin.Context, message string, statusCode int) {
	c.JSON(statusCode, gin.H{"message": message})
}

func sendHtmlError(c *gin.Context, message string, statusCode int) {
	htmlFile := fmt.Sprintf("%d.html", statusCode)
	c.HTML(statusCode, htmlFile, pongo2.Context{"message": message})
}

func APIServerError(c *gin.Context, message string) {
	sendJsonError(c, message, http.StatusInternalServerError)
}

func APINotFound(c *gin.Context, message string) {
	sendJsonError(c, message, http.StatusNotFound)
}

func APIBadRequest(c *gin.Context, message string) {
	sendJsonError(c, message, http.StatusBadRequest)
}

func APIUnauthorized(c *gin.Context) {
	sendJsonError(c, "unauthorized", http.StatusUnauthorized)
}

func HTMLServerError(c *gin.Context) {
	sendHtmlError(c, "服务器错误", http.StatusInternalServerError)
}

func HTMLData(c *gin.Context, htmlFile string, context map[string]interface{}) {
	c.HTML(http.StatusOK, htmlFile, pongo2.Context(context))
}

func Redirect(c *gin.Context, location string) {
	c.Redirect(http.StatusFound, location)
}

func APIData(c *gin.Context, data interface{}) {
	ret := gin.H{}
	ret["data"] = data
	ret["message"] = "ok"
	c.JSON(http.StatusOK, ret)
}

// HTMLData 400
func HTMLBadRequest(c *gin.Context, message string) {
	sendHtmlError(c, message, http.StatusBadRequest)
}

// HTMLData 401
func HTMLUnauthorized(c *gin.Context) {
	Redirect(c, "/user-login")
}

// HTMLData 404
func HTMLNotFound(c *gin.Context) {
	sendHtmlError(c, "页面未找到", http.StatusNotFound)
}
