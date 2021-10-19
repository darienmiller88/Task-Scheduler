package controllers

import (
	"github.com/gin-gonic/gin"
)

type MountController struct {
}

func (m *MountController) Init(route *gin.RouterGroup) {
	reminderController := ReminderController{}
	userController := UserController{}
	viewController := ViewController{}

	reminderController.Init(route.Group("/api/v1"))
	userController.Init(route.Group("/api/v1"))
	viewController.Init(route.Group("/"))
}
