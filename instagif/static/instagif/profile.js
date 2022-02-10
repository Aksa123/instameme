let profile_saved_images_container = document.querySelector("#profile-saved-images-container")
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

    saved_images_content.classList.replace("display-none", "display-inline-block")
    saved_images_content.style.bottom = getComputedStyle(profile_form).height
    setTimeout(() => {
        saved_images_content.classList.replace("left-100", "left-0")
        profile_content.classList.replace("left-0", "left-min100")
    }, 50)
}

function slideToProfile(){
    edit_profile_button.disabled = true
    saved_images_button.disabled = false
    selected_menu = "edit-profile"
    selection_line.classList.replace("selection-line-left50", "selection-line-left0")

    profile_content.classList.replace("hidden", "visible")
    profile_content.classList.replace("left-min100", "left-0")
    saved_images_content.classList.replace("left-0", "left-100")
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
    
    
    
    for (let i=0; i<menu_contents.length; i++){
        let menu_content = menu_contents[i]
        console.log(menu_content)
        menu_content.addEventListener("transitionend", () => {
            if (selected_menu === "saved-images"){
                console.log("saved")
                profile_content.classList.replace("visible", "hidden")
            }
            else if (selected_menu === "edit-profile"){
                console.log("edit")
                saved_images_content.classList.replace("display-inline-block", "display-none")
            }
            
        })
    }


    
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
        form_data.append("input_avatar", input_avatar)
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
            let message = data.message
            alert(message)
            if (status === "SUCCESS"){
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        })
    })
}
    



startProfilePage()
changePasswordContainerDisplay()
addSubmitEventListener()



if (hash === "#saved-images-content"){
    slideToSavedGifs()
}