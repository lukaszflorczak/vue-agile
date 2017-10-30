# vue-agile

> Carousel component for Vue.js inspired by [Slick](https://github.com/kenwheeler/slick/).<br>
> More powerful with each version, touch-friendly, written in Vue and Vanilla JS (without jQuery dependency).

**[Demo & examples](https://lukaszflorczak.github.io/vue-agile/)**

🤝 Thanks to [Maciej Wach](https://github.com/wachu91) for inventing the name, testing and motivation.

## Important – update from version < `0.3`

**In version `0.3.0`, I removed all styles that are responsible for the appearance of navigation elements** (like dots color and shape, arrows position, etc.). I think most people use their own styles and default styles are completely redundant. If you want to check out these defaults styles, you can find them [here](https://github.com/lukaszflorczak/vue-agile/blob/master/src/Agile.vue#L488).

**Additionally dots and arrows have been moved from the `.agile__list` to the main `.agile` container.** The layout is the same as in Slick and id should allow for better and more comfortable positioning of these elements.

## Installation

``` bash
yarn add vue-agile
```

or

``` bash
npm install vue-agile
```

## Usage
``` js
import Vue from 'vue'
import VueAgile from 'vue-agile'

Vue.use(VueAgile)
```
``` vue
<template>
    <main>
        <agile>
            <div class="slide">
                <h3>slide 1</h3>
            </div>
            
            ...
            
            <div class="slide">
                <h3>slide n</h3>
            </div>
        </agile>
    </main>
</template>
```

Every first-level child of `<agile>` is a new slide.

## Options
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| arrows | boolean | `true` | Enable prev/next arrows |
| asNavFor | array (refs) | `[]` | Set the slider to be the navigation of other one – more in „asNavFor” section |
| prevArrow | string (HTML/SVG) | `<svg>` | Prev arrow code – more in „Arrows” section |
| nextArrow | string (HTML/SVG) | `<svg>` | Next arrow code – more in „Arrows” section |
| autoplay | boolean | `false` | Enable autoplay |
| autoplaySpeed | integer (ms) | `3000` | Autoplay interval in milliseconds | 
| dots | boolean | `true` | Enable dot indicators/pagination |
| fade | boolean | `false` | Enable fade effect |
| infinite | boolean | `true` | Infinite loop sliding | 
| initialSlide | integer | Slide to start on (numbered from zero) | 
| mobileFirst | boolean | `true` | Enable mobile first calculation for responsive settings |
| options | object | `null` | All settings as one object | 
| pauseOnHover | boolean | `true` | Pause autoplay when a slide is hovered |
| pauseOnDotsHover | boolean | `false` | Pause autoplay when a dot is hovered |
| responsive | object | `null` | Object containing breakpoints and settings objects | 
| slidesToShow | integer | `1` | Number of slides to show |
| speed | integer (ms) | `300` | Slide animation speed in milliseconds | 
| timing | string | `ease` | Transition timing function <br> (`linear`/`ease`/`ease-in`/`ease-out`/`ease-in-out`) |
| unagile | boolean | `false` | Disable agile carousel | 

### Example

``` vue
<agile :arrows="false" :dots="false" :infinite="false">
    ...
</agile>
```

## Responsive

To customize responsiveness, I recommend defining desired breakpoint and passing a settings object with the options to modify inside **options**.

### Example

``` vue
<agile :options="options">
    ...
</agile>
```

``` js
data () {
    return {
        options: {
            arrows: false,
            
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        dots: false
                    }
                },
                
                {
                    breakpoint: 900,
                    settings: {
                        arrows: true,
                        dots: true,
                        infinite: false
                    }
                }
            ]
        }
    }
}
```

## asNavFor

With this parameter you can synchronize several Agile carousels. For example, one can show thumbnails of photos and the second big picture. Changing a slide on one carousel will cause a change to another.

### Example
```html
<agile ref="agile1" asNavFor="['agile2', 'agile3']">
    ...
</agile>
 
<agile ref="agile2">
    ...
</agile>

<agile ref="agile3">
    ...
</agile>
```

You can also combine carousel in two ways:

```html
<agile ref="bigImage" asNavFor="['thumbnails']">
    ...
</agile>

<agile ref="thumbnails" asNavFor="['bigImage']">
    ...
</agile>
```

## Arrows

By default carousel contains SVG arrows. You can change them using CSS or `prevArrow` & `nextArrow` parameters. 

There are two important things:

1. You should put your SVG/HTML code in one line, without new line chars etc.
2. You should define arrows code as variables in `data()`.

### Example

``` vue
<agile :prevArrow="left" :nextArrow="right">
    ...
</agile>
```

```js
export default {
    data () {
        return {
            left: '<svg x="0px" y="0px" viewBox="0 0 24 24"><path d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z"/></svg>',
            right: '<svg x="0px" y="0px" viewBox="0 0 24 24"><path d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z"/></svg>'
        }
    }
}
```

## Events

| Name | Returned data | Description |
| --- | --- | --- |
| `beforeChange` | `{currentSlide, nextSlide}` | Fires before slide change |
| `afterChange` | `{currentSlide}` | Fires after slide change |


### Example

``` html
<agile @afterChange="newSlide($event)">
    ...
</agile>
```

``` js
newSlide ($event) {
    console.log($event.currentSlide)
}
```

## Methods
| Name | Parameters | Returned data | Description |
| --- | --- | --- | --- |
| `goTo()` | slide number (`integer`), don't animate (optional `boolean`) | — | Navigates to a slide by index |
| `goToNext()` | — | — | Navigates to the next slide |
| `goToPrev()` | — | — | Navigates to the previous slide | 
| `getCurrentSlide()` | — | slide number (`integer`) | Returns the current slide index (numbered from zero) |

### Example

``` html
<agile ref="carousel">
    ...
</agile>    
```

``` js
// Go to slide 3 without animation
this.$refs.carousel.goTo(3, false)

// Get current slide number
let currentSlide = this.$refs.carousel.getCurrentSlide()
```


## `v-if` & `v-show`

If you have dynamically loaded slides, use `v-if` to show carousel when slides will be ready. Using `v-if` is also recommended in other situations if you want to hide/show the slideshow.

If for some reason you need to use `v-show`, it's also possible, but you have to use an additional parameter `show` with the same value as for the `v-show`.

### Example
``` html
<button @click="toggleAgile()">Toggle carousel</button>

<agile v-show="isActive" :show="isActive">
    ...
</agile>
```

``` js
toggleAgile () {
    this.isActive = !this.isActive
}
```

## SSR Support

The component uses browser specific attributes (like `window` and `document`). It is necessary, so probably the only option is to run vue-agile only on the client-side. It was tested on [nuxt v1.0.0-rc7](https://github.com/nuxt/nuxt.js/releases/tag/v1.0.0-rc7) and works fine.
 
### Example
```js
// plugins/vue-agile.js

import Vue from 'vue'
import VueAgile from 'vue-agile'

Vue.use(VueAgile)
```

```js
// nuxt.config.js

module.exports = {
    plugins: [
        { src: '~/plugins/vue-agile', ssr: false }
    ]
}
```

```vue
<no-ssr placeholder="Loading...">
    <agile>
        ... 
    </agile>
</no-ssr>
```

PS. If you know a better way to work the component with SSR please, [let me know about it](https://github.com/lukaszflorczak/vue-agile/issues).

## Contributing
```
# install dependencies
yarn install
 
# serve with hot reload at localhost:8080
yarn run dev
 
# create UMD bundle.
yarn run bundle
```
