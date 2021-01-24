package routes

import (
	"github.com/bingym/collects_next/controllers"
	"github.com/gin-gonic/gin"
)

func addCommonRoutes(router *gin.Engine) {
	router.NoRoute(controllers.NoRoute)
}
