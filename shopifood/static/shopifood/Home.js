let template = `
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
            `



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




