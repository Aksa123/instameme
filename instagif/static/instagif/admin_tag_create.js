const form = document.querySelector("#create-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let url = new URL(window.location.origin + "/instagif/admin/tag/create/")
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
    let name = form.querySelector("#name").value
    
    let form_data = new FormData()
    form_data.append("name", name)
    
    fetch(url, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrf,
            "X-Requested-With": "XMLHttpRequest"
        },
        body: form_data
    }).then(res => res.json())
    .then((data) => {
        if (data.status === "Ok"){
            let users_menu = new URL(window.location.origin + "/instagif/admin/tags/")
            window.location.replace(users_menu)
        }
        else{
            alert(data.message)
        }
    })
})