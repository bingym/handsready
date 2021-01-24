package config

import (
	"github.com/go-ini/ini"
	"log"
	"os"
	"path"
	"path/filepath"
)

var Config *ini.File

func init() {
	workDir, err := filepath.Abs(filepath.Dir("."))
	if err != nil {
		log.Fatalln(err.Error())
		return
	}
	currentEnv := os.Getenv("JZENV")
	var configFilePath string
	if currentEnv == "prod" {
		configFilePath = path.Join(workDir, "config", "prod.ini")
	} else {
		configFilePath = path.Join(workDir, "config", "dev.ini")
	}
	cfg, err := ini.Load(configFilePath)
	if err != nil {
		log.Fatalf("read config failed: %s", err.Error())
		return
	}
	Config = cfg
}
