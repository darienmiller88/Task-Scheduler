const buttonGroup = document.querySelector(".set-occuring-btn-group")
const isSingleOccuringBtn = document.querySelector(".is-single-occuring")
const isReoccuringBtn = document.querySelector(".is-reoccuring")
const active = "active"

//Initially highlight the single occuring button.
isSingleOccuringBtn.classList.add(active)

isSingleOccuringBtn.addEventListener("click", () => {
    if(!isSingleOccuringBtn.classList.contains(active)){
        isSingleOccuringBtn.classList.add(active)
        isReoccuringBtn.classList.remove(active)

        //Hide the reoccuring form, and show the single occuring form
        singleOccuringReminderForm.style.display = ''
        reoccuringReminderForm.style.display = 'none'
    }
})

isReoccuringBtn.addEventListener("click", () => {
    //If the option for a reoccuring form does not contain an active class, add it, and hide the
    //single occuring form.
    if(!isReoccuringBtn.classList.contains(active)){
        isReoccuringBtn.classList.add(active)
        isSingleOccuringBtn.classList.remove(active)

        //Hide the single occuring form, and show the reoccuring form
        singleOccuringReminderForm.style.display = 'none'
        reoccuringReminderForm.style.display = ''
    }
})