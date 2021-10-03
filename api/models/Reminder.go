package models

import (
	"github.com/qiniu/qmgo/field"
)

type Reminder struct{
	field.DefaultField
	Name string            `json:"reminder"       bson:"reminder"`
	Time string            `json:"time"           bson:"time"`
	Date string            `json:"date,omitempty" bson:"date"`
	DaysSelected *[]string `json:"days,omitempty" bson:"days"`
}