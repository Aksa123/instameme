var grid_items = document.querySelectorAll(".grid-item")
var arrow_buttons= document.querySelectorAll(".arrow-button")
var arrow_buttons_left = document.querySelectorAll(".arrow-button-left")
var arrow_buttons_right = document.querySelectorAll(".arrow-button-right")
var arrow_buttons_up = document.querySelectorAll(".arrow-button-up")
var arrow_buttons_down = document.querySelectorAll(".arrow-button-down")


for (let i=0; i<grid_items.length; i++){

    let grid_item = grid_items[i]
    let arrow_up = grid_item.querySelector(".arrow-button-up")
    let arrow_left = grid_item.querySelector(".arrow-button-left")
    let arrow_right = grid_item.querySelector(".arrow-button-right")
    let arrow_down = grid_item.querySelector(".arrow-button-down")

    let grid_item_position = window.getComputedStyle(grid_item).gridColumnStart

    grid_item.addEventListener("mouseover", function(){
        arrow_up.style.display = "block"
        arrow_left.style.display = "block"
        arrow_right.style.display = "block"
        arrow_down.style.display = "block"
    })
    grid_item.addEventListener("mouseout", function(){
        arrow_up.style.display = "none"
        arrow_left.style.display = "none"
        arrow_right.style.display = "none"
        arrow_down.style.display = "none"
    })
}


// Arrow button listeners
for (let i=0; i<arrow_buttons.length; i++){
    let arrow = arrow_buttons[i]
    let parentGridItem = arrow.parentElement.parentElement
    arrow.addEventListener("click", function(){
        if (arrow.classList.contains("arrow-button-left")){
            parentGridItem.style.gridColumnEnd -= "1"
            console.log(parentGridItem.style.gridColumnStart)
        }
        else{
            console.log("nope!")
        }
        
    })
}

console.log(grid_items[101].style)