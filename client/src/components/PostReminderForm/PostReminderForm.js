import React, { useRef, useState } from 'react'
import "./PostReminderForm.css"
import Days from '../Days/Days'
import axios from 'axios'
import BaseUrl from "../BaseUrl/BaseUrl"

export default function PostReminderForm(props) {
    const daysRef = useRef(null)
    const formRef = useRef(null)
    const [noDaysAdded, setNoDaysAdded] = useState(false)
    const CHECKED_COLOR = "green"
    const UNCHECKED_COLOR = "rgb(211,211,211)"

    const onSumbit = (e) => {
        e.preventDefault()
        
        const formData = new FormData(formRef.current)
        const reminder = formData.get("reminder")
        const time = formData.get("time")

        if(props.isSingleOccuring){   
            const date = formData.get("date")
            const data = prepareSingleOccuringForm(date, time, reminder)

            postReminder(data)
        }else{
            const data = prepareReoccuringForm(time, reminder)

            postReminder(data)
        }
    }

    const postReminder = async (data) => {       
        console.log("data:", data);
        try {
            const response = await axios.post(`${BaseUrl}`, data)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const prepareSingleOccuringForm = (date, time, reminder) => {
        resetForm()
        return  {
            time: getFormattedTime(time), 
            date, 
            reminder,
        }
    }

    const prepareReoccuringForm = (time, reminder) => {
        const daysChecked = getCheckedDays()

        //If the user did not check any days, flash an error to the screen by setting the flag to true,
        //and setting it to false 2 seconds later to remove it from the screen.
        if(daysChecked.length === 0){
            setNoDaysAdded(true)
            setTimeout(() => {
                setNoDaysAdded(false)
            }, 2000);

            return
        }

        resetForm()
        return {
            time: getFormattedTime(time),  
            days: daysChecked, 
            reminder,
        }
    }

    //Reference the "Days" component to allow this component to retrieve days checked as selected.
    const getCheckedDays = () => {
        let checkedDays = []

        daysRef.current.querySelectorAll(".day").forEach(day => {
            if(day.style.backgroundColor === CHECKED_COLOR){
                checkedDays.push(day.textContent.trim())
                day.style.backgroundColor = UNCHECKED_COLOR
            }
        })

        return checkedDays
    }
    
    const resetForm = () => {
        document.querySelectorAll("input").forEach(input => input.value = "");
    }

    //This function will format the time stamp to in the 12 hour format instead of the 24 hours format.
    const getFormattedTime = (time) => {
        let formattedTime = time.split(":")
        let hour = parseInt(formattedTime[0])
        let meridiem = (hour > 11) ? "PM" : "AM"
    
        if(hour > 12){
            hour -= 12
        }else if(hour === 0){
            hour = 12
        }
    
        return `${hour.toString()}:${formattedTime[1]} ${meridiem}`
    }

    return (
        <form onSubmit={onSumbit} ref={formRef}>
            <div className="reminder-input-div">
                <label htmlFor="name-reminder" className="label">Reminder Name</label>
                <input type="text" id="reminder-input" name="reminder" placeholder="Enter reminder name" required/>
            </div>

            {
                props.isSingleOccuring 
                ?
                 <div className="reminder-date-div">
                    <label htmlFor="date" className="label">Set date</label>
                    <input type="date" id="date" name="date" min={props.min} defaultValue={props.currentDate} required />
                </div>
                : 
                <Days noDaysAdded={noDaysAdded} innerRef={daysRef} getCheckedDays={getCheckedDays}/>
            }

            <div className="reminder-time-div">
                <label htmlFor="time" className="label">Set time</label>
                <input type="time" name="time" id="timeSingleOccuring" value={props.currentTime} onChange={props.adjustDateMinimum} required />
            </div>

            <button className="set-reminder-btn">Set Reminder</button>
        </form>
    )
}
