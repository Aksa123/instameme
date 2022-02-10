let super_menu = document.querySelector("#menu").value
const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value


function addEventListenerToDeleteButtons(){
    let delete_buttons = document.querySelectorAll(".delete-button")
    delete_buttons.forEach((delete_btn) => {
        delete_btn.addEventListener("click", (e) => {
            e.preventDefault()
            
            let menu = delete_btn.id.split("-")[0]
            let id = parseInt(delete_btn.id.split("-")[1])
            
            if (menu === "user" && super_menu === "users"){
                let url = new URL(window.location.origin + "/instagif/admin/user/delete/" + id)
                fetch(url, {
                    method: "DELETE",
                    headers: {
                        "X-CSRFToken": csrf,
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).then((res) => res.json())
                .then((data) => {
                    if (data.status == "Ok"){
                        let table_row = document.querySelector("#row-" + id)
                        table_row.remove()
                    }
                    else{
                        alert(data.message)
                    }
                })
            }

            else if (menu === "tag" && super_menu === "tags"){
                let url = new URL(window.location.origin + "/instagif/admin/tag/delete/" + id)
                fetch(url, {
                    method: "DELETE",
                    headers: {
                        "X-CSRFToken": csrf,
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).then((res) => res.json())
                .then((data) => {
                    if (data.status == "Ok"){
                        let table_row = document.querySelector("#row-" + id)
                        table_row.remove()
                    }
                    else{
                        alert(data.message)
                    }
                })
            }

            else if (super_menu === "images"){
                let id = delete_btn.id.split("__")[1]
                console.log(id)
                let url = new URL(window.location.origin + "/instagif/admin/image/delete/" + id)
                fetch(url, {
                    method: "DELETE",
                    headers: {
                        "X-CSRFToken": csrf,
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).then((res) => res.json())
                .then((data) => {
                    if (data.status == "Ok"){
                        let table_row = document.querySelector("#row-" + id)
                        table_row.remove()
                    }
                    else{
                        alert(data.message)
                    }
                })
            }

            
        })
    })
}




addEventListenerToDeleteButtons()