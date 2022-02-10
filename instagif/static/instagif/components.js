const image_dots = "/static/instagif/dots.png"
const image_saved = "/static/instagif/saved.png"
const image_unsaved = "/static/instagif/unsaved.png"
const image_liked = "/static/instagif/liked.png"
const image_unliked = "/static/instagif/unliked.png"
const image_comment = "/static/instagif/comment.png"
const image_share = "/static/instagif/share.png"
const url_content_detail = "/instagif/detail/"
const url_search_tag = "/instagif/search/tag/"


function index__content(image, person){

    function print_mini_comments_html(mini_comments){
        let result = ''
        for (let i=0; i<mini_comments.length; i++){
            let mini_comment = mini_comments[i]
            let text = '<div class="content-item-comment-mini-comment"><p><span class="comment-name">' + mini_comment.username + ' </span> ' + mini_comment.content + '</p></div>'
            result += text
        }
        return result
    }

    function print_tags_html(tags){
        let result = ''
        for (let i=0; i<tags.length; i++){
            let tag = tags[i]
            let tag_url = url_search_tag + tag.name
            let text = '<a href="' + tag_url + '" ><span class="tag-span">#' + tag.name + '</span></a> '
            result += text
        }
        return result
    }

    let trigger = image.trigger ? '<input type="hidden" class="trigger" name="trigger" value="' + image.trigger + '">' : ''
    let detail_url = url_content_detail + image.id
    let like_auth = person ? '<button class="content-item-action-item-button like-button">' : '<button class="content-item-action-item-button like-button button-disabled" disabled>'
    let like_status = image.liked_by_user ? '<img src="' + image_liked + '" alt="like image" class="content-item-action-item-img">' :  '<img src="' + image_unliked + '" alt="unlike image" class="content-item-action-item-img">'
    let comment_auth = person ? '<button class="content-item-action-item-button comment-button">' : '<button class="content-item-action-item-button comment-button button-disabled" disabled>'
    let share_auth = person ? '<button class="content-item-action-item-button share-button">' : '<button class="content-item-action-item-button share-button button-disabled" disabled>'
    let save_auth = person ? '<button class="content-item-action-item-button save-button">' : '<button class="content-item-action-item-button save-button button-disabled" disabled>'
    let save_status = image.saved_by_user ? '<img src="' + image_saved + '" alt="save image" class="content-item-action-item-img">' : '<img src="' + image_unsaved + '" alt="save image" class="content-item-action-item-img">'
    let like_count = image.like_count > 0 ? '<div id="like-count-' + image.id + '" class="content-item-comment-likes-number">Liked by ' + image.like_count + ' people</div>' : '<div id="like-count-' + image.id + '" class="content-item-comment-likes-number">No likes yet</div>'
    let mini_comments_html = print_mini_comments_html(image.mini_comments)
    let mini_comment_count = image.mini_comments_count > 0 ? '<div class="content-item-comment-show">View all ' + image.mini_comments_count + ' comments</div>' : '<div class="content-item-comment-show">No comments yet</div>'
    let tags_html = print_tags_html(image.tags)

    let html = `
    <div class="content-item" id="content-${image.id}">
        ${trigger}
        <div class="content-item-info">
            <div class="content-item-info-item">
                <button class="content-item-info-item-button">
                    <img src="${image.avatar}" alt="info image" class="content-item-info-item-img">
                </button>
            </div>
            <div class="content-item-info-item info-name">
                <p class="content-item-info-item-name">${image.username}</p>
            </div>
            <div class="content-item-info-item info-etc">
                <button class="content-item-info-item-button">
                    <img src="${image_dots}" alt="etc dots image" class="content-item-info-item-img">
                </button>
            </div>
        </div>
        <div class="content-item-title">
            <a class="content-item-title-link" href="${detail_url}">${image.title}</a>
        </div>
        <div class="content-item-gif">
            <img src="${image.src}" alt="" class="content-item-gif-img">
        </div>
        <div class="content-item-action">
            <input class="image-id" value="${image.id}" type="hidden">

            <div class="content-item-action-item">
                ${like_auth}
                    ${like_status}
                </button>
            </div>
            <div class="content-item-action-item">
                ${comment_auth}
                    <img src="${image_comment}" alt="comment image" class="content-item-action-item-img">
                </button>
            </div>
            <div class="content-item-action-item">
                ${share_auth}
                    <img src="${image_share}" alt="share image" class="content-item-action-item-img">
                </button>
            </div>
            <div class="content-item-action-item content-item-action-item-save">
                ${save_auth}
                    ${save_status}
                </button>
            </div>
        </div>
        <div class="content-item-comment">
            ${like_count}
            -
            <br>
            ${tags_html}

            ${mini_comments_html}

            ${mini_comment_count}
        </div>
        <div class="content-item-date">${image.date}</div>

    </div>
    `

    return html
}

function index__tooltip(text){
    let tooltip_positioner = document.createElement("DIV")
    tooltip_positioner.id = "tooltip-positioner"

    let tooltip_container = document.createElement("DIV")
    tooltip_container.classList.add("scale0")
    tooltip_container.id = "tooltip-container"
    

    let tooltip_box = document.createElement("DIV")
    tooltip_box.id = "tooltip-box"

    let tooltip_box_triangle = document.createElement("DIV")
    tooltip_box_triangle.id = "tooltip-box-triangle"

    let tooltip_text = document.createElement("A")
    tooltip_text.id = "tooltip-text"
    tooltip_text.textContent = "Log in"
    tooltip_text.href = "/instagif/login/"

    tooltip_box.append(tooltip_text)
    tooltip_box.innerHTML += " to " + text
    tooltip_container.append(tooltip_box)
    tooltip_container.append(tooltip_box_triangle)
    tooltip_positioner.append(tooltip_container)



    return tooltip_positioner
}



export {index__content, index__tooltip}