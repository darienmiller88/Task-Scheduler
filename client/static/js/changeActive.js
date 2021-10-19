const homelink = document.getElementById("home-link")
const setReminderLink = document.getElementById("set-reminder-link")
const navbarItems = document.getElementById("navBarItems")
const active = "active"

navbarItems.addEventListener("click", e => {        
    removeActive()

    if(e.target.classList.contains(active)){
        e.target.classList.remove(active)
    }else{
        e.target.classList.add(active)
    }
})

function removeActive(){
    navbarItems.querySelectorAll(".nav-item").forEach(li => {
        li.querySelector(".nav-link").classList.remove(active)
    })
}

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