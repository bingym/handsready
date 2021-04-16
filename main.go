package main

import (
	"errors"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-ini/ini"
	"taiyuan/config"
	"taiyuan/routes"
)

func main() {
	var (
		err error
		app *gin.Engine
	)
	// 读配置
	err = setRunMode(config.Config)
	if err != nil {
		log.Fatalln(err.Error())
		return
	}

	// router
	app = routes.CreateRouter()

	// start
	if err := app.Run(fmt.Sprintf(":%s", config.Config.Section("server").Key("port").String())); err != nil {
		log.Fatalln("start failed", err)
	}
}

func setRunMode(file *ini.File) error {
	appMode := file.Section("").Key("app_mode").String()
	if appMode == "dev" {
		gin.SetMode(gin.DebugMode)
		return nil
	} else if appMode == "prod" {
		gin.SetMode(gin.ReleaseMode)
		return nil
	} else {
		return errors.New("invalid run mode: " + appMode)
	}
}
