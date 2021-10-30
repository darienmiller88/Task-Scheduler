import React from 'react'
import axios from "axios"
import './Reminder.css'
import Port from "../Port/Port"

const baseUrl = `http://localhost:${Port}/api/v1/reminders`

export default function Reminder(props) {
    const deleteReminder = async () => {
        //First, remove the reminder from the array so it gets removed without having to refresh the page.
        props.removeReminderFromForm(props.id)

        //Afterwards, remove it from the database by sending a delete request to the server.
        try {
            const response = await axios.delete(`${baseUrl}/${props.id}`)

            console.log("delete Response:", response);
        } catch (error) {
            console.log("err:", error)
        }
    }

    return (
        <div className="reminder" id={ props.id } data-bs-toggle="modal" data-bs-target="editModalName">
            <div className="reminder-name">
                { props.reminderName }
            </div>
            <div className="info-block">
                <span className="date">
                    {  props.date }                    
                    <span className="time"> { props.time } </span>
                </span>
                <button className="edit" onClick={() => props.editReminder(props.id)}>edit</button>
                <button className="delete" onClick={deleteReminder}>delete</button>
            </div>
        </div>
    )
}
