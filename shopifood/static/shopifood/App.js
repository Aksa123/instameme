import Home from "./Home.js"

let template = `
<Home2></Home2>
`

export default {
    name: "App",
    template: template,
    components: {
        Home2: window.httpVueLoader('Home.vue')
    }
}