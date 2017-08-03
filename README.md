# vue-agile

> Carousel component for Vue.js inspired by [Slick](https://github.com/kenwheeler/slick/).
> Simple, touch-friendly, written in Vue and Vanilla JS (without jQuery dependency).


## Instalation

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

Every first child of `<agile>` is a new slide.

## Options
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| arrows | boolean | `true` | Prev/Next arrows |
| dots | boolean | `true` | Dot indicators/pagination |
| infinite | boolen | `true` | Infinite loop sliding | 
| speed | integer (ms) | `300` | Slide animation speed | 
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
