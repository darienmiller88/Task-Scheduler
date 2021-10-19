//COM - 430
//Task masters
//Oshane Miller
//10-18-21

package main

import (
	"fmt"
	"os"
	"time"

	"task_scheduler/api/controllers"

	"github.com/gin-gonic/gin"
	"github.com/go-co-op/gocron"
	"github.com/joho/godotenv"
	"github.com/kamva/mgm/v3"
	"github.com/twilio/twilio-go"
	openapi "github.com/twilio/twilio-go/rest/api/v2010"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	//Load env file."../.env"
	godotenv.Load()

	app := gin.Default()
	mountController := controllers.MountController{}
	scheduler := gocron.NewScheduler(time.UTC)
	err := mgm.SetDefaultConfig(nil, "TaskScheduler", options.Client().ApplyURI(os.Getenv("MONGO_URI")))

	if err != nil {
		panic(err)
	}

	app.Use()
	app.Static("/static", "./client/static")
	app.LoadHTMLGlob("./client/templates/*")

	//Mount the router on "api/v1", and pass it the background context.
	mountController.Init(app.Group("/"))
	//time.Now().Add(30 * time.Second)

	//Scheduler to periodically send messages.
	scheduler.Every(10).Seconds().Do(func() {
		fmt.Println("is working")
	})

	//scheduler.StartAsync()

	app.Run(":" + os.Getenv("PORT"))
}

func sendMessage() {
	client := twilio.NewRestClient()
	params := openapi.CreateMessageParams{}

	params.SetTo(os.Getenv("TO_NUMBER"))
	params.SetFrom(os.Getenv("FROM_NUMBER"))
	params.SetBody("Hey munchkin!")

	_, err := client.ApiV2010.CreateMessage(&params)

	if err != nil {
		panic(err)
	}

	fmt.Println("successfully sent!")
}
