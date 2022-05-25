let show_mores = document.querySelectorAll(".show-more")
let page = 1
const reel_super_container = document.querySelector("#reel-super-container")
const reel_type = document.querySelector("#reel-type").value
const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value
const image_dots = "/static/instagif/dots.png"
const image_saved = "/static/instagif/saved.png"
const image_unsaved = "/static/instagif/unsaved.png"
const image_liked = "/static/instagif/liked.png"
const image_unliked = "/static/instagif/unliked.png"
const image_comment = "/static/instagif/comment.png"
const image_share = "/static/instagif/share.png"
const url_content_detail = "/instagif/detail/"
const url_search_tag = "/instagif/search/tag/"

function startUp(){
    let reel_contents = document.querySelectorAll(".reel-content-container")
    for (let i=0; i<reel_contents.length; i++){
        let reel_content = reel_contents[i]

        addFunctionToDescription(reel_content)
        addContentSwipeFunctionToContentImage(reel_content)
        addLikeFunction(reel_content)
        addSaveFunction(reel_content)
        addFollowFunction(reel_content)
    }

    let trigger_content = document.querySelector(".trigger").parentElement
    addIntersectionObserverToTriggerContent(trigger_content)

    AddFunctionToSign()
}

function addFunctionToDescription(reel_content){
    let show_more = reel_content.querySelector(".show-more")
    if (show_more){
        let description_long = reel_content.querySelector(".description-long")
        let show_less = reel_content.querySelector(".show-less")
        let content_image = reel_content.querySelector(".content-img")
        let detail_container = reel_content.querySelector(".detail-container")

        function maxDetail(){
            detail_container.expand = true        
            description_long.classList.toggle("display-none", false)
            show_more.classList.toggle("display-none", true)
            detail_container.style.height = "250px"
            content_image.classList.toggle("opacity-less", true)
        }
        function minDetail(){
            detail_container.expand = false
            detail_container.style.height = "150px"
            content_image.classList.toggle("opacity-less", false)
        }
    
        show_more.addEventListener("click", () => {
            maxDetail()
        })
        show_less.addEventListener("click", () => {
            minDetail()
        })
    
        detail_container.addEventListener("transitionend", () => {
            if (detail_container.expand === false){                         // hide description long when after un-expanding
                description_long.classList.toggle("display-none", true)
                show_more.classList.toggle("display-none", false)
            }
        })
    }
}
function addContentSwipeFunctionToContentImage(reel_content){
    let content_image = reel_content.querySelector(".content-img")
    content_image.addEventListener("mousedown", (e) => {
        // e.preventDefault()
        console.log(e.button)
        if (e.button === 0){                                                         // if left-clicked
            let current_reel = content_image.parentElement
            let next_reel = current_reel.nextElementSibling
            if (next_reel === null){
                return false
            }
            next_reel.scrollIntoView()
            next_reel.scrollIntoView(true)
            next_reel.scrollIntoView({behavior: "smooth"})
        }
        else if (e.button === 2){
            let current_reel = content_image.parentElement
            let next_reel = current_reel.previousElementSibling
            if (next_reel === null){
                return false                                                            // don't do anything if no more contents
            }
            next_reel.scrollIntoView()
            next_reel.scrollIntoView(true)
            next_reel.scrollIntoView({behavior: "smooth"})
        }
    })

    content_image.addEventListener("contextmenu", e => {
        e.preventDefault()
        let current_reel = content_image.parentElement
        let next_reel = current_reel.previousElementSibling
        if (next_reel === null){
            return false                                                            // don't do anything if no more contents
        }
        next_reel.scrollIntoView()
        next_reel.scrollIntoView(true)
        next_reel.scrollIntoView({behavior: "smooth"})
        
        return false                // to disable context-menu ???
    })

}

function addLikeFunction(reel_content){
    let like_button = reel_content.querySelector(".like-button")
    like_button.addEventListener("click", () => {
        let image_id = reel_content.id.split("_")[1]
        let url = new URL(window.location.origin + "/instagif/like/" + image_id + "/")
        fetch(url, {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": csrf
            }
        }).then(res => res.json())
        .then(data => {
            let status = data.status
            let liked = data.liked
            let like_count_data = data.like_count
            let like_img = reel_content.querySelector(".like-img")
            let like_count = reel_content.querySelector(".like-count")

            like_count.textContent = like_count_data
            if (liked){
                like_img.src = image_liked
            }
            else{
                like_img.src = image_unliked
            }
        })
    })
}

function addSaveFunction(reel_content){
    let save_button = reel_content.querySelector(".save-button")
    save_button.addEventListener("click", () => {
        let image_id = reel_content.id.split("_")[1]
        let url = new URL(window.location.origin + "/instagif/save/" + image_id + "/")
        fetch(url, {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": csrf
            }
        }).then(res => res.json())
        .then(data => {
            let status = data.status
            let saved = data.saved
            let save_img = reel_content.querySelector(".save-img")

            if (saved){
                save_img.src = image_saved
            }
            else{
                save_img.src = image_unsaved
            }
        })
    })
}

function addFollowFunction(reel_content){
    let follow_button = reel_content.querySelector(".follow")
    follow_button.addEventListener("click", () => {
        let uploader_id = reel_content.querySelector(".uploader-id").value
        let url = new URL(window.location.origin + "/instagif/follow/" + uploader_id + "/")
        fetch(url, {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": csrf
            }
        }).then(res => res.json())
        .then(data => {
            let status = data.status
            let message = data.message
            let is_following = data.is_following
            let follow_icon = reel_content.querySelector(".bi")
            let follow_text = reel_content.querySelector(".follow-text")
            
            if (status === "Done"){
                if (is_following){
                    follow_text.textContent = "Following"
                    follow_button.classList.toggle("following", true)
                    follow_icon.classList.replace("bi-plus", "bi-check-all")
                }
                else{
                    follow_text.textContent = "Follow"
                    follow_button.classList.toggle("following", false)
                    follow_icon.classList.replace("bi-check-all", "bi-plus")
                }
                updateFollowStatusToAffectedReels(uploader_id, is_following)
            }
            else{
                alert(message)
            }
        })
    })
}

function updateFollowStatusToAffectedReels(uploader_id, is_following){
    let reel_contents_inputs = document.querySelectorAll(".uploader-id-" + uploader_id)
    for (let i=0; i<reel_contents_inputs.length; i++){
        let reel_content = reel_contents_inputs[i].parentElement
        let follow_button = reel_content.querySelector(".follow")
        let follow_icon = reel_content.querySelector(".bi")
        let follow_text = reel_content.querySelector(".follow-text")
        if (is_following){
            follow_text.textContent = "Following"
            follow_button.classList.toggle("following", true)
            follow_icon.classList.replace("bi-plus", "bi-check-all")
        }
        else{
            follow_text.textContent = "Follow"
            follow_button.classList.toggle("following", false)
            follow_icon.classList.replace("bi-check-all", "bi-plus")
        }
    }
}

function intersectionObserverFunction(entries, observer){
    console.log("observed")
    page += 1
    let url = new URL(window.location)
    url.searchParams.append("page", page)
    // if (reel_type === "all"){
    //     url = new URL(window.location.origin + "/instagif/reel/all/?page=" + page)
    // }
    // else{
    //     url = new URL(window.location.origin + "/instagif/reel/")
    // }
    fetch(url, {
        method: "GET",
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => res.json())
    .then(data => {
        let images_list = data.images_list
        images_list.forEach(image_str => {
            let parser = new DOMParser()
            let image_html = parser.parseFromString(image_str, "text/html").documentElement.querySelector(".reel-content-container")
            reel_super_container.append(image_html)
            addFunctionToDescription(image_html)
            addContentSwipeFunctionToContentImage(image_html)
            addLikeFunction(image_html)
            addSaveFunction(image_html)
            addFollowFunction(image_html)
            console.log(image_html)
        })
    })
}

function addIntersectionObserverToTriggerContent(reel_content){
    let options = {
        root: document.querySelector('#reel-super-container'),
        rootMargin: '0px',
        threshold: 0
      }
      
    let observer = new IntersectionObserver(intersectionObserverFunction, options);
    observer.observe(reel_content)
}

function AddFunctionToSign(){
    const sign_icon = document.querySelector("#sign-icon")
    const sign_text = document.querySelector("#sign-text")
    console.log("start")
    sign_icon.addEventListener("mouseover", () => {
        sign_text.classList.toggle("sign-hide", false)
        console.log("in")
    })
    sign_icon.addEventListener("mouseout", () => {
        sign_text.classList.toggle("sign-hide", true)
        console.log("out")
    })

}

startUp()