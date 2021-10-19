package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ViewController struct {
}

func (v *ViewController) Init(route *gin.RouterGroup) {
	route.GET("/", v.dashboard)
	route.GET("/set-reminder", v.setReminder)
}

func (v *ViewController) dashboard(c *gin.Context){
	c.HTML(http.StatusOK, "dashboard.html", nil)
}

func (v *ViewController) setReminder(c *gin.Context){
	c.HTML(http.StatusOK, "set-reminder.html", nil)
}