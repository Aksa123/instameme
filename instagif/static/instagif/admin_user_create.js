const form = document.querySelector("#create-form")
const avatar = document.querySelector("#avatar")


avatar.addEventListener("change", () => {
    let avatar_preview = document.querySelector("#avatar-preview")
    let data = avatar.files[0]
    let src = URL.createObjectURL(data)
    avatar_preview.src = src
})


form.addEventListener("submit", (e) => {
    e.preventDefault()

    let url = new URL(window.location.origin + "/instagif/admin/user/create/")
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
    let username = form.querySelector("#username").value
    let email = form.querySelector("#email").value
    let avatar = form.querySelector("#avatar").files[0]
    let password = form.querySelector("#password").value
    let password_confirm = form.querySelector("#password-confirm").value
    
    let form_data = new FormData()
    form_data.append("username", username)
    form_data.append("email", email)
    form_data.append("avatar", avatar)
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