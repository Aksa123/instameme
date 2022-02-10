var input_email = document.querySelector("#form-email")
var input_password = document.querySelector("#form-password")
var input_confirm_password = document.querySelector("#form-confirm-password")
var input_name = document.querySelector("#form-name")
var input_avatar = document.querySelector("#form-avatar")
var loaded_avatar = document.querySelector("#loaded-avatar")

var password_dont_match = document.querySelector("#password-dont-match")
var form = document.querySelector("#signup-form")
var submit = document.querySelector("#form-submit")

var url_index = new URL(window.location.origin + "/instagif/")

var input_list = [input_email, input_password, input_confirm_password, input_name]  // exclude avatar


function setInputPlaceholderToSmall(placeholder_element){
    placeholder_element.classList.remove("input-placeholder-big")
    placeholder_element.classList.add("input-placeholder-small")
}
function setInputPlaceholderToBig(placeholder_element){
    placeholder_element.classList.remove("input-placeholder-small")
    placeholder_element.classList.add("input-placeholder-big")
}

function startSetPlaceholder(){
    // inital check input values

    for (let i in input_list){
        let input = input_list[i]
        let input_placeholder = input.parentElement.querySelector(".input-placeholder")
        if (input.value !== ""){
            console.log("input added")
            setInputPlaceholderToSmall(input_placeholder)
        }
        else{
            setInputPlaceholderToBig(input_placeholder)
        }
    }
}

function startAddEventListenerToInputs(){
    for (let i in input_list){
        let input = input_list[i]
        let input_placeholder = input.parentElement.querySelector(".input-placeholder")
        input.addEventListener("keyup", function(){
            if (input.value !== ""){
                console.log("input added")
                setInputPlaceholderToSmall(input_placeholder)
            }
            else{
                setInputPlaceholderToBig(input_placeholder)
            }
        })
    }

    input_avatar.addEventListener("change", function(){
        let data = input_avatar.files[0]
        let src = URL.createObjectURL(data)
        loaded_avatar.src = src
        loaded_avatar.style.display = "block"
    })

    input_confirm_password.addEventListener("keyup", function(){
        if (input_confirm_password.value !== input_password.value){
            password_dont_match.style.visibility = "visible"
        }
        else{
            password_dont_match.style.visibility = "hidden"
        }
    })

    
    form.addEventListener("submit", function(e){
        e.preventDefault()


        let form_data = new FormData()
        form_data.append("email", input_email.value)
        form_data.append("avatar", input_avatar.files[0])
        form_data.append("name", input_name.value)
        form_data.append("password", input_password.value)

        let url = new URL(location.origin + "/instagif/signup/")
        let csrf = document.querySelector("[name=csrfmiddlewaretoken]").value

        // let xhr = new XMLHttpRequest()
        // 
        // xhr.setRequestHeader("X-CSRFToken", csrf)
        // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        // xhr.setRequestHeader("Content-Type", 'application/json')
        // console.log(xhr.getResponseHeader)
        // xhr.open("POST", url)
        // xhr.responseType = "json"
        // xhr.onload = function(){
        //     console.log("joss")
        // }
        // xhr.send()

        fetch(url, {
            method: "POST",
            mode: "same-origin",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": csrf,
            },
            body: form_data
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "Success"){
                alert(data.reason)
                setTimeout(() => {
                    window.location.replace(url_index)
                }, 2000)
            }
            else if(data.status === "Fail"){
                alert("Registration failed. " + data.reason)
            } 
        })
        .catch((error) => console.log(error))
    })
}


startAddEventListenerToInputs()
startSetPlaceholder()


