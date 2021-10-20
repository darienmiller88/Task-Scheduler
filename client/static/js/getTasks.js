const reminders = document.querySelector(".reminders")
const API_URL_GET = window.location.hostname === "localhost" ? "http://localhost:8080/api/v1/reminders" : "https://thetaskscheduler.herokuapp.com/api/v1/reminders"
const editModalName = "#editModal"
getTasks()

async function getTasks(){
    const response = await fetch(API_URL_GET)
    const result = await response.json()

    addTasks(result)
}

function addTasks(tasks){
    tasks.forEach(task => {
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
    const dateValue = (task["date"]) ? task["date"] + ", " : task["days"].join(", ") + ", "

    reminder.id = task["id"]
    reminder.className = "reminder"
    reminderName.className = "reminder-name"
    infoBlock.className = "info-block"
    date.className = "date"
    time.className = "time"
    editButton.className = "edit"
    deleteButton.className = "delete"

    if(task["days"]){
        date.classList.add("days")
    }

    reminderName.textContent = task["reminder"]
    date.textContent = dateValue
    time.textContent = task["time"]
    editButton.textContent = "edit"
    deleteButton.textContent = "delete"

    // editButton.setAttribute("data-bs-toggle", "modal")
    // editButton.setAttribute("data-bs-target", editModalName)

    date.append(time)
    infoBlock.append(date, editButton, deleteButton)
    reminder.append(reminderName, infoBlock)

    return reminder
}