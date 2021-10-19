package models

import (
	"errors"
	"fmt"
	"regexp"

	"github.com/araddon/dateparse"
	mapset "github.com/deckarep/golang-set"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/kamva/mgm/v3"
)

type Reminder struct {
	mgm.DefaultModel `bson:",inline"`
	Name             string   `json:"reminder"       bson:"reminder"`
	Time             string   `json:"time"           bson:"time"`
	Date             string   `json:"date,omitempty" bson:"date"`
	DaysSelected     []string `json:"days,omitempty" bson:"days"`
}

const regexTime string = "^([1-9]|1[0-2]):[0-5][0-9]\\s(AM|PM)$"
const regexDay string = "^(Su|Mo|Tu|We|Th|Fr|Sa)$"
const timeError string = "Time must be of the form \"12:30 AM\"."
const dayError string = "Day must be in the form of \"Su\", \"Mo\", etc."

func (r Reminder) Validate() error {
	return validation.ValidateStruct(
		&r,

		//THe reminder name must set, and must be between 5 and 50 characters.
		validation.Field(&r.Name, validation.Required, validation.Length(5, 50)),

		//The date field must be set, and of the form "12:30 PM".
		validation.Field(&r.Time, validation.Required,
			validation.Match(regexp.MustCompile(regexTime)).Error(timeError),
		),

		//This field is not required, but if set, must be of the form "3/12/2000". Skip if the field
		//is not set.
		validation.Field(&r.Date, validation.Skip.When(r.Date == ""), validation.By(validateDate)),

		//This field is also not required, but if set, must have at least one day, and
		//must contain days of the form "Su", "Mo", "Tu", etc. Skip if field isn't set.
		validation.Field(&r.DaysSelected, validation.Skip.When(len(r.DaysSelected) == 0), validation.Length(1, 0), validation.By(validateDays)),
	)
}

func (r *Reminder) Updating() error {
	fmt.Println("Hook called when updating")
	return nil
}

func validateDays(value interface{}) error {
	days, _ := value.([]string)
	checkUnique := mapset.NewSet()

	if len(days) == 0{
		return errors.New("Please include at least one day!")
	}

	//First, check to make sure that the array has unique days.
	for _, day := range days {
		if !checkUnique.Add(day) {
			return errors.New("No duplicate days allowed!")
		}

		//For WHATEVER REASON, the empty string passes all regex validation, so handle that seperately.
		if day == "" {
			return errors.New("Day cannot be blank.")
		}

		//Check to make sure that the unique, non-empty string at this point passes regex validation.
		err := validation.Match(regexp.MustCompile(regexDay)).Error(dayError).Validate(day)

		if err != nil {
			return err
		}
	}

	return nil
}

func validateDate(value interface{}) error {
	s, _ := value.(string)
	_, err := dateparse.ParseAny(s)

	if err != nil {
		return err
	}

	return nil
}
