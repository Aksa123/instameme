<template>
<div id="topbar">
                <div id="back-search-container">
                    <button id="back-button">
                        <img :src="back_img" alt="" id="back-img">
                    </button>
                    <div id="search-container">
                        <button id="search-button">
                            <img :src="search_icon" alt="search icon" id="search-icon">
                        </button>
                        <input type="text" id="search-input" placeholder="Restaurant, Food, or Beverage">
                    </div>
                </div>
                <div id="address-bar-container">
                    <img :src="location_icon" alt="location icon" id="location-icon"> Deliver to .......
                </div>
            </div>

            <div id="banner-container" class="section">
                <div id="banner-slide" >
                    <div v-for="(banner, index) in banners" class="banner-slide-item">
                        <Transition mode="out-in" name="banner-slide-transition1">
                            <div v-show="index===banner_active_index" class="banner-slide-item-color slide-active"></div>
                        </Transition>
                        <Transition mode="out-in" name="banner-slide-transition0" >
                            <div v-show="index!==banner_active_index" class="banner-slide-item-color"></div>
                        </Transition>
                    </div>
                        

                    
                </div>
                <button @click="slideBannerRight" id="banner-arrow-right" class="banner-arrow"><i class="bi bi-chevron-compact-right"></i></button>
                <button @click="slideBannerLeft" id="banner-arrow-left" class="banner-arrow"><i class="bi bi-chevron-compact-left"></i></button>

                <div class="banner-display" >
                    <div v-for="(banner, index) in banners" class="banner-item-container">
                        <Transition v-if="banner_arrow===true" name="bbb">
                            <a v-if="index===banner_active_index" class="banner-item" :href="banners[banner_active_index].link">
                                <img :src="banners[banner_active_index].image" alt="banner image" class="banner-img">
                            </a>
                        </Transition>
                        <Transition v-else-if="banner_arrow===false" name="aaa">
                            <a v-if="index===banner_active_index" class="banner-item" :href="banners[banner_active_index].link">
                                <img :src="banners[banner_active_index].image" alt="banner image" class="banner-img">
                            </a>
                        </Transition>
                    </div>
                </div>
            </div>

            <div id="tag-container" class="section">
                <a v-for="tag in tags" :href="tag.link" class="tag-item">
                    <img :src="tag.image" alt="tag icon" class="tag-item-img">
                    <div class="tag-item-name">{{ tag.name }}</div>
                </a>
                
            </div>

            <div v-for="preview in previews" class="preview-container section">
                <div class="preview-top-container">
                    <div class="preview-name">{{ preview.name }}</div>
                    <div class="preview-see-all">See All <i class="bi bi-chevron-right"></i></div>
                </div>
                <div class="preview-flex-container">
                    <div class="preview-flex">
                        <div v-for="item in preview.items" class="preview-item">
                            <img :src="item.image" alt="preview image" class="preview-item-img">
                            <div class="preview-item-name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            
</template>


<style scoped>
*{
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    color: rgb(155, 155, 155);
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    scrollbar-width: none;
    -ms-overflow-style: none;  /* IE and Edge */
}

:root{
    --super-container-bg: #272727;
    --section-bg: rgb(33, 33, 33);
}

a:link, a:visited, a:hover, a:active {
    text-decoration: none;
}
  

#super-container{
    width: 100%;
    max-width: 1200px;
    min-width: 300px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 50px;
    background-color: var(--super-container-bg);
}

#attributions-container{
    display: none;
}

#topbar{
    padding-right: 7px;
    padding-left: 7px;
    padding-bottom: 5px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    background-color: var(--section-bg);
}

#back-search-container{
    padding-top: 15px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
}

#back-button{
    height: 35px;
    aspect-ratio: 1 / 1;
    background: transparent;
}

#back-img{
    width: 100%;
    height: 100%;
}

#search-container{
    height: 35px;
    margin-left: 5px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    background: var(--super-container-bg);
}

#search-button{
    height: 100%;
    aspect-ratio: 1 / 1;
    background: transparent;
}

#search-icon{
    width: 26px;
    height: 26px;
}

#search-input{
    height: 100%;
    flex-grow: 1;
    background: transparent;
}

#search-input:active, #search-input:focus{
    outline: none;
}


#address-bar-container{
    padding-top: 10px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
}

#address-bar-container i{
    margin-right: 10px;
    font-size: 18px;
}

#location-icon{
    width: 18px;
    height: 18px;
    margin-right: 8px;
}

.section{
    background-color: var(--section-bg);
    margin-bottom: 15px;
}

#banner-container{
    width: 100%;
    margin-bottom: 0;
    padding-top: 120px;
    overflow-x: scroll;
    overflow-y: hidden;
    position: relative;
    display: flex;
}

.banner-flex{
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
}

.banner-display{
    width: 100%;
    height: 150px;
    position: relative;
}

.banner-out-left{
    opacity: 0;
    transform: rotateY(-90deg);
    transition-duration: 500ms;
}

.banner-out-right{
    opacity: 0;
    transform: rotateY(60deg);    
}

.banner-item-container{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.banner-item{
    width: 100%;
    height: 100%;
    display: block;
    /* transition-duration: 500ms; */
    transform-origin: top left;  
}

.banner-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.display-none{
    display: none;
}

#banner-slide{
    width: 100px;
    height: 14px;
    position: absolute;
    left: 30px;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    z-index: 90;
}

.banner-slide-item-color{
    position: absolute;
    width: 7px;
    height: 3px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: lightslategrey;
}

.slide-active{
    height: 7px;
}


.banner-slide-item{
    width: 7px;
    height: 3px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}

.banner-slide-transition1-enter-active, .banner-slide-transition0-enter-active{
    transition: height 200ms;
}

.banner-slide-transition1-enter-from{
    height: 3px;
}

.banner-slide-transition1-enter-to{
    height: 7px;
}

.banner-slide-transition0-enter-from{
    height: 7px;
}

.banner-slide-transition0-enter-to{
    height: 3px;
}

.banner-arrow{
    width: 30px;
    height: 30px;
    position: absolute;
    align-self: center;
    background-color: rgba(0,0,0, 0.2);
    transition-duration: 200ms;
    z-index: 85;
}

.banner-arrow .bi{
    color: white;
    font-weight: 1000;
    font-size: 20px;
}

.banner-arrow:hover{
    background-color: black;
}

#banner-arrow-right{
    right: 0;
}

#banner-arrow-left{
    left: 0;
}

#tag-container{
    padding-top: 30px;
    padding-bottom: 20px;
    padding-right: 10px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 25px;
}

.tag-item{
    width: 100%;
    height: 100%;
    padding-top: 7px;
    padding-bottom: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition-duration: 200ms;
    border-radius: 10px;
}

.tag-item:hover{
   background-color:  rgba(255, 255, 255, 0.1);
}

.tag-item-img{
    max-width: 30px;
    max-height: 30px;
}

.tag-item-name{
    margin-top: 8px;
    text-align: center;
    font-size: 13px;
}

.preview-container{
    padding-top: 20px;
    padding-right: 7px;
    padding-left: 7px;
    padding-bottom: 20px;
}

.preview-top-container{
    display: flex;
    align-items: center;
}

.preview-name{
    color: lightcoral;
    font-size: 16px;
}

.preview-see-all{
    margin-left: auto;
}

.preview-flex-container{
    width: 100%;
    margin-top: 12px;
    overflow-x: scroll;
}

.preview-flex{
    width: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.preview-item{
    width: 150px;
    margin-right: 7px;
}

.preview-item-img{
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
}

.preview-item-name{
    margin-top: 3px;
    font-size: 15px;
}




.bbb-enter-active, .bbb-leave-active{
    transition: all 500ms;
}

.bbb-enter-from{
    transform: translateX(100%);
    opacity: 0;
}

.bbb-leave-to{
    transform: translateX(-100%);
    opacity: 0;
}

.aaa-enter-active, .aaa-leave-active{
    transition: all 500ms;
}

.aaa-enter-from{
    transform: translateX(-100%);
    opacity: 0;
}

.aaa-leave-to{
    transform: translateX(100%);
    opacity: 0;
}
</style>



<script>
export default {
  name: "Home",
  data() {
    return {
        message: 'Hello Vue!',
        back_img: '/static/shopifood/back.png',
        search_icon: '/static/shopifood/search.png',
        location_icon: '/static/shopifood/location.png',
        banners: [
            {
                image: '/static/shopifood/placeholder1.jpg',
                link: "#1"
            },
            {
                image: '/static/shopifood/placeholder2.jpg',
                link: "#2"
            },
            {
                image: '/static/shopifood/pizza.jpg',
                link: "#3"
            },
            {
                image: '/static/shopifood/sushi.jpg',
                link: "#4"
            },
            {
                image: '/static/shopifood/coffee.jpg',
                link: "#5"
            },
        ],
        banner_active_index: 0,
        banner_arrow: true,            // true is right, false is left
        tags: [
            {
                name: "Nearby",
                image: '/static/shopifood/nearby.png',
                link: '#'
            },
            {
                name: "Discount",
                image: '/static/shopifood/discount.png',
                link: '#'
            },
            {
                name: "Best Selling",
                image: '/static/shopifood/best.png',
                link: '#'
            },
            {
                name: "Open All Day",
                image: '/static/shopifood/24h.png',
                link: '#'
            },
            {
                name: "New Items",
                image: '/static/shopifood/new.png',
                link: '#'
            },
        ],
        previews: [
            {
                name: "Big Discount",
                items: [
                    {
                        name: "Burger Ichi",
                        image: '/static/shopifood/burger.jpg',
                        link: '#'
                    },
                    {
                        name: "Sushi",
                        image: '/static/shopifood/sushi.jpg',
                        link: '#'
                    },
                    {
                        name: "Pizza",
                        image: '/static/shopifood/pizza.jpg',
                        link: '#'
                    },
                    {
                        name: "Coffee",
                        image: '/static/shopifood/coffee.jpg',
                        link: '#'
                    },
                    {
                        name: "Yogurt",
                        image: '/static/shopifood/yogurt.jpg',
                        link: '#'
                    },
                    
                ],
            },
            {
                name: "Free Delivery",
                items: [
                    {
                        name: "Burger Ichi",
                        image: '/static/shopifood/burger.jpg',
                        link: '#'
                    },
                    {
                        name: "Sushi",
                        image: '/static/shopifood/sushi.jpg',
                        link: '#'
                    },
                    {
                        name: "Pizza",
                        image: '/static/shopifood/pizza.jpg',
                        link: '#'
                    },
                    {
                        name: "Coffee",
                        image: '/static/shopifood/coffee.jpg',
                        link: '#'
                    },
                    {
                        name: "Yogurt",
                        image: '/static/shopifood/yogurt.jpg',
                        link: '#'
                    },
                    
                ],
            }
        ]
    }
},
  template: template,
  methods: {
    slideBannerLeft() {
        if (this.banner_active_index > 0){
            this.banner_arrow = false
            this.banner_active_index--
        }
        else if (this.banner_active_index === 0){
            this.banner_arrow = false
            this.banner_active_index = (this.banners.length -1)
        }
    },
    slideBannerRight() {
        if (this.banner_active_index < (this.banners.length -1)) {
            this.banner_arrow = true
            this.banner_active_index++
        }
        else if (this.banner_active_index === (this.banners.length -1)){
            this.banner_arrow = true
            this.banner_active_index = 0
        }
    },
    
  },
  computed: {
      bannerDisplayWidth() {
          return this.banners.length*100 + "%"
      }
  },
}

</script>


