package controllers

import (
	"github.com/gin-gonic/gin"
)

type MountController struct {
}

func (m *MountController) Init(route *gin.RouterGroup) {
	reminderController := ReminderController{}
	userController := UserController{}

	reminderController.Init(route.Group("/reminders"))
	userController.Init(route.Group("/users"))
	//viewController.Init(route.Group("/"))
}
