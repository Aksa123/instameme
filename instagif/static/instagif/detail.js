const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
const image_id = document.querySelector("#image-id").value

let like_button = document.querySelector("#like-button")
let save_button = document.querySelector("#save-button")
let share_button = document.querySelector("#share-button")
let comment_form = document.querySelector("#comment-form")
let comment_container = document.querySelector(".content-item-comment")
let comment_count = document.querySelector("#comments-number")
let detail_content = document.querySelector("#detail-content")
let comment_form_container = document.querySelector("#comment-form-container")
let comment_item_container = document.querySelector("#content-item-comment-item-container")


like_button.addEventListener("click", function(){
    let url = new URL(window.location.origin + "/instagif/like/" + image_id + "/")
    let img = like_button.querySelector(".content-item-action-item-img")
    let like_count = document.querySelector("#like-count-" + image_id)

    fetch(url, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrf,
            "X-Requested-With": "XMLHTTPRequest"
        },
        mode: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.status)
        if (data.liked){
            img.src = "/static/instagif/liked.png"
        }
        else{
            img.src = "/static/instagif/unliked.png"
        }

        if (data.like_count > 0){
            like_count.textContent = "Liked by " + data.like_count + " people"
        }
        else{
            like_count.textContent = "No likes yet"
        }
    })
    .catch((error) => console.log(error))
})

save_button.addEventListener("click", () => {
    let url = new URL(window.location.origin + "/instagif/save/" + image_id + "/")
    let img = save_button.querySelector(".content-item-action-item-img")

    fetch(url, {
        method: "POST",
        headers: {
            "X-CSRFToken": csrf,
            "X-Requested-With": "XMLHTTPRequest"
        },
        mode: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.status)
        if (data.saved){
            img.src = "/static/instagif/saved.png"
        }
        else{
            img.src = "/static/instagif/unsaved.png"
        }
    })
    .catch((error) => console.log(error))
})

function appendNewComment(data){

    let content_item_comment = document.createElement("DIV")
    content_item_comment.classList.add("content-item-comment-item")
    content_item_comment.id = data.comment_id

    let content_item_comment_item_user_avatar = document.createElement("DIV")
    content_item_comment_item_user_avatar.classList.add("content-item-comment-item-user-avatar")

    let content_item_comment_item_img = document.createElement("IMG")
    content_item_comment_item_img.classList.add("content-item-comment-item-img")
    content_item_comment_item_img.src = data.avatar
    content_item_comment_item_img.alt = "user avatar img"

    let content_item_comment_item_content = document.createElement("DIV")
    content_item_comment_item_content.classList.add("content-item-comment-item-content")

    let content_item_comment_item_username_date_container = document.createElement("DIV")
    content_item_comment_item_username_date_container.classList.add("content-item-comment-item-username-date-container")

    let content_item_comment_item_username = document.createElement("DIV")
    content_item_comment_item_username.classList.add("content-item-comment-item-username")
    content_item_comment_item_username.textContent = data.name

    let content_item_comment_item_date = document.createElement("DIV")
    content_item_comment_item_date.classList.add("content-item-comment-item-date")
    content_item_comment_item_date.textContent = data.date_created

    let content_item_comment_item_text = document.createElement("DIV")
    content_item_comment_item_text.classList.add("content-item-comment-item-text")
    content_item_comment_item_text.textContent = data.content

    content_item_comment_item_user_avatar.appendChild(content_item_comment_item_img)
    content_item_comment_item_username_date_container.appendChild(content_item_comment_item_username)
    content_item_comment_item_username_date_container.appendChild(content_item_comment_item_date)
    content_item_comment_item_content.appendChild(content_item_comment_item_username_date_container)
    content_item_comment_item_content.appendChild(content_item_comment_item_text)
    content_item_comment.appendChild(content_item_comment_item_user_avatar)
    content_item_comment.appendChild(content_item_comment_item_content)

    comment_item_container.appendChild(content_item_comment)

    window.location.replace("#" + data.comment_id)

}



comment_form.addEventListener("submit", function(e){
    e.preventDefault()

    let url = new URL(window.location.origin + "/instagif/comment/")
    let comment_input = document.querySelector("#comment-input").value
    let form_data = new FormData()
    form_data.append("image_id", image_id)
    form_data.append("content", comment_input)

    fetch(url,{
        method: "POST",
        headers: {
            "X-CSRFToken": csrf,
            "X-Requested-With": "XMLHTTPRequest"
        },
        mode: "same-origin",
        body: form_data
    })
    .then((res) => res.json())
    .then((data) => {
        comment_input.textContent = ""
        appendNewComment(data)
        if (data.comment_count > 1){
            comment_count.textContent = data.comment_count + " COMMENTS"
        }
        else{
            comment_count.textContent = data.comment_count + " COMMENT"
        }
        
    })

})

