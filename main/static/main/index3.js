var start_menu = document.querySelector("#start-menu")
var start_button = document.querySelector("#start-button")
var start_menu_close_button = document.querySelector("#start-menu-close-button")
var desktop_icons_grid = document.querySelector("#desktop-icons-grid")
var desktop_icons = document.querySelectorAll(".desktop-icons-grid-item")

function startMenuOn(){
    if (start_menu.classList.contains("start-menu-on")){
        return true
    }
    else{
        return false
    }
}

function removeRightClickOption(){
    let desktop_icons_grid_item_option = document.querySelector(".desktop-icons-grid-item-option")
        if (desktop_icons_grid_item_option){
            let selected_grid_item = desktop_icons_grid_item_option.parentElement
            selected_grid_item.classList.remove("desktop-icons-grid-item-selected")
            desktop_icons_grid_item_option.remove()
        }
}

function desktopIconRightClickOption(){
    let elementText = "" +
    '<div class="desktop-icons-grid-item-option">' +
        '<div class="desktop-icons-grid-item-option-item">' +
            '<button class="desktop-icons-grid-item-option-item-button" name="desktop-icon-right-click-action" value="open">' +
                '<span class="desktop-icons-grid-item-option-item-text">Open</span>' +
            '</button>' +
        '</div>' +
        '<div class="desktop-icons-grid-item-option-item">' +
            '<button class="desktop-icons-grid-item-option-item-button" name="desktop-icon-right-click-action" value="pin">' +
                '<span class="desktop-icons-grid-item-option-item-text">Pin to start</span>' +
            '</button>' +
        '</div>' +
        '<div class="desktop-icons-grid-item-option-item">' +
            '<button class="desktop-icons-grid-item-option-item-button" name="desktop-icon-right-click-action" value="rename">' +
                '<span class="desktop-icons-grid-item-option-item-text">Rename</span>' +
            '</button>' +
        '</div>' +
        '<div class="desktop-icons-grid-item-option-item">' +
            '<button class="desktop-icons-grid-item-option-item-button" name="desktop-icon-right-click-action" value="delete">' +
                '<span class="desktop-icons-grid-item-option-item-text">Delete</span>' +
            '</button>' +
        '</div>' +
    '</div>'

    let desktop_icons_grid_item_option = document.createElement("DIV")
    desktop_icons_grid_item_option.classList.add("desktop-icons-grid-item-option")

    let desktop_icons_grid_item_option_item_open = document.createElement("DIV")
    desktop_icons_grid_item_option_item_open.classList.add("desktop-icons-grid-item-option-item")
    let desktop_icons_grid_item_option_item_open_button = document.createElement("BUTTON")
    desktop_icons_grid_item_option_item_open_button.classList.add("desktop-icons-grid-item-option-item-button")
    desktop_icons_grid_item_option_item_open_button.setAttribute("name", "desktop-icon-right-click-action")
    desktop_icons_grid_item_option_item_open_button.setAttribute("value", "open")
    let desktop_icons_grid_item_option_item_open_text = document.createElement("SPAN")
    desktop_icons_grid_item_option_item_open_text.classList.add("desktop-icons-grid-item-option-item-text")
    desktop_icons_grid_item_option_item_open_text.innerHTML = "Open"

    desktop_icons_grid_item_option_item_open_button.appendChild(desktop_icons_grid_item_option_item_open_text)
    desktop_icons_grid_item_option_item_open.appendChild(desktop_icons_grid_item_option_item_open_button)

    let desktop_icons_grid_item_option_item_pin = document.createElement("DIV")
    desktop_icons_grid_item_option_item_pin.classList.add("desktop-icons-grid-item-option-item")
    let desktop_icons_grid_item_option_item_pin_button = document.createElement("BUTTON")
    desktop_icons_grid_item_option_item_pin_button.classList.add("desktop-icons-grid-item-option-item-button")
    desktop_icons_grid_item_option_item_pin_button.setAttribute("name", "desktop-icon-right-click-action")
    desktop_icons_grid_item_option_item_pin_button.setAttribute("value", "pin")
    let desktop_icons_grid_item_option_item_pin_text = document.createElement("SPAN")
    desktop_icons_grid_item_option_item_pin_text.classList.add("desktop-icons-grid-item-option-item-text")
    desktop_icons_grid_item_option_item_pin_text.innerHTML = "Pin to start"

    desktop_icons_grid_item_option_item_pin_button.appendChild(desktop_icons_grid_item_option_item_pin_text)
    desktop_icons_grid_item_option_item_pin.appendChild(desktop_icons_grid_item_option_item_pin_button)  

    let desktop_icons_grid_item_option_item_rename = document.createElement("DIV")
    desktop_icons_grid_item_option_item_rename.classList.add("desktop-icons-grid-item-option-item")
    let desktop_icons_grid_item_option_item_rename_button = document.createElement("BUTTON")
    desktop_icons_grid_item_option_item_rename_button.classList.add("desktop-icons-grid-item-option-item-button")
    desktop_icons_grid_item_option_item_rename_button.setAttribute("name", "desktop-icon-right-click-action")
    desktop_icons_grid_item_option_item_rename_button.setAttribute("value", "rename")
    let desktop_icons_grid_item_option_item_rename_text = document.createElement("SPAN")
    desktop_icons_grid_item_option_item_rename_text.classList.add("desktop-icons-grid-item-option-item-text")
    desktop_icons_grid_item_option_item_rename_text.innerHTML = "Rename"

    desktop_icons_grid_item_option_item_rename_button.appendChild(desktop_icons_grid_item_option_item_rename_text)
    desktop_icons_grid_item_option_item_rename.appendChild(desktop_icons_grid_item_option_item_rename_button)

    let desktop_icons_grid_item_option_item_delete = document.createElement("DIV")
    desktop_icons_grid_item_option_item_delete.classList.add("desktop-icons-grid-item-option-item")
    let desktop_icons_grid_item_option_item_delete_button = document.createElement("BUTTON")
    desktop_icons_grid_item_option_item_delete_button.classList.add("desktop-icons-grid-item-option-item-button")
    desktop_icons_grid_item_option_item_delete_button.setAttribute("name", "desktop-icon-right-click-action")
    desktop_icons_grid_item_option_item_delete_button.setAttribute("value", "delete")
    let desktop_icons_grid_item_option_item_delete_text = document.createElement("SPAN")
    desktop_icons_grid_item_option_item_delete_text.classList.add("desktop-icons-grid-item-option-item-text")
    desktop_icons_grid_item_option_item_delete_text.innerHTML = "Delete"

    desktop_icons_grid_item_option_item_delete_button.appendChild(desktop_icons_grid_item_option_item_delete_text)
    desktop_icons_grid_item_option_item_delete.appendChild(desktop_icons_grid_item_option_item_delete_button)

    desktop_icons_grid_item_option.appendChild(desktop_icons_grid_item_option_item_open)
    desktop_icons_grid_item_option.appendChild(desktop_icons_grid_item_option_item_pin)
    desktop_icons_grid_item_option.appendChild(desktop_icons_grid_item_option_item_rename)
    desktop_icons_grid_item_option.appendChild(desktop_icons_grid_item_option_item_delete)

    return desktop_icons_grid_item_option
}


start_button.addEventListener("click", function(){
    if (startMenuOn()){
        start_menu.classList.replace("start-menu-on", "start-menu-off")
    }
    else{
        start_menu.classList.replace("start-menu-off", "start-menu-on")
    }    
})

start_menu_close_button.addEventListener("click", function(){
    start_menu.classList.replace("start-menu-on", "start-menu-off")
})

for(let i=0; i<desktop_icons.length; i++){
    let desktop_icon = desktop_icons[i]
    desktop_icon.addEventListener("mousedown", function(event){
        if (event.button === 2){
            removeRightClickOption()
            desktop_icon.classList.add("desktop-icons-grid-item-selected")
            let rightClickOption = desktopIconRightClickOption()
            desktop_icon.appendChild(rightClickOption)
        }
    })
}


desktop_icons_grid.addEventListener("mousedown", function(event){
    if (event.button === 0){
        if (startMenuOn){
            start_menu.classList.replace("start-menu-on", "start-menu-off")
        }
        
        removeRightClickOption()
    }
})