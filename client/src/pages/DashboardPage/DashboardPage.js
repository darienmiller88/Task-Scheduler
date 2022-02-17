import React, { Fragment, useState, useEffect } from 'react'
import axios from "axios";
import './DashboardPage.css'
import '../../components/Scrollbar/Scrollbar.css'
import Nav from '../../components/Nav/Nav'
import Reminder from '../../components/Reminder/Reminder'
import loading from "../../img/loading.gif"
import Url from "../../components/BaseUrl/BaseUrl"

export default function DashboardPage() {
    const [reminders, setReminders] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getReminders(){
            try {
                const response = await axios.get(`${Url}/`)
                setReminders(response.data)
            } catch (err) {
                setError(err)
                console.log("err:", err);
            }
        }
        getReminders()
        setIsLoading(false)
        document.title = "Dashboard"
    }, [])

    console.log("isloading:", isLoading);
    console.log("reminders:", reminders);

    const editReminder = id => {
        console.log("editing reminder:", id);
    }

    const removeReminderFromForm = id => {
        const updatedReminders = reminders.filter(reminder => id !== reminder.id)
        setReminders(updatedReminders)
    }
    
    if(error){
        return error
    }

    return (
        <Fragment>
            <Nav/>     
            <h1>Upcoming Reminders</h1>

            {
                isLoading 
                ?
                <div className="loading">
                    <img src={loading} height="150" width="150" alt="loading"/>
                </div>
                :
                <div className = "reminders">
                {
                    reminders.map(reminder => 
                        <Reminder
                            key = {reminder.id}
                            id = {reminder.id}
                            date = {reminder.date ? reminder.date : reminder.days.join(", ")}
                            time = {reminder.time}                            
                            reminderName = {reminder.reminder}
                            editReminder = {editReminder}
                            removeReminderFromForm = {removeReminderFromForm}
                        />
                    )
                }
                </div>
            }

            
        </Fragment>
    )
}
