const reminders = document.querySelector(".reminders")
const API_URL = window.location.hostname === "localhost" ? "http://localhost:8080/api/v1/tasks" : "https://thetaskscheduler/reminders"

getTasks()

async function getTasks(){
    const response = await fetch(API_URL)
    const result = await response.json()

    addTasks(result)
}

function addTasks(tasks){
    tasks.forEach(task => {
        // console.log(task["reminder"]);
        const elem = createTask(task)
        reminders.append(elem)
    })    
}

function createTask(task){
    const reminder = document.createElement("div")
    const reminderName = document.createElement("div")
    const infoBlock = document.createElement("div")
    const date = document.createElement("span")
    const time = document.createElement("span")
    const editButton = document.createElement("button")
    const deleteButton = document.createElement("button")

    reminder.className = "reminder"
    reminderName.className = "reminder-name"
    infoBlock.className = "info-block"
    date.className = "date"
    time.className = "time"
    editButton.className = "edit"
    deleteButton.className = "delete"

    console.log("reminder:", task["reminder"]);

    reminderName.textContent = task["reminder"]
    date.textContent = task["date"] + ", "
    time.textContent = task["time"]
    editButton.textContent = "edit"
    deleteButton.textContent = "delete"

    date.append(time)
    infoBlock.append(date, editButton, deleteButton)
    reminder.append(reminderName, infoBlock)

    return reminder
}