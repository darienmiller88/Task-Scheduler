const timeSingleOccuring = document.getElementById("timeSingleOccuring")
const dateInput = document.getElementById("date")
let date = new Date()

console.log("min:", dateInput.min );

//Set the default date to today's date in the following form.
dateInput.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
dateInput.min = dateInput.value

//Whenever the time value is changed, dynamically change the minimum date value to be either today's date
//or tomorrow's date depending on whether or not the time value is less then the current time. This is done
//to prevent the user from inputting dates that can never be triggered, like 7 AM 10/1/2021 while the current
//time is 12 PM.  
timeSingleOccuring.addEventListener("change", () => {
    const currentDate = new Date()
    const inputTime = timeSingleOccuring.value.split(":")
    const currentHour = currentDate.getHours();
    const currentMintues = currentDate.getMinutes()
    const inputHour = parseInt(inputTime[0])
    const inputMinutes = parseInt(inputTime[1])

    //If the time put into the time input is LESS than the current time, push the minimum date one day forward.
    if ((inputHour === currentHour && inputMinutes <= currentMintues) || inputHour < currentHour) {
        dateInput.min = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
    }else{
        dateInput.min = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    console.log("new min:", dateInput.min);
})
