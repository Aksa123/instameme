let follow_button = document.querySelector("#follow-button")
const user_id = document.querySelector("#user-id").value
const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value







follow_button.addEventListener("click", () => {
    console.log("clicked")
    let url = new URL(window.location.origin + "/instagif/follow/" + user_id + "/")
    fetch(url, {
        method: "POST",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": csrf
        }
    }).then(res => res.json())
    .then(data => {
        let is_following = data.is_following
        let status = data.status
        let message = data.message
        console.log(is_following)
        if (status === "Done"){
            if (is_following){
                follow_button.classList.replace("follow-background", "unfollow-background")
                follow_button.textContent = "Following"
            }
            else{
                follow_button.classList.replace("unfollow-background", "follow-background")
                follow_button.textContent = "Follow"
            }
        }
        else{
            alert(message)
        }
        
    })

})