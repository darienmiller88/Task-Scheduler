import React, { Fragment, useEffect, useRef, useState } from 'react'
import './SetReminderPage.css'
import Nav from '../../components/Nav/Nav'
import PostReminder from '../../components/PostReminderForm/PostReminderForm'
//import { useHistory } from "react-router-dom";

export default function SetReminderPage() {
    const [isSingleOccuring, setSingleOccuring] = useState(true)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [dateMin, setDateMin] = useState("")
    const singleOccuringButtonRef = useRef(null)    
    const reoccuringButtonRef = useRef(null)
   
    useEffect(() => {
        const currentDate = new Date()
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        setDate(formattedDate)
        setDateMin(formattedDate)
        document.title = "Set Reminder"
        
        // dateInputRef.current.value = ""
        singleOccuringButtonRef.current.classList.add("active")
    }, [])
    
    const setSingleOccuringTrue = () => {
        setSingleOccuring(true)
        singleOccuringButtonRef.current.classList.add("active")
        reoccuringButtonRef.current.classList.remove("active")
    }

    const setSingleOccuringFalse = () => {
        setSingleOccuring(false)
        reoccuringButtonRef.current.classList.add("active")
        singleOccuringButtonRef.current.classList.remove("active")
    }

    const adjustDateMinimum = (e) => {
        const currentDate = new Date()
        const currentTime = e.target.value.split(":")
        const currentHour = currentDate.getHours();
        const currentMintues = currentDate.getMinutes()
        const inputHour = parseInt(currentTime[0])
        const inputMinutes = parseInt(currentTime[1])
    
        //If the time put into the time input is LESS than the current time, push the minimum date one day forward.
        if ((inputHour === currentHour && inputMinutes <= currentMintues) || inputHour < currentHour) {
            setDateMin(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 1}`)
        }else{
            setDateMin(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)
        }
    
        setTime(e.target.value)
    }

    return (
        <Fragment>
            <Nav/>
            <div className="title">Set Your Reminder!</div>
            <div className="set-reminder-btn-group">
                <button className="is-single-occuring" ref={singleOccuringButtonRef} onClick={setSingleOccuringTrue}>Single Occuring</button>
                <button className="is-reoccuring"      ref={reoccuringButtonRef}     onClick={setSingleOccuringFalse}>Reoccuring</button>
            </div>
            <PostReminder 
                isSingleOccuring={isSingleOccuring}
                min={dateMin} 
                currentDate={date} 
                currentTime={time}
                adjustDateMinimum={adjustDateMinimum}
            />
        </Fragment>
    )
}
