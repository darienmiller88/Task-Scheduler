const singleOccuringReminderForm  = document.querySelector(".set-single-occuring-reminder-form")
const reoccuringReminderForm = document.querySelector(".set-reoccuring-reminder-form")
const postedMessage = document.querySelector(".reminder-posted-message")
const days = document.querySelector(".days")
const dateDiv = document.querySelector(".reminder-date-div")
const timeDiv = document.querySelector(".reminder-time-div")
const toggleFormButtonGroup = document.querySelector(".set-reminder-btn-group")
const errorNoDaysSelected = document.querySelector(".days-error")
const timeReoccuring = document.getElementById("timeReoccuring")
const activeDay = "active-day"
const CHECKED_COLOR = "green"
const UNCHECKED_COLOR = "rgb(211,211,211)"
const DAY_CLASS_NAME = "day"
const API_URL = window.location.hostname === "localhost" ? "http://localhost:8080/api/v1/reminders" : "https://thetaskscheduler.herokuapp.com/api/v1/reminders"

//When the page is loaded, hide the posted message, and the reoccuring form.
postedMessage.textContent = ""
reoccuringReminderForm.style.display = 'none'

//This is the form for setting a single occuring reminder.
singleOccuringReminderForm.addEventListener("submit", async e => {
    e.preventDefault()

    const formData = new FormData(singleOccuringReminderForm)
    const reminder = formData.get("reminder")
    const date = formData.get("date")
    const time = formData.get("time")
    const data = {
        reminder,
        date,
        time: getFormattedTime(time) 
    }
    
    console.log(data);
    postReminder(data, singleOccuringReminderForm)
    singleOccuringReminderForm.reset()
})

//This is the form for setting a reoccuring reminder.
reoccuringReminderForm.addEventListener("submit", async e => {
    e.preventDefault()

    const formData = new FormData(reoccuringReminderForm)
    const reminder = formData.get("reminder")
    const time = formData.get("time")
    const daysChecked = getCheckedDays()

    //If the user selected no days, flash an error signaling them to do so.
    if (daysChecked.length === 0) {
        errorNoDaysSelected.textContent = "Please include at least one day!"
        setTimeout(() => {
            errorNoDaysSelected.textContent = ""
        }, 2000)
    } else {
        const data = {
            reminder, 
            time: getFormattedTime(time),
            "days": daysChecked,
        }

        console.log(data);
        uncheckDays()
        postReminder(data, reoccuringReminderForm)    
        reoccuringReminderForm.reset()
    }
})

async function postReminder(reminder, form) {
    try {
         const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(reminder),
            headers: {
                "Content-type": "application/json"
            }
        })

        if(!response.ok){
            const error = await response.json()
            throw new Error(JSON.stringify(error))
        }

        const result = await response.json() 
        console.log("res", result);

        // After sending the request to the server, hide the form, and the button group, and show the posted message
        form.style.display = 'none'
        toggleFormButtonGroup.style.display = 'none'
        postedMessage.textContent = "Your reminder has been set! 👍"

         //After the timeout, unhide the form, and hide the posted message.
        setTimeout(() => {
            form.style.display = ''
            toggleFormButtonGroup.style.display = ''
            postedMessage.textContent = ''
        }, 2000)
        
    } catch (error) {
        console.log("err:", error);
    }
}

//Event listener for the days element that gets triggered when a day is clicked.
days.addEventListener("click", e => {
    //Only check if the "day" class in the "days" div was clicked, and not the empty space around each day.
    if(e.target.classList.contains(DAY_CLASS_NAME)){
        if( e.target.style.backgroundColor === CHECKED_COLOR){
            e.target.style.backgroundColor = UNCHECKED_COLOR
        }else{
            e.target.style.backgroundColor = CHECKED_COLOR
        }
    }
})

//My server is expecting a time variable of the form "12:30 AM", "2:40 PM", etc, for format the time 
//accordingly. Performance implications be damned 🤷.
function getFormattedTime(time){
    let days = time.split(":")
    let hour = parseInt(days[0])
    let meridiem = (hour > 11) ? "PM" : "AM"

    if(hour > 12){
        hour -= 12
    }else if(hour === 0){
        hour = 12
    }

    return `${hour.toString()}:${days[1]} ${meridiem}`
}

function getCheckedDays(){
    let daysChecked = []
    days.querySelectorAll(".day").forEach(day => {
        if(day.style.backgroundColor === CHECKED_COLOR){
            daysChecked.push(day.textContent.trim())
        }
    })

    return daysChecked
}

function uncheckDays(){
    days.querySelectorAll(".day").forEach(day => {
        if(day.style.backgroundColor === CHECKED_COLOR){
            day.style.backgroundColor = UNCHECKED_COLOR
        }
    })
}