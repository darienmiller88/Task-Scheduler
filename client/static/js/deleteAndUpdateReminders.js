const modalBody      = document.querySelector(".modal-body")
const myModalEl      = document.getElementById('editModal')
const saveChangesBtn = document.getElementById("saveEditBtn")
const API_URL        = window.location.hostname === "localhost" ? "http://localhost:8080/api/v1/reminders" : "https://thetaskscheduler.herokuapp.com/api/v1/reminders"

saveChangesBtn.addEventListener("click", e => {
    console.log("saved! body:", modalBody);    
    modalBody.innerHTML = ''
})

// myModalEl.addEventListener('hidden.bs.modal', e => {
//    modalBody.innerHTML = ''
// })

reminders.addEventListener("click", async e => {
    if(e.target.classList.contains("edit")){
        // const idDiv = document.createElement("div")

        // idDiv.className = "id"
        // idDiv.append("id: " + e.target.parentElement.parentElement.id)

        // modalBody.append(idDiv)
        // console.log("text:", modalBody.querySelector(".id").textContent);
        //console.log("edit clicked. id:", e.target.parentElement.parentElement.id);
    }else if(e.target.classList.contains("delete")){
        const id = e.target.parentElement.parentElement.id
        e.target.parentElement.parentElement.remove()

        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
})