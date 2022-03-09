let projects = document.querySelector("#projects")
let projects_dropdown = document.querySelector("#projects-dropdown")







projects.addEventListener("mouseover", () => {
    projects_dropdown.classList.replace("hide", "show")
})
projects.addEventListener("mouseout", () => {
    projects_dropdown.classList.replace("show", "hide")
})