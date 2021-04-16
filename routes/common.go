package routes

import (
	"taiyuan/controllers"
	"github.com/gin-gonic/gin"
)

func addCommonRoutes(router *gin.Engine) {
	router.NoRoute(controllers.NoRoute)
}
