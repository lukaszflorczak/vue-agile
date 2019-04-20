# vue-agile [![](https://img.shields.io/npm/v/vue-agile.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/vue-agile) [![](https://img.shields.io/npm/l/vue-agile.svg?style=flat-square&logo=github)](https://github.com/lukaszflorczak/vue-agile/blob/master/LICENSE.md) [![](https://img.shields.io/codacy/grade/509a536ebcf64a71a119e988bd888af2.svg?style=flat-square&logo=codacy)](https://app.codacy.com/project/lukaszflorczak/vue-agile/dashboard) [![](https://img.shields.io/npm/dm/vue-agile.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/vue-agile) [![](https://img.shields.io/badge/buy%20me%20a%20coffee-+3€-red.svg?style=flat-square&logo=ko-fi)](http://ko-fi.com/lukaszflorczak)

> A carousel component for Vue.js inspired by [Slick](https://github.com/kenwheeler/slick/).<br>
> Powerful, touch-friendly, and written in Vue and Vanilla JS (without a jQuery dependency).

**[Demo & examples](https://lukaszflorczak.github.io/vue-agile/)**

More demos and examples coming soon in [vue-agile CodePens collection](https://codepen.io/collection/AdRzJW/).

---

🎉 **After about a year from the last version, I'm happy and excited to inform, that new `v1.0` version is available now!** More information and a changelog you can find [here](https://github.com/lukaszflorczak/vue-agile/releases/tag/v1.0.0).

---

If you like the component remember to **star it** ⭐️. If you appreciate my work you can also **[buy me a coffee](https://ko-fi.com/lukaszflorczak)** ☕️ 😉

--- 

## Important – update from version < `1.0`

**Depreciated => new props:**
* `arrows` => `navButtons`
* `prevArrow` => `prevButton` slot
* `nextArrow` => `nextButton` slot
* `show` => `reload()` method

**Depreciated => new classes:**
* `.agile__arrow` => `.agile__nav-button`
* `.agile__arrow--prev` => `.agile__nav-button--prev`
* `.agile__arrow--next` => `.agile__nav-button--next`
* `.agile__slide--cloned` => cloned slides are grouped in `.agile__slides--cloned` container now

**Structure:**
* Nav buttons and dots are grouped in `.agile__actions` container now

Read a full changelog here.

## Installation

```bash
yarn add vue-agile
```

or

```bash
npm install vue-agile
```

## Styles

**The component is delivered without styles for the appearance of the navigation elements** (like dots color and shape, arrows position, etc.). I think most people use their own styles and default styles are completely redundant. If you want, feel free to use styles from [CodePen demos](https://codepen.io/collection/AdRzJW/).

## Usage
```js
import Vue from 'vue'
import VueAgile from 'vue-agile'

Vue.use(VueAgile)
```
```vue
<template>
	<agile>
		<div class="slide">
			<h3>slide 1</h3>
		</div>
		
		...
		
		<div class="slide">
			<h3>slide n</h3>
		</div>
	</agile>
</template>
```

Every first-level child of `<agile>` is a new slide. You also can group them inside `<template v-slot:default>...</template>` tags.

## Options
| Parameter | Type | Default | Description |
| --- | :---: | :---: | --- |
| [asNavFor](#asNavFor) | array | `[]` | Set the carousel to be the navigation of other carousels | 
| autoplay | boolean | `false` | Enable autoplay |
| autoplaySpeed | integer (ms) | `3000` | Autoplay interval in milliseconds | 
| centerMode | boolean | `false` | Enable centered view when `slidesToShow` > `1` |
| dots | boolean | `true` | Enable dot indicators/pagination |
| fade | boolean | `false` | Enable fade effect |
| infinite | boolean | `true` | Infinite loop sliding | 
| initialSlide | integer | `0` | Index of slide to start on |
| mobileFirst | boolean | `true` | Enable mobile first calculation for responsive settings |
| navButtons | boolean | `true` | Enable prev/next navigation buttons |
| options | object | `null` | All settings as one object | 
| pauseOnDotsHover | boolean | `false` | Pause autoplay when a dot is hovered |
| pauseOnHover | boolean | `true` | Pause autoplay when a slide is hovered |
| [responsive](#Responsive) | object | `null` | Object containing breakpoints and settings objects | 
| rtl | boolean | `false` | Enable right-to-left mode |
| slidesToShow | integer | `1` | Number of slides to show |
| speed | integer (ms) | `300` | Slide animation speed in milliseconds | 
| timing | string | `ease` | Transition timing function <br> (`linear`/`ease`/`ease-in`/`ease-out`/`ease-in-out`) |
| unagile | boolean | `false` | Disable Agile carousel | 

### Example

```vue
<agile :dots="false" :infinite="false" :autoplay-speed="5000">...</agile>
```

**Important!** If you use props inline, convert props names from `camelCase` to `kebab-case`.

## Methods

| Name | Description |
| --- | --- |
| `getCurrentSlide()` | Returns index of current slide | 
| `getCurrentBreakpoint()` | Returns current breakpoint (can returns `0` in mobile first for the smallest breakpoint and `null` for desktop first for the largest) | 
| `getCurrentSettings()` | Returns settings object for current breakpoint – useful for debugging | 
| `getInitialSettings()` | Returns full settings object with all options – useful for debugging | 
| `goTo()` | Navigates to a slide by index |
| `goToNext()` | Navigates to next slide |
| `goToPrev()` | Navigate to previous slide | 
| `reload()` | Reload carousel & slides settings, classes and inline styles |

### Example

```vue
<agile ref="carousel">...</agile>

<button @click="$refs.carousel.goToNext()">My custom button</button>
```

## Events

| Name | Value | Description |
| --- | --- | --- |
| afterChange | `{ currentSlide }` | Fires after slide change |
| beforeChange | `{ currentSlide, nextSlide }` | Fires before slide change |
| breakpoint | `{ breakpoint } ` | Fires after breakpoint change |

### Example

```vue
<agile @afterChange="showCurrentSlide($event)">...</agile>
```

```js
showCurrentSlide (event) {
	console.log(event)
	// Shows for example: { currentSlide: 1 }
}
```

## Responsive

To customize responsiveness, I recommend defining your desired breakpoints and passing a settings object with your modification options inside **options**.

### Example

```vue
<agile :options="myOptions">...</agile>
```

```js
data () {
    return {
        myOptions: {
            navButtons: false,
            
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
                        navButtons: true,
                        dots: true,
                        infinite: false
                    }
                }
            ]
        }
    }
}
```

How does it work? Mobile first mode is used by default. It means, that `navButtons: false` option will be used on screens from 0 to 600 px width (+ all default carousel options). On screens from 600 to 900 px  `dots: false`  will be added to options from breakpoint before. And on screens over 900 px width `navButtons` and `dots` options will be overwritten and `infinite: false` will be added.  

## Custom arrows / nav buttons

From version `1.0` the component use slots for custom navigation buttons. It means you can put inside whatever you want – any HTML with text, image, icon etc.

### Example

```vue
<agile>
    ... <!-- slides -->
    
    <template slot="prevButton">prev</template>
    <template slot="nextButton">next</template>
</agile>
```

## asNavFor

This option is useful for example for creating a photo gallery with two related slider – one big with only one slide in view and second for navigation with thumbnails.

### Example

```vue
<agile ref="main" :fade="true">...</agile>

<agile ref="thumbnails" :as-nav-for="[$refs.main]" :slides-to-show="4" autoplay>...</agile>
```

**Important!** If you want to use the autoplay mode is it only in one of the related carousels.

## `v-if` & `v-show`

If you have slides being dynamically loaded, use `v-if` to show the carousel after the slides are ready. Using `v-if` is also recommended in other situations if you want to hide/show the slideshow.

It is also possible to use `v-show`, but you have to use the `reload()` method.

### Example
```vue
<button @click="isActive = !isActive">Toggle carousel</button>

<agile v-if="isActive">...</agile>
```

## SSR Support

The component uses browser specific attributes (like `window` and `document`). Unfortunately, it is necessary -- so as of now, the only option is to run vue-agile solely on the client-side. 

Full support for Nuxt.js is a known issue that will be addressed in a next version.
 
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
    <agile>...</agile>
</no-ssr>
```

## Contributing

🤝 Thanks to [Maciej Wach](https://github.com/wachu91) for inventing the name and to all [Contributors](https://github.com/lukaszflorczak/vue-agile/graphs/contributors) for your development.

```bash
# project setup
yarn install
 
# compiles and hot-reloads for developmen
yarn serve
 
# compiles and minifies for production
yarn build-bundle

# lint and fixes files
yarn run lint
```
