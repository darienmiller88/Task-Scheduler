package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"task_scheduler/api/models"

	"github.com/gin-gonic/gin"
	"github.com/go-co-op/gocron"
	"github.com/joho/godotenv"
	"github.com/qiniu/qmgo"
	"github.com/twilio/twilio-go"
	"github.com/twilio/twilio-go/rest/api/v2010"
	"go.mongodb.org/mongo-driver/bson"
)

func main()  {
	//Load env file."../.env"
	godotenv.Load()

	app := gin.Default()
	scheduler := gocron.NewScheduler(time.UTC)
	ctx := context.Background()
	cli, err := qmgo.Open(ctx, &qmgo.Config{Uri: os.Getenv("MONGO_URI"), Database: "TaskScheduler", Coll: "tasks"})

	if err != nil{
		panic(err)
	}
	
	//Defer closing of the database to the end of the main thread.
	defer func() {
		if err = cli.Close(ctx); err != nil {
			panic(err)
		}
	}()

	app.Static("/static", "./client/static")
	app.LoadHTMLGlob("./client/templates/*")
	//time.Now().Add(30 * time.Second)
	scheduler.Every(10).Seconds().Do(func ()  {
		fmt.Println("is working")
	})

	//scheduler.StartAsync()

	app.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "dashboard.html", c.Request.RemoteAddr)
	})

	app.GET("/api/v1/tasks", func(c *gin.Context) {
		reminders := []models.Reminder{}
		err := cli.Find(ctx, bson.M{}).All(&reminders)

		if err != nil{
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, reminders)
	})

	app.GET("/reminders", func(c *gin.Context) {
		c.HTML(http.StatusOK, "set-reminder.html", nil)
	})

	app.POST("/reminders", func(c *gin.Context) {
		reminder := models.Reminder{}
		
	 	if err := c.Bind(&reminder); err != nil{
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}

		_, err := cli.InsertOne(ctx, &reminder)

		if err != nil{
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		fmt.Println(reminder)

		c.JSON(http.StatusOK, reminder)
	})

	app.Run(":" + os.Getenv("PORT"))
}

func sendMessage(){
	client := twilio.NewRestClient()
	params := openapi.CreateMessageParams{}

	params.SetTo(os.Getenv("TO_NUMBER"))
	params.SetFrom(os.Getenv("FROM_NUMBER"))
	params.SetBody("Hey munchkin!")

	_, err := client.ApiV2010.CreateMessage(&params)

	if err != nil{
		panic(err)
	}

	fmt.Println("successfully sent!")
}
