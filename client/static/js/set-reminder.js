const form  = document.querySelector(".set-reminder-form")
const landing = document.querySelector(".post-landing")
const postedMessage = document.querySelector(".reminder-posted-message")
const days = document.querySelector(".days")
const reoccuring = document.querySelector(".reoccuring")
const dateDiv = document.querySelector(".reminder-date-div")
const timeDiv = document.querySelector(".reminder-time-div")
const setReoccuringCheck = document.getElementById("flexCheckChecked")
const API_URL = window.location.hostname === "localhost" ? "http://localhost:8080/reminders" : "https://thetaskscheduler/reminders"

//When the page is loaded, hide the posted message.
postedMessage.style.display = 'none'
reoccuring.style.display = 'none'


form.addEventListener("submit", async e => {
    e.preventDefault()

    const formData = new FormData(form)
    let data = {}

    if(!setReoccuringCheck.checked){
        const reminder = formData.get("reminder")
        const date = formData.get("date")
        const time = formData.get("time")
        data = {
            reminder,
            date,
            time,
        }
        console.log("Data", data)
    }else{
        const reminder = formData.get("reminder")
        const time = formData.get("time")
        const daysChecked = getCheckedDays()
        data = {
            reminder, 
            time,
            "days": daysChecked,
        }

        uncheckDays()
        console.log("Data", data)
    }
    
    //After the form is submitted, hide it to show the posted message.
    form.style.display = 'none'
    postedMessage.style.display = ''

    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
    const result = await response.json()

    //After the timeout, unhide the form, and hide the posted message.
    setTimeout(() => {
        form.style.display = ''
        postedMessage.style.display = 'none'
    }, 2000)

    // landing.textContent = result.message
    console.log(result);
    form.reset()
    setReoccuring()
})

days.addEventListener("click", e => {
    //Only check if the span tag in the "days" div was clicked, and not the empty space around it each day.
    if(e.target.tagName === "SPAN"){
        if(e.target.style.backgroundColor !== "green"){
            e.target.style.backgroundColor = "green"
        }else{
            e.target.style.backgroundColor = "rgb(211,211,211)"
        }
    }
})

function getCheckedDays(){
    let daysChecked = []
    days.querySelectorAll("span").forEach(day => {
        if(day.style.backgroundColor === "green"){
            daysChecked.push(day.textContent)
        }
    })

    return daysChecked
}

function uncheckDays(){
    days.querySelectorAll("span").forEach(day => {
        if(day.style.backgroundColor === "green"){
            day.style.backgroundColor = "rgb(211,211,211)"
        }
    })
}

function setReoccuring(){
    if(setReoccuringCheck.checked){
        //If the checkbox is clicked, hide the date and time input, which is for a one time reminder,
        //and unhide the list of days allowing the user to choose multiple days
        reoccuring.style.display = ''
        dateDiv.style.display = 'none'
        timeDiv.style.display = 'none'
    }else{
        //Do the opposite when the checkbox is clicked again.
        reoccuring.style.display = 'none'
        dateDiv.style.display = ''
        timeDiv.style.display = ''
    }
}