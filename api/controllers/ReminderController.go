package controllers

import (
	"fmt"
	"net/http"
	"task_scheduler/api/models"

	"github.com/gin-gonic/gin"
	"github.com/kamva/mgm/v3"
	"github.com/thoas/go-funk"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReminderController struct {
}

func (r *ReminderController) Init(route *gin.RouterGroup) {
	route.GET("/", r.getReminders)
	route.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": 56,
		})
	})
	route.POST("/", r.postReminder)
	route.GET("/:reminderID", r.getReminderByID)
	route.PUT("/:reminderID", r.editReminder)
	route.DELETE("/:reminderID", r.deleteReminder)
}

//READ - Get ALL reminders from the database.
func (r *ReminderController) getReminders(c *gin.Context) {
	// c.Request.Header.Add("Access-Control-Allow-Origin", "*")
	reminders   := []models.Reminder{}
	result, err := mgm.Coll(&models.Reminder{}).Find(mgm.Ctx(), bson.D{})

	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	if err = result.All(mgm.Ctx(), &reminders); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	reminders = funk.Reverse(reminders).([]models.Reminder)


	c.IndentedJSON(http.StatusOK, reminders)
}

/**
* POST - Post requests to add a reminder to the dashboard will be handled here.
*/
func (r *ReminderController) postReminder(c *gin.Context) {
	reminder := models.Reminder{}

	//Bind the request body into a reminder object.
	if err := c.Bind(&reminder); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	//Validate the reminder before putting into the database.
	if err := reminder.Validate(); err != nil {
		fmt.Println("Err:", err)
		c.JSON(http.StatusBadRequest, err)
		return
	}

	//Try to post, and return a 500 error if anything goes wrong.
	if err := mgm.Coll(&models.Reminder{}).Create(&reminder); err != nil{
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	fmt.Println(reminder)

	//Send the reminder back to the front end!
	c.JSON(http.StatusCreated, reminder)
}

/**
* GET - Get reminders by a particular ID.
*/
func (r *ReminderController) getReminderByID(c *gin.Context) {
	id       := c.Param("reminderID")
	reminder := models.Reminder{}
	err      := mgm.Coll(&models.Reminder{}).FindByID(id, &reminder)

	if err != nil {
		c.JSON(http.StatusNotFound, err.Error())
		return
	}

	c.IndentedJSON(http.StatusOK, reminder)
}

/**
* PUT - Update a reminder by a particular ID.
*/
func (r *ReminderController) editReminder(c *gin.Context) {
	objectID, err := primitive.ObjectIDFromHex(c.Param("reminderID"))
	newReminder := models.Reminder{}

	//Try to convert the id into an object id, and return and error if it fails.
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	//Afterwards, bind the request body to the reminder object.
	if err := c.Bind(&newReminder); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	//Validate the new reminder before updating.
	if err := newReminder.Validate(); err != nil{
		c.JSON(http.StatusBadRequest, err)
		return
	}

	result, err := mgm.Coll(&models.Reminder{}).UpdateByID(mgm.Ctx(), objectID, bson.M{"$set": newReminder})

	if err != nil{
		c.JSON(http.StatusNotFound, err.Error())
		return
	}

	c.JSON(http.StatusOK, result)
}

/**
* DELETE - Delete a reminder from the database by an ID.
*/
func (r *ReminderController) deleteReminder(c *gin.Context) {
	objectID, err := primitive.ObjectIDFromHex(c.Param("reminderID"))

	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	result, err := mgm.Coll(&models.Reminder{}).DeleteOne(mgm.Ctx(), bson.M{"_id": objectID})

	if err != nil {
		c.JSON(http.StatusNotFound, err.Error())
		return
	}

	c.JSON(http.StatusOK, result)
}
