package cmd

import (
	"github.com/bingym/treasure_chest/server"
	"github.com/spf13/cobra"
	"log"
)

var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "start http server",
	Run: func(cmd *cobra.Command, args []string) {
		r := server.CreateServer()
		if err := r.Run(":5200"); err != nil {
			log.Fatalln(err)
		}
	},
}

func Execute() {
	rootCmd := &cobra.Command{Use: "treasure chest"}
	rootCmd.AddCommand(
		serverCmd,
	)
	if err := rootCmd.Execute(); err != nil {
		log.Fatalln(err)
	}
}
