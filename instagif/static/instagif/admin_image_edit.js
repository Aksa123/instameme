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

    let path = (window.location.pathname)
    let id = path.split("/")[5]
    console.log(id)
    let url = new URL(window.location.origin + "/instagif/admin/image/edit/" + id + "/")
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
    let title = form.querySelector("#title").value
    let user_id = form.querySelector("#user").value
    let image = form.querySelector("#avatar").files[0]
    let tags = form.querySelector("#tags").selectedOptions
    let tags_value = ""
    for (let i=0; i<tags.length; i++){
        let tag = tags[i]
        if (i === tags.length-1)
            tags_value += tag.value                  // to separate between values
        else{
            tags_value += tag.value + "-"  
        }
    }
    
    let form_data = new FormData()
    form_data.append("title", title)
    form_data.append("user_id", user_id)
    form_data.append("image", image)
    form_data.append("tags_str", tags_value)
    
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
            let users_menu = new URL(window.location.origin + "/instagif/admin/images/")
            window.location.replace(users_menu)
        }
        else{
            alert(data.message)
        }
    })
})