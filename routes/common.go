package routes

import (
	"github.com/bingym/threestories/controllers"
	"github.com/gin-gonic/gin"
)

func addCommonRoutes(router *gin.Engine) {
	router.NoRoute(controllers.NoRoute)
}
