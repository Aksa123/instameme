var input_email = document.querySelector("#form-email")
var input_password = document.querySelector("#form-password")

var placeholder_email = document.querySelector("#email-placeholder")
var placeholder_password = document.querySelector("#password-placeholder")

var login_form = document.querySelector("#login-form")
var error_message = document.querySelector("#error-message")

function setInputPlaceholderToSmall(placeholder_element){
    placeholder_element.classList.remove("input-placeholder-big")
    placeholder_element.classList.add("input-placeholder-small")
}

function setInputPlaceholderToBig(placeholder_element){
    placeholder_element.classList.remove("input-placeholder-small")
    placeholder_element.classList.add("input-placeholder-big")
}

function startAddListenerToInputs(){
    input_email.addEventListener("keyup", function(){
        if (input_email.value !== ""){
            console.log("input added")
            setInputPlaceholderToSmall(placeholder_email)
        }
        else{
            setInputPlaceholderToBig(placeholder_email)
        }
    })
    
    input_password.addEventListener("keyup", function(){
        if (input_password.value !== ""){
            console.log("input added")
            setInputPlaceholderToSmall(placeholder_password)
        }
        else{
            setInputPlaceholderToBig(placeholder_password)
        }
    })

    login_form.addEventListener("submit", function(e){
        e.preventDefault()

        let url_redirect_if_success = new URL(window.location.origin + "/instagif/")
        let url_login = new URL(window.location.origin + "/instagif/login/")
        let csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
        let form_data = new FormData()
        form_data.append("email", input_email.value)
        form_data.append("password", input_password.value)

        fetch(url_login, {
            method: "POST",
            mode: "same-origin",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": csrf
            },
            body: form_data
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "Success"){
                alert(data.reason)
                setTimeout(() => (window.location.replace(url_redirect_if_success), 1000))
            }
            else{
                error_message.style.visibility = "visible"
            }
        })
        .catch((error) => console.log(error))

    })
    
}
// inital check input values
function startCheckInitialInputValues(){
    if (input_email.value !== ""){
        setInputPlaceholderToSmall(placeholder_email)
    }
    
    else{
        setInputPlaceholderToBig(placeholder_email)
    }
    
    if (input_password.value !== ""){
        console.log("input added")
        setInputPlaceholderToSmall(placeholder_password)
    }
    else{
        setInputPlaceholderToBig(placeholder_password)
    }
}


startAddListenerToInputs()
startCheckInitialInputValues()




