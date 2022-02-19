var layer = 0
var total_cell_width = 5
var total_cell_height = 20
var cell_width_percent = 6.5
var cell_height_vh = 0.5
var cell_container = document.querySelector(".cell-container")
var cell_items
var cell_item_add_buttons
var cell_item_width = "10%"
var cell_item_height = "10vh"
var max_layer = 0
var current_layer = 0
var occupied_layer_areas = {} // {layer_num: [{"coordinate_x_start": value, "coordinate_x_end": value, "coordinate_y_start": value, "coordinate_y_end": value, "block_element": value}, ...], next_layer_num: ...}



function showAddButton(event){
    let add_button = event.currentTarget.add_button
    add_button.style.display = "block"
}

function hideAddButton(event){
    let add_button = event.currentTarget.add_button
    add_button.style.display = "none"
}

function addNewLayer(){
    max_layer += 1
    occupied_layer_areas[max_layer] = []
    let new_layer = document.createElement("DIV")
    new_layer.classList.add("layer")
    new_layer.id = "layer-" + max_layer
    new_layer.style.zIndex = max_layer
    cell_container.appendChild(new_layer)
    console.log("new layer added")
}


function addBlockToCell(event){
    let cell_item = event.currentTarget.parentElement.parentElement
    let add_button = cell_item.add_button
    cell_item.removeEventListener("mouseover", showAddButton)
    cell_item.removeEventListener("mouseout", hideAddButton)
    add_button.style.display = "none"
    console.log(cell_item)
    console.log(add_button)

    if (max_layer === 0){
        addNewLayer()
        current_layer = max_layer
    }

    let layer_element = document.querySelector("#layer-" + current_layer)
    let new_block = document.createElement("DIV")
    let cell_item_coordinate_x = cell_item.coordinate[0]
    let cell_item_coordinate_y = cell_item.coordinate[1]
    new_block.classList.add("block")
    layer_element.appendChild(new_block)
    new_block.style.top = (cell_item_coordinate_y*10) + "vh"
    new_block.style.left = (cell_item_coordinate_x*10) + "%"

    
}


function assignValuesToGlobalVariables(){
    // Assign values to undefined global variables
    cell_items = document.querySelectorAll(".cell-item")
    cell_item_add_buttons = document.querySelectorAll(".cell-item-add-button")
}

function startArrangeCells(){
    let total_cells = total_cell_width*total_cell_height

    for (let y = 0; y< total_cell_height; y++){
        for (let x = 0; x < total_cell_width; x++){
            let cell_item = document.createElement("DIV")
            cell_item.classList.add("cell-item")
            cell_item.id = "cell-item-" + x + "-" + y
            
            let cell_item_border = document.createElement("DIV")
            cell_item_border.classList.add("cell-item-border")

            // Do we need the <input>?
            let cell_item_coordinate = document.createElement("INPUT")
            cell_item_coordinate.setAttribute("type", "hidden")
            cell_item_coordinate.setAttribute("name", "cell-item-coordinate")
            cell_item_coordinate.setAttribute("value", x + "-" + y)
            
            let cell_item_add_button = document.createElement("BUTTON")
            cell_item_add_button.classList.add("cell-item-add-button")

            let cell_item_add_icon = document.createElement("IMG")
            cell_item_add_icon.setAttribute("src", "/static/main/add.png")
            cell_item_add_icon.classList.add("cell-item-add-icon")

            cell_item_add_button.appendChild(cell_item_add_icon)
            cell_item_border.appendChild(cell_item_add_button)
            cell_item_border.appendChild(cell_item_coordinate)
            cell_item.appendChild(cell_item_border)
            cell_container.appendChild(cell_item)

            // Assign some properties to cell item
            cell_item.coordinate = [x, y]
            cell_item.element_border = cell_item_border
            cell_item.element_add_button = cell_item_add_button

            // Add event listeners
            cell_item.add_button = cell_item_add_button
            cell_item.addEventListener("mouseover", showAddButton)
            cell_item.addEventListener("mouseout", hideAddButton)
            cell_item_add_button.addEventListener("click", addBlockToCell)
            
            // Assign values to global vars
            assignValuesToGlobalVariables()
        }
    }
    
}


startArrangeCells()




