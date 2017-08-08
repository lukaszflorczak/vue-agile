# vue-agile

> Carousel component for Vue.js inspired by [Slick](https://github.com/kenwheeler/slick/).<br>
> Simple, touch-friendly, written in Vue and Vanilla JS (without jQuery dependency).

**[Demo & examples](https://lukaszflorczak.github.io/vue-agile/)**

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
| autoplay | boolean | `false` | Enable autoplay |
| autoplaySpeed | integer (ms) | `3000` | Autoplay interval in milliseconds | 
| dots | boolean | `true` | Enable dot indicators/pagination |
| fade | boolean | `false` | Enable fade effect |
| infinite | boolen | `true` | Infinite loop sliding | 
| pauseOnHover | boolean | `true` | Pause autoplay when a slide is hovered |
| pauseOnDotsHover | boolean | `false` | Pause autoplay when a dot is hovered |
| speed | integer (ms) | `300` | Slide animation speed in milliseconds | 
| timing | string | `ease` | Transition timing function <br> (`linear`/`ease`/`ease-in`/`ease-out`/`ease-in-out`) |

### Example

``` vue
<agile :arrows="false" :dots="false" :infinite="false">
    ...
</agile>
```

## Contributing
```
# install dependencies
yarn install
 
# serve with hot reload at localhost:8080
yarn run dev
 
# create UMD bundle.
yarn run bundle
```
