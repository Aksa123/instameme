let search_input = document.querySelector("#search-input")
let search_button = document.querySelector("#search-button")
let account_button = document.querySelector("#account-button")
let account_div = document.querySelector("#account")
let account_dropdown = document.querySelector("#account-dropdown")
let small_search_button = document.querySelector("#small-search-button")
let overlay = document.querySelector("#overlay")
let small_search_popup_container = document.querySelector("#small-search-input-popup-container")
let cancel_button = document.querySelector("#cancel-button")
let small_search_input = document.querySelector("#small-search-input")
let small_search_button_popup = document.querySelector("#small-search-button-popup")

function changeSearchURL(){
    if (search_input.value !== ""){
        let url = new URL(location.origin + "/instagif/search")
        url.searchParams.append("query", search_input.value)
        search_button.href=url.href

        console.log("link changed!")
        console.log(search_button)
    }
}

function accountClickAction(){
    if (account_dropdown.classList.contains("display-none")){
        account_dropdown.classList.replace("display-none", "display-block")
        // account_div.classList.add("account-active-background")
    }
    else{
        account_dropdown.classList.replace("display-block", "display-none")
        // account_div.classList.remove("account-active-background")
    }
}

function startAddListenerToInputs(){
    account_button.addEventListener("click", function(){
        accountClickAction()
    })

    search_input.addEventListener("keyup", function(){
        console.log("change detected")
        changeSearchURL()
    })
}

function addFunctionToSmallSearchButton(){
    overlay.active = false
    small_search_button.addEventListener("click", () => {
        if (overlay.active){
            overlay.active = false
            overlay.classList.toggle("overlay-active", false)
            overlay.classList.toggle("overlay-inactive", true)
            small_search_popup_container.classList.toggle("small-search-popup-active", false)
            small_search_popup_container.classList.toggle("small-search-popup-inactive", true)
        }
        else{
            overlay.active = true
            overlay.classList.toggle("overlay-active", true)
            overlay.classList.toggle("overlay-inactive", false)
            small_search_popup_container.classList.toggle("small-search-popup-active", true)
            small_search_popup_container.classList.toggle("small-search-popup-inactive", false)
        }
    })

    cancel_button.addEventListener("click", () => {
        overlay.active = false
        overlay.classList.toggle("overlay-active", false)
        overlay.classList.toggle("overlay-inactive", true)
        small_search_popup_container.classList.toggle("small-search-popup-active", false)
        small_search_popup_container.classList.toggle("small-search-popup-inactive", true)
    })

    small_search_input.addEventListener("keyup", () => {
        console.log("hello")
        let value = small_search_input.value
        let url = new URL(window.location.origin + "/instagif/search/")
        url.searchParams.append("query", value)
        small_search_button_popup.href = url
    })

}



changeSearchURL()
startAddListenerToInputs()
addFunctionToSmallSearchButton()