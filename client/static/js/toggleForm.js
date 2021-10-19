const buttonGroup = document.querySelector(".set-occuring-btn-group")
const isSingleOccuring = document.querySelector(".is-single-occuring")
const isReoccuring = document.querySelector(".is-reoccuring")
const active = "active"

//Initially highlight the single occuring button.
isSingleOccuring.classList.add(active)

isSingleOccuring.addEventListener("click", e => {
    if(!isSingleOccuring.classList.contains(active)){
        isSingleOccuring.classList.add(active)
        isReoccuring.classList.remove(active)

        //Hide the reoccuring form, and show the single occuring form
        singleOccuringReminderForm.style.display = ''
        reoccuringReminderForm.style.display = 'none'
    }
})

isReoccuring.addEventListener("click", e => {
    //If the option for a reoccuring form does not contain an active class, add it, and hide the
    //single occuring form.
    if(!isReoccuring.classList.contains(active)){
        isReoccuring.classList.add(active)
        isSingleOccuring.classList.remove(active)

        //Hide the single occuring form, and show the reoccuring form
        singleOccuringReminderForm.style.display = 'none'
        reoccuringReminderForm.style.display = ''
    }
})