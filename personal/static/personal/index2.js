let project_items = document.querySelectorAll(".project-item")



function addHoverFunctionToProjectItems(){
    project_items.forEach((project_item) => {
        project_item.addEventListener("mouseover", () => {
            let title_container = project_item.querySelector(".project-item-title-container")
            let title = project_item.querySelector(".project-item-title")
            title_container.classList.toggle("project-item-title-container-hover", true)
            title.classList.toggle("project-item-title-hover", true)
        })
        project_item.addEventListener("mouseout", () => {
            let title_container = project_item.querySelector(".project-item-title-container")
            let title = project_item.querySelector(".project-item-title")
            title_container.classList.toggle("project-item-title-container-hover", false)
            title.classList.toggle("project-item-title-hover", false)
        })
    })
}


addHoverFunctionToProjectItems()