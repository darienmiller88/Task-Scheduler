const homelink = document.getElementById("home-link")
const setReminderLink = document.getElementById("set-reminder-link")

function changeHomeToActive(){
    //If the home link already has the "active" class added, ignore it.
    if(homelink.classList.contains("active")){
        return
    } 

    //Otherwise, add it to the list of classes, and remove it from the set reminder link.
    homelink.classList.add("active")
    setReminderLink.classList.remove("active")
}

function changeSetReminderToActive(){
    //If the set reminder link already has the "active" class added, ignore it.
    if(setReminderLink.classList.contains("active")){
        return
    } 

    //Otherwise, add it to the list of classes, and remove it from the home link
    setReminderLink.classList.add("active")
    homelink.classList.remove("active")
}