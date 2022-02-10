const form = document.querySelector("#edit-form")



form.addEventListener("submit", (e) => {
    e.preventDefault()

    let path = window.location.pathname.split("/")
    let id = path[5]
    let url = new URL(window.location.origin + "/instagif/admin/tag/edit/" + id + "/")
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
    let name = form.querySelector("#name").value
    console.log(name)
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