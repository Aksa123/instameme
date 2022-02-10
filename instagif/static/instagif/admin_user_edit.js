const form = document.querySelector("#edit-form")
const avatar = document.querySelector("#avatar")


avatar.addEventListener("change", () => {
    let avatar_preview = document.querySelector("#avatar-preview")
    let data = avatar.files[0]
    let src = URL.createObjectURL(data)
    avatar_preview.src = src
})


form.addEventListener("submit", (e) => {
    e.preventDefault()

    let path = window.location.pathname.split("/")
    let id = path[5]
    let url = new URL(window.location.origin + "/instagif/admin/user/edit/" + id + "/")
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
    let username = form.querySelector("#username").value
    let email = form.querySelector("#email").value
    let avatar = form.querySelector("#avatar").files[0]
    let password_checkbox = form.querySelector("#password-checkbox").checked
    let password = form.querySelector("#password").value
    let password_confirm = form.querySelector("#password-confirm").value

    console.log(avatar)
    
    let form_data = new FormData()
    form_data.append("username", username)
    form_data.append("email", email)
    form_data.append("avatar", avatar)
    form_data.append("password_checkbox", password_checkbox)
    form_data.append("password", password)
    form_data.append("password_confirm", password_confirm)
    
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
            let users_menu = new URL(window.location.origin + "/instagif/admin/users/")
            window.location.replace(users_menu)
        }
        else{
            alert(data.message)
        }
    })
})