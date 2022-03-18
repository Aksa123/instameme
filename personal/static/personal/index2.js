let project_items = document.querySelectorAll(".project-item")
let flex_container = document.querySelector("#project-flex-container")


function addHoverFunctionToProjectItems(){
    project_items.forEach((project_item) => {
        let project_item_img = project_item.querySelector(".project-item-img")
        project_item_img.addEventListener("mouseover", () => {
            let title_container = project_item.querySelector(".project-item-title-container")
            let title = project_item.querySelector(".project-item-title")
            title_container.classList.toggle("project-item-title-container-hover", true)
            title.classList.toggle("project-item-title-hover", true)
        })
        project_item_img.addEventListener("mouseout", () => {
            let title_container = project_item.querySelector(".project-item-title-container")
            let title = project_item.querySelector(".project-item-title")
            title_container.classList.toggle("project-item-title-container-hover", false)
            title.classList.toggle("project-item-title-hover", false)
        })

        let desc_button = project_item.querySelector(".show-desc")
        desc_button.show = false
        desc_button.addEventListener("click", () => {
            let desc = project_item.querySelector(".project-item-desc")
            if (desc_button.show === false){
                desc.classList.toggle("project-item-desc-hide", false)
                desc_button.show = true
            }
            else{
                desc.classList.toggle("project-item-desc-hide", true)
                desc_button.show = false
            }
        })
    })
}

function addDropdownFunction(){
    let dropdown_button = document.querySelector("#dropdown-button")
    let menu_container = document.querySelector("#menu-container")
    dropdown_button.expand = false

    dropdown_button.addEventListener("click", () => {
        if (dropdown_button.expand === false){
            menu_container.style.bottom = "0"
            dropdown_button.expand = true
        }
        else{
            menu_container.style.bottom = "250px"
            dropdown_button.expand = false
        }

    })
}


function addSlideProjectItem(){
    let button_right = document.querySelector("#project-direction-right")
    let button_left = document.querySelector("#project-direction-left")
    let swipe_length = 300 // in px

    button_right.addEventListener("click", () => {
        flex_container.scrollBy({
            top: 0,
            left: swipe_length,
            behavior: "smooth"
        })
    })
    button_left.addEventListener("click", () => {
        flex_container.scrollBy({
            top: 0,
            left: -1*swipe_length,
            behavior: "smooth"
        })
    })
    

}




addDropdownFunction()
addHoverFunctionToProjectItems()
addSlideProjectItem()