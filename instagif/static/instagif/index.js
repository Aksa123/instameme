import { index__content as create_content_item, index__tooltip as create_tooltip } from "./components.js"

let like_buttons = document.querySelectorAll(".like-button")
let comment_buttons = document.querySelectorAll(".comment-button")
let share_buttons = document.querySelectorAll(".share-button")
let save_buttons = document.querySelectorAll(".save-button")
let base_content_container = document.querySelector("#base-content-container")
let content = document.querySelector("#content")


const user_id = document.querySelector("#user-id").value
const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value

let page = 0


function addListenerToContentItem(element){
    let like_btn = element.querySelector(".like-button")
    like_btn.addEventListener("click", () => {
        let like_img = like_btn.querySelector(".content-item-action-item-img")

        let image_id = like_btn.parentElement.parentElement.querySelector(".image-id").value
        let url_like = new URL(window.location.origin + "/instagif/like/" + image_id + "/")
        let like_count = document.querySelector("#like-count-" + image_id)

        let form_data = new FormData()
        form_data.append("image_id", image_id)
        form_data.append("user_id", user_id)

        fetch(url_like, {
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
            if (data.liked === true){
                like_img.src = "/static/instagif/liked.png"
            }
            else{
                like_img.src = "/static/instagif/unliked.png"
            }

            if (data.like_count > 0){
                like_count.textContent = "Liked by " + data.like_count + " people"
            }
            else{
                like_count.textContent = "No likes yet"
            }
        })
        .catch((error) => alert(error))

        console.log("clicked image_id: " + image_id + " by user_id: " + user_id)
    })

    let save_btn = element.querySelector(".save-button")
    save_btn.addEventListener("click", function(){
        let img = save_btn.querySelector(".content-item-action-item-img")
        let image_id = save_btn.parentElement.parentElement.querySelector(".image-id").value
        let url = new URL(window.location.origin + "/instagif/save/" + image_id + "/")
        let form_data = new FormData()
        form_data.append("user_id", user_id)
        form_data.append("image_id", image_id)

        fetch(url, {
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
            if (data.saved){
                img.src = "/static/instagif/saved.png"
            }
            else{
                img.src = "/static/instagif/unsaved.png"
            }
        })
        .catch((error) => console.log(error))
    })

    let description_more = element.querySelector(".description-more")
    if (description_more){
        description_more.addEventListener("click", () => {
            let description_long = element.querySelector(".description-long")
            let description_less = element.querySelector(".description-less")

            description_less.addEventListener("click", () => {
                description_long.classList.toggle("display-none", true)
                description_more.classList.toggle("display-none", false)
            })

            description_long.classList.toggle("display-none", false)
            description_more.classList.toggle("display-none", true)
        })
    }
    
}

function addActionTooltip(content_item){
    let like_btn = content_item.querySelector(".like-button")
    like_btn.tooltip_text = "like"
    let save_btn = content_item.querySelector(".save-button")
    save_btn.tooltip_text = "save"
    let comment_btn = content_item.querySelector(".comment-button")
    comment_btn.tooltip_text = "comment"
    // let share_btn = content_item.querySelector(".share-button")
    // share_btn.tooltip_text = "share"
    let actions_list = [like_btn, save_btn, comment_btn]

    actions_list.forEach((action_btn) => {
        let action_item = action_btn.parentElement
        action_btn.addEventListener("mouseover", () => {
            let tooltip = create_tooltip(action_btn.tooltip_text)
            action_item.append(tooltip)
            setTimeout(() => {
                tooltip.querySelector("#tooltip-container").classList.toggle("scale0", false)
            }, 50);
            
        })

        action_btn.addEventListener("mouseout", () => {
            let tooltip = action_item.querySelector("#tooltip-positioner")
            setTimeout(() => {
                tooltip.querySelector("#tooltip-container").classList.toggle("scale0", true)
            }, 50);
            tooltip.remove()
            
        })
    })

}


function addListenerToAllContentItems(){
    let content_items = document.querySelectorAll(".content-item")
    let user_id = document.querySelector("#user-id").value

    for (let i=0; i<content_items.length; i++){
        let content_item = content_items[i]
        addListenerToContentItem(content_item)
    }

    if (user_id === "none"){
        for (let i=0; i<content_items.length; i++){
            let content_item = content_items[i]
            let content_item_id = content_item.id
            addActionTooltip(content_item)
        }
    }
}



function addIntersectionObserver(element){
    let options = {
        // root: document.querySelector('#scrollArea'),
        rootMargin: '0px 0px 100px 0px',
        threshold: 0
    }

    let observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            let title = entry.target.querySelector(".content-item-title-link").textContent
            if (entry.isIntersecting){
                apiCallContent()
                console.log(title + " yes")
                observer.unobserve(entry.target)
            }
            else{
                console.log(title + " no")
            }
            
        })
        
    }, options)

    element.querySelector(".content-item-title-link").style.color = "red"
    observer.observe(element)
}

function replaceIntersectionObserver(){
    let triggers = document.querySelectorAll(".trigger")
    for (let i=0; i<triggers.length; i++){
        let trigger = triggers[i]
        if (i === triggers.length -1){
            let element = trigger.parentElement
            addIntersectionObserver(element)
        }
        else{
            trigger.remove()
        }
    }
}


function apiCallContent(){
    page += 1   
    // if (page > 3){
    //     return false
    // }

    let url = new URL(window.location.origin + "/instagif/")
    url.searchParams.append("page", page)

    let result = fetch(url, {
        method: "GET",
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => res.json())

    result.then((data) => {
        let components = data.components
        let user = data.user
        for (let i=0; i<components.length; i++){
            let parser = new DOMParser()
            let component = components[i]
            let component_id = component.id
            let component_content = component.content
            let component_html = parser.parseFromString(component_content, "text/html")
            content.append(component_html.documentElement)
            
            let new_element = document.querySelector("#content-" + component_id)
            addListenerToContentItem(new_element)
            replaceIntersectionObserver()
        }
    })
    .catch((e) => console.log(e))
}



function addFunctionToSelectionArrowButtons(){
    let selection_container_extra = document.querySelector("#selection-container-extra")
    let selection_button_right = document.querySelector("#selection-arrow-right")
    let selection_button_left = document.querySelector("#selection-arrow-left")
    if (selection_button_left && selection_button_right){
        selection_button_left.addEventListener("click", (e) => {
            selection_container_extra.scrollBy({
                top: 0,
                left: -100,
                behavior: "smooth"
            })
        })
        selection_button_right.addEventListener("click", (e) => {
            selection_container_extra.scrollBy({
                top: 0,
                left: 100,
                behavior: "smooth"
            })
        })
    }
}



addFunctionToSelectionArrowButtons()
addListenerToAllContentItems()
setTimeout(replaceIntersectionObserver(), 3000);

