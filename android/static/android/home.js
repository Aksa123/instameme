var menu_button_button = document.querySelector("#menu-button-button")
var home_button_button = document.querySelector("#home-button-button")
var back_button_button = document.querySelector("#back-button-button")
var mainscreen = document.querySelector("#mainscreen")
var homescreen = document.querySelector("#homescreen")
var menuscreen = document.querySelector("#menuscreen")
var menuscreen_scrollable = menuscreen.querySelector("#app-list-container")
var menuscreen_active = false
var menu_app_list = document.querySelector("#app-list-container")
var background = document.querySelector(".background-img")

function scrollMenuToTop(){
    menuscreen_scrollable.scrollTop = 0
}



menu_button_button.addEventListener("click", function(){
    menuscreen_active = true
    scrollMenuToTop()
    homescreen.classList.add("homescreen-inactive")
})

back_button_button.addEventListener("click", function(){
    menuscreen_active = false
    scrollMenuToTop()
    homescreen.classList.remove("display-none")
    menuscreen.classList.remove("menuscreen-active")
})

homescreen.addEventListener("transitionend", function(){
    if (menuscreen_active){
        background.classList.add("background-img-alpha-low")
        homescreen.classList.add("display-none")
        menuscreen.classList.add("menuscreen-active")
    }
})

menuscreen.addEventListener("transitionend", function(){
    if (!menuscreen_active){
        homescreen.classList.remove("homescreen-inactive")
        background.classList.remove("background-img-alpha-low")
    }
})