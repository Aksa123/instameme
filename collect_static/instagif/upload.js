let upload_form = document.querySelector("#upload-form")
let input_img = document.querySelector("#input-img")
let preview_img_container_display = document.querySelector("#preview-img-container-display")
let preview_img_container = document.querySelector("#preview-img-container")
let preview_img = document.querySelector("#preview-img")
let upload_submit = document.querySelector("#upload-submit")
let input_img_label = document.querySelector("#input-img-label")
let text_containers = document.querySelectorAll(".text-container")
let final_input_container = document.querySelector("#final-input-container")
let next_button = document.querySelector("#input-next")
let upload_overlay = document.querySelector("#upload-overlay")
let back_button = document.querySelector("#upload-cancel")


text_containers.forEach(text_container => {
    let text_input = text_container.querySelector("textarea.text-input")
    let text_div = text_container.querySelector("div.text-input")

    text_input.addEventListener("input", (e) => {
        text_input.value = text_input.value.toUpperCase()
        text_div.textContent = text_input.value
    })
})


function refreshInputs(){
    text_containers.forEach(text_container => {
        let text_input = text_container.querySelector("textarea.text-input")
        let text_div = text_container.querySelector("div.text-input")
    
        text_input.classList.toggle("display-none", false)
        text_input.value = ""
        text_div.classList.toggle("display-none", true)
        text_div.innerHTML = ""
    })
}



input_img.addEventListener("change", () => {
    refreshInputs()

    preview_img_container_display.classList.toggle("display-none", false)
    let data = input_img.files[0]
    let src = URL.createObjectURL(data)
    preview_img.src = src
    next_button.classList.toggle("display-none", false)
    input_img_label.classList.replace("margin-right-auto", "margin-right-20")
})


next_button.addEventListener("click", (e) => {
    e.preventDefault()
    upload_submit.disabled = false
    final_input_container.classList.toggle("display-none", false)
    upload_overlay.classList.replace("upload-overlay-inactive", "upload-overlay-active")
})

back_button.addEventListener("click", (e) => {
    e.preventDefault()
    upload_submit.disabled = true
    final_input_container.classList.toggle("display-none", true)
    upload_overlay.classList.replace("upload-overlay-active", "upload-overlay-inactive")
})


upload_form.addEventListener("submit", (e) => {
    e.preventDefault()

    text_containers.forEach(text_container => {
        let text_input = text_container.querySelector("textarea.text-input")
        let text_div = text_container.querySelector("div.text-input")

        text_input.classList.toggle("display-none", true)
        text_div.classList.toggle("display-none", false)
        text_div.innerHTML = text_div.textContent.replace(/(?:\r\n|\r|\n)/g, "<br>");
    })

    html2canvas(preview_img_container).then(canvas => {
        let url = new URL(window.location.origin + "/instagif/upload/")
        let csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
        let name = input_img.files[0].name.split(".")[0]
        let title = document.querySelector("#input-title").value
        let image = canvas.toDataURL("image/png", 1.0)
        let description = document.querySelector("#description").value
        let tags_raw = document.querySelector("#tags").selectedOptions
        let tags = ""
        for (let i=0; i<tags_raw.length; i++){
            let tag = tags_raw[i].value
            if (i === tags_raw.length -1){
                tags += tag
            }
            else{
                tags += tag + "-"
            }
        }

        let form_data = new FormData()
        form_data.append("image", image)
        form_data.append("name", name)
        form_data.append("title", title)
        form_data.append("description", description)
        form_data.append("tags", tags)

        fetch(url, {
            method: "POST",
            mode: "same-origin",
            headers: {
                "X-Requested-With" : "XMLHttpRequest",
                "X-CSRFToken": csrf
            },
            body: form_data
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data.status)
            console.log(data.message)
            if (data.status === "Done"){
                window.location.href = new URL(window.location.origin + "/instagif/detail/" + data.image_id);

            }
        })

    })

    
    
})

