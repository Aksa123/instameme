let profile_saved_images_container = document.querySelector("#profile-saved-images-container")
const base_content_container = document.querySelector("#base-content-container")
const profile_saved_extra_container = document.querySelector("#profile-saved-extra-container")
let edit_profile_button = document.querySelector("#edit-profile-button")
let saved_images_button = document.querySelector("#saved-images-button")
let selection_line = document.querySelector("#selection-line")
let selected_menu = "edit-profile"
let profile_content = document.querySelector("#profile-content")
let saved_images_content = document.querySelector("#saved-images-content")
let password_input_container = document.querySelector("#password-input-container")
let change_password_checkbox = document.querySelector("#change-password-checkbox")
let profile_form = document.querySelector("#profile-form")
let hash = window.location.hash

const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value

let menu_contents = [profile_content, saved_images_content]

function changePasswordContainerDisplay(){
    if (change_password_checkbox.checked){
        password_input_container.classList.replace("display-none", "display-block")
    }
    else{
        password_input_container.classList.replace("display-block", "display-none")
    }
}

function slideToSavedGifs(){
    edit_profile_button.disabled = false
    saved_images_button.disabled = true
    selected_menu = "saved-images"
    selection_line.classList.replace("selection-line-left0", "selection-line-left50")

    profile_saved_images_container.classList.replace("left-0", "left-min100")
    profile_saved_extra_container.classList.replace("overflow-y-hidden", "overflow-y-scroll")
}

function slideToProfile(){
    edit_profile_button.disabled = true
    saved_images_button.disabled = false
    selected_menu = "edit-profile"
    selection_line.classList.replace("selection-line-left50", "selection-line-left0")

    profile_saved_images_container.classList.replace("left-min100", "left-0")
    profile_saved_extra_container.classList.replace("overflow-y-scroll", "overflow-y-hidden")
}



function startProfilePage(){
    saved_images_button.addEventListener("click", () => {
        slideToSavedGifs()
    })
    
    edit_profile_button.addEventListener("click", () => {
        slideToProfile()
    })
    
    change_password_checkbox.addEventListener("click", () => {
        
        console.log(getComputedStyle(profile_form).height)
    
        changePasswordContainerDisplay()
    })    
}


function addSubmitEventListener(){
    profile_form.addEventListener("submit", (e) => {
        e.preventDefault()

        let url = new URL(window.location.origin + "/instagif/profile/edit/")
        let input_avatar = document.querySelector("#avatar-input").files[0]
        let input_name = document.querySelector("#name-input").value
        let input_email = document.querySelector("#email-input").value
        let input_password_checkbox = document.querySelector("#change-password-checkbox").checked
        let input_old_password = document.querySelector("#old-password-input").value
        let input_new_password = document.querySelector("#new-password-input").value
        let input_new_password_confirm = document.querySelector("#confirm-new-password-input").value

        let form_data = new FormData()
        if (input_avatar){
            form_data.append("input_avatar", input_avatar)
            console.log("Avatar is changed")
        }
        
        form_data.append("input_name", input_name)
        form_data.append("input_email", input_email)
        form_data.append("input_password_checkbox", input_password_checkbox)
        form_data.append("input_old_password", input_old_password)
        form_data.append("input_new_password", input_new_password)
        form_data.append("input_new_password_confirm", input_new_password_confirm)
        console.log(url)
        fetch(url, {
            method: "POST",
            mode: "same-origin",
            headers: {
                "X-CSRFToken": csrf,
                "HTTP_X_REQUESTED_WITH": "XMLHttpRequest",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: form_data
        }).then((res) => res.json())
        .then((data) => {
            let status = data.status
            let messege = data.messege
            alert(messege)
            if (status === "SUCCESS"){
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        })
    })
}
    
function onPartChange(){
    window.addEventListener("hashchange", (e) => {
        e.preventDefault()                          // can't be prevented :(
        if (window.location.hash === "#saved-images"){
            slideToSavedGifs()
        }
        else if (window.location.hash === "#profile"){
            slideToProfile()
        }
    })
    
}


startProfilePage()
changePasswordContainerDisplay()
addSubmitEventListener()
onPartChange()


if (hash === "#saved-images"){
    slideToSavedGifs()
}