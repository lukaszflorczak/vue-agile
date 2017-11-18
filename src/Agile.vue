<template>
    <div class="agile"
         :class="{'agile--fade': settings.fade && !settings.unagile, 'agile--disabled': settings.unagile}">
        <div ref="list" class="agile__list" :style="{paddingLeft: listPadding, paddingRight: listPadding}">
            <div ref="track" class="agile__track"
                 :style="{width: widthTrack + 'px', transform: 'translate(-' + transform + 'px)', transition: 'transform ' + settings.timing + ' ' + transitionDelay + 'ms'}"
                 @mouseover="handleMouseOver('track')" @mouseout="handleMouseOut('track')">
                <slot></slot>
            </div>
        </div>

        <ul ref="dots" v-if="settings.dots && !settings.unagile" class="agile__dots">
            <li v-for="n in slidesCount" class="agile__dot"
                :class="{'agile__dot--current': n - 1 === currentSlide}"
                @mouseover="handleMouseOver('dot')" @mouseout="handleMouseOut('dot')">

                <button @click="goTo(n - 1)">{{n}}</button>
            </li>
        </ul>

        <button v-if="settings.arrows && !settings.unagile" class="agile__arrow agile__arrow--prev"
                :disabled="currentSlide === 0 && !settings.infinite" @click="goToPrev" v-html="settings.prevArrow">
        </button>
        <button v-if="settings.arrows && !settings.unagile" class="agile__arrow agile__arrow--next"
                :disabled="currentSlide === slidesCount - 1 && !settings.infinite" @click="goToNext"
                v-html="settings.nextArrow">
        </button>
    </div>
</template>

<script>
    export default {
        name: 'agile',

        props: {
            arrows: {
                type: Boolean,
                default: true
            },

            asNavFor: {
                type: Array,
                default: function () {
                    return []
                }
            },

            autoplay: {
                type: Boolean,
                default: false
            },

            autoplaySpeed: {
                type: Number,
                default: 3000
            },

            centerMode: {
                type: Boolean,
                default: false
            },

            centerPadding: {
                type: String,
                default: '15%'
            },

            dots: {
                type: Boolean,
                default: true
            },

            fade: {
                type: Boolean,
                default: false
            },

            infinite: {
                type: Boolean,
                default: true
            },

            initialSlide: {
                type: Number,
                default: 0
            },

            mobileFirst: {
                type: Boolean,
                default: true
            },

            nextArrow: {
                type: String,
                default: '<svg x="0px" y="0px" viewBox="0 0 24 24"><path d="M7.8,21c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l7.4-7.3L7,4.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l8.8,8.7l-8.8,8.7C8.3,20.9,8,21,7.8,21z"/></svg>'
            },

            options: {
                type: Object,
                default: function () {
                    return null
                }
            },

            pauseOnDotsHover: {
                type: Boolean,
                default: false
            },

            pauseOnHover: {
                type: Boolean,
                default: true
            },

            prevArrow: {
                type: String,
                default: '<svg x="0px" y="0px" viewBox="0 0 24 24"><path d="M16.2,21c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L9.6,12L17,4.7c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L6.8,12l8.8,8.7C15.7,20.9,16,21,16.2,21z"/></svg>'
            },

            responsive: {
                type: Object,
                default: function () {
                    return null
                }
            },

            show: {
                type: Boolean,
                default: true
            },

            slidesToScroll: {
                type: Number,
                default: 1
            },

            slidesToShow: {
                type: Number,
                default: 1
            },

            speed: {
                type: Number,
                default: 300
            },

            timing: {
                type: String,
                default: 'ease' // linear, ease-in, ease-out, ease-in-out
            },

            unagile: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                slides: null,
                slidesCount: 0,
                autoplayStatus: false,
                autoplayTimeout: null,
                allSlidesCount: 0,
                currentSlide: null,
                mouseDown: false,
                dragStartX: 0,
                dragStaryY: 0,
                dragDistance: 0,
                swipeDistance: 50,
                transform: 0,
                transitionDelay: 0,
                widthWindow: 0,
                widthContainer: 0,
                widthSlide: 0,
                widthTrack: 0,
                defaultSettings: {
                    arrows: this.arrows,
                    asNavFor: this.asNavFor,
                    autoplay: this.autoplay,
                    autoplaySpeed: this.autoplaySpeed,
                    centerMode: this.centerMode,
                    centerPadding: this.centerPadding,
                    dots: this.dots,
                    fade: this.fade,
                    infinite: this.infinite,
                    initialSlide: this.initialSlide,
                    nextArrow: this.nextArrow,
                    pauseOnDotsHover: this.pauseOnDotsHover,
                    pauseOnHover: this.pauseOnHover,
                    prevArrow: this.prevArrow,
                    responsive: this.responsive,
                    slidesToScroll: this.slidesToScroll,
                    slidesToShow: this.slidesToShow,
                    speed: this.speed,
                    timing: this.timing,
                    unagile: this.unagile
                },
                settings: {}
            }
        },

        created () {
            // Read settings from options object
            if (this.options) {
                for (let key in this.options) {
                    this.defaultSettings[key] = this.options[key]
                }
            }

            // Sort breakpoints
            if (this.defaultSettings.responsive) {
                this.defaultSettings.responsive.sort(this.compare)
            }

            // Set first load settings
            Object.assign(this.settings, this.defaultSettings)
        },

        mounted () {
            // Prepare slides
            this.slides = this.$refs.track.children
            this.slidesCount = this.slides.length

            for (let i = 0; i < this.slidesCount; ++i) {
                this.slides[i].classList.add('agile__slide')

                // Prepare slides for fade mode
                if (this.settings.fade) {
                    this.slides[i].style.transition = 'opacity ' + this.timing + ' ' + this.speed + 'ms'
                }
            }

            // Windows resize listener
            window.addEventListener('resize', this.getWidth)

            // Mouse and touch events
            if ('ontouchstart' in window) {
                this.$refs.track.addEventListener('touchstart', this.handleMouseDown)
                this.$refs.track.addEventListener('touchend', this.handleMouseUp)
                this.$refs.track.addEventListener('touchmove', this.handleMouseMove)
            } else {
                this.$refs.track.addEventListener('mousedown', this.handleMouseDown)
                this.$refs.track.addEventListener('mouseup', this.handleMouseUp)
                this.$refs.track.addEventListener('mousemove', this.handleMouseMove)
            }

            // Get width on start
            this.getWidth()
        },

        beforeDestroy () {
            window.removeEventListener('resize', this.getWidth)

            if ('ontouchstart' in window) {
                this.$refs.track.removeEventListener('touchstart', this.handleMouseDown)
                this.$refs.track.removeEventListener('touchend', this.handleMouseUp)
                this.$refs.track.removeEventListener('touchmove', this.handleMouseMove)
            } else {
                this.$refs.track.removeEventListener('mousedown', this.handleMouseDown)
                this.$refs.track.removeEventListener('mouseup', this.handleMouseUp)
                this.$refs.track.removeEventListener('mousemove', this.handleMouseMove)
            }

            this.disableAutoplayMode()
        },

        methods: {
            getWidth () {
                let computedStyle = getComputedStyle(this.$refs.list)

                this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                this.widthContainer = this.settings.centerMode ? this.$refs.list.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight) : this.$refs.list.clientWidth
            },

            compare (a, b) {
                if (a.breakpoint < b.breakpoint) {
                    return this.defaultSettings.mobileFirst ? -1 : 1
                } else if (a.breakpoint > b.breakpoint) {
                    return this.defaultSettings.mobileFirst ? 1 : -1
                } else {
                    return 0
                }
            },

            handleMouseDown (e) {
                if (!e.touches) {
                    e.preventDefault()
                }

                this.mouseDown = true
                this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
                this.dragStartY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
            },

            handleMouseMove (e) {
                let positionX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
                let positionY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY

                let dragDistanceX = Math.abs(positionX - this.dragStartX)
                let dragDistanceY = Math.abs(positionY - this.dragStartY)

                if (dragDistanceX > 3 * dragDistanceY) {
                    this.dragDistance = positionX - this.dragStartX
                    this.disableScroll()
                }
            },

            handleMouseUp () {
                this.mouseDown = false
                this.enableScroll()
            },

            handleMouseOver (element) {
                if (this.settings.autoplay) {
                    if ((element === 'dot' && this.settings.pauseOnDotsHover) || (element === 'track' && this.settings.pauseOnHover)) {
                        this.disableAutoplayMode()
                    }
                }
            },

            handleMouseOut (element) {
                if (this.settings.autoplay) {
                    if ((element === 'dot' && this.settings.pauseOnDotsHover) || (element === 'track' && this.settings.pauseOnHover)) {
                        this.enableAutoplayMode()
                    }
                }
            },

            enableInfiniteMode () {
                if (!this.settings.fade && !this.$refs.list.getElementsByClassName('agile__slide--cloned')[0]) {
                    let slides = {}
                    Object.assign(slides, this.slides)

                    for (let i = 0; i < this.settings.slidesToShow + 1; i++) {
                        let index = this.slidesCount + i - 1
                        let cloned = slides[i].cloneNode(true)
                        cloned.classList.add('agile__slide--cloned')
                        this.$refs.track.insertBefore(cloned, this.slides[index].nextSibling)
                    }

                    for (let i = this.slidesCount - 1; i > this.slidesCount - 2 - this.settings.slidesToShow; i--) {
                        let cloned = slides[i].cloneNode(true)
                        cloned.classList.add('agile__slide--cloned')
                        this.$refs.track.insertBefore(cloned, this.slides[0])
                    }

                    this.countSlides()
                }
            },

            disableInfiniteMode () {
                let clonedSlides = this.$refs.list.getElementsByClassName('agile__slide--cloned')

                while (clonedSlides[0]) {
                    clonedSlides[0].parentNode.removeChild(clonedSlides[0])
                }

                this.countSlides()
            },

            enableAutoplayMode () {
                // Protection against contradictory settings
                if (!this.settings.infinite) {
                    this.settings.infinite = true
                    this.enableInfiniteMode()
                }

                this.autoplayStatus = true
                this.startAutoplay()
            },

            disableAutoplayMode () {
                this.autoplayStatus = false
                this.stopAutoplay()
            },

            countSlides () {
                if (this.settings.infinite && !this.settings.fade && !this.settings.unagile) {
                    this.allSlidesCount = this.slidesCount + (2 * (this.settings.slidesToShow + 1))
                } else {
                    this.allSlidesCount = this.slidesCount
                }
            },

            disableScroll () {
                document.ontouchmove = function (e) {
                    e.preventDefault()
                }
            },

            enableScroll () {
                document.ontouchmove = function (e) {
                    return true
                }
            },

            addActiveClass (i) {
                this.slides[i].classList.add('agile__slide--active')

                if (this.settings.slidesToShow > 1) {
                    let h = Math.floor(this.settings.slidesToShow / 2)

                    for (let j = i - h; j <= i + h; j++) {
                        this.slides[j].classList.add('agile__slide--current')
                    }
                }
            },

            startAutoplay () {
                this.autoplayTimeout = setTimeout(() => {
                    if (!this.settings.autoplay) {
                        this.stopAutoplay()
                        this.disableAutoplayMode()
                        return false
                    }

                    this.goToNext()
                }, this.autoplaySpeed)
            },

            stopAutoplay () {
                clearTimeout(this.autoplayTimeout)
            },

            goTo (n, transition = true, autoplayTimeout = true, asNav = false) {
                // Break goTo() if unagile is active
                if (this.settings.unagile) {
                    return false
                }

                // asNavFor – set the same slide on all related Agiles
                if (!asNav) {
                    for (let i = 0; i < this.settings.asNavFor.length; i++) {
                        if (this.$refs[this.settings.asNavFor[i]]) {
                            this.$refs[this.settings.asNavFor[i]].goTo(n, transition, autoplayTimeout, true)
                        } else if (this.$parent.$refs[this.settings.asNavFor[i]]) {
                            this.$parent.$refs[this.settings.asNavFor[i]].goTo(n, transition, autoplayTimeout, true)
                        }
                    }
                }

                if (transition) {
                    let realNextSlide = n

                    if (this.settings.infinite && n < 0) {
                        realNextSlide = this.slidesCount - 1
                    } else if (n >= this.slidesCount) {
                        realNextSlide = 0
                    }

                    this.$emit('beforeChange', {currentSlide: this.currentSlide, goToNext: realNextSlide})
                }

                // Reset autoplay timeout and set new
                if (this.settings.autoplay && autoplayTimeout) {
                    this.stopAutoplay()
                    this.startAutoplay()
                }

                if (this.settings.fade) {
                    // Disable transition for initial slide
                    if (!transition) {
                        this.slides[n].style.transition = '0ms'

                        setTimeout(() => {
                            this.slides[n].style.transition = 'opacity ' + this.timing + ' ' + this.speed + 'ms'
                        }, 10)
                    }

                    for (let i = 0; i < this.allSlidesCount; ++i) {
                        this.slides[i].classList.remove('agile__slide--expiring')
                    }

                    if (this.settings.infinite && n < 0) {
                        n = this.slidesCount - 1
                    } else if (n >= this.slidesCount) {
                        n = 0
                    }

                    // Set current slide as expiring
                    let e = this.currentSlide
                    this.slides[e].classList.add('agile__slide--expiring')

                    setTimeout(() => {
                        this.slides[e].classList.remove('agile__slide--expiring')
                    }, this.settings.speed)

                    this.transform = 0
                } else {
                    let transform = n * this.widthSlide

                    if (!this.settings.infinite && this.slidesCount - n < this.settings.slidesToShow + 1) {
                        transform = this.widthSlide * (this.slidesCount - this.settings.slidesToShow + 1)
                    }

                    if (this.settings.centerMode) {
                        if (this.settings.slidesToShow % 2) {
                            transform -= Math.floor(this.settings.slidesToShow / 2) * this.widthSlide
                        } else if (this.settings.slidesToShow >= 4) {
                            // transform -= Math.floor(this.settings.slidesToShow / 3) * this.widthSlide
                        }
                    }

                    this.transform = transform
                }

                for (let i = 0; i < this.allSlidesCount; ++i) {
                    this.slides[i].classList.remove('agile__slide--active')
                    this.slides[i].classList.remove('agile__slide--current')
                }

                if (this.settings.infinite && !this.settings.fade) {
                    this.transform += this.widthSlide * (this.settings.slidesToShow + 1)
                    this.addActiveClass(n + this.settings.slidesToShow + 1)
                } else {
                    this.addActiveClass(n)
                }

                if (!transition) {
                    this.transitionDelay = 0
                } else {
                    this.transitionDelay = this.speed
                }

                if (this.settings.infinite && n < 0) {
                    this.currentSlide = this.slidesCount - 1

                    setTimeout(() => {
                        this.goTo(this.slidesCount - 1, false)
                    }, this.speed)
                } else if (this.settings.infinite && n >= this.slidesCount) {
                    this.currentSlide = 0

                    setTimeout(() => {
                        this.goTo(0, false)
                    }, this.settings.speed)
                } else {
                    this.currentSlide = n
                }

                if (transition) {
                    this.$emit('afterChange', {currentSlide: this.currentSlide})
                }
            },

            goToNext () {
                this.goTo(this.currentSlide + 1)
            },

            goToPrev () {
                this.goTo(this.currentSlide - 1)
            },

            reload () {
                // Responsive
                if (this.defaultSettings.responsive) {
                    let responsiveSettings = {}
                    Object.assign(responsiveSettings, this.defaultSettings)

                    responsiveSettings.responsive.forEach((responsive) => {
                        if (this.defaultSettings.mobileFirst) {
                            if (responsive.breakpoint < this.widthWindow) {
                                for (let key in responsive.settings) {
                                    responsiveSettings[key] = responsive.settings[key]
                                }
                            }
                        } else {
                            if (responsive.breakpoint > this.widthWindow) {
                                for (let key in responsive.settings) {
                                    responsiveSettings[key] = responsive.settings[key]
                                }
                            }
                        }
                    })

                    Object.assign(this.settings, responsiveSettings)
                }

                this.widthSlide = !this.settings.unagile ? this.widthContainer / this.settings.slidesToShow : 'auto'

                if (this.settings.centerMode && this.settings.slidesToShow > this.slidesCount - 1) {
                    this.settings.slidesToShow = this.slidesCount - 1
                } else if (this.settings.slidesToShow > this.slidesCount) {
                    this.settings.slidesToShow = this.slidesCount
                }

                // Check infinity mode status and enable/disable
                if (this.settings.infinite && !this.settings.fade && !this.settings.unagile) {
                    this.enableInfiniteMode()
                } else {
                    this.disableInfiniteMode()
                }

                // Check autoplay mode status and enable/disable
                if (this.settings.autoplay && !this.autoplayStatus) {
                    this.enableAutoplayMode()
                }

                if ((!this.settings.autoplay && this.autoplayStatus) || this.settings.unagile) {
                    this.disableAutoplayMode()
                }

                // Actions on document resize
                for (let i = 0; i < this.allSlidesCount; ++i) {
                    this.slides[i].style.width = this.widthSlide + 'px'

                    // Prepare slides for fade mode
                    if (this.settings.fade && !this.settings.unagile) {
                        this.slides[i].style.transform = 'translate(-' + i * this.widthSlide + 'px)'
                    } else {
                        this.slides[i].style.transform = 'translate(0)'
                    }
                }

                // Prepare track
                if (this.settings.unagile) {
                    this.widthTrack = this.widthContainer
                    this.transform = 0
                } else {
                    this.widthTrack = this.widthSlide * this.allSlidesCount

                    if (this.currentSlide === null) {
                        this.currentSlide = this.settings.initialSlide
                    }

                    this.goTo(this.currentSlide, false, false)
                }
            },

            getCurrentSlide () {
                return this.currentSlide
            }
        },

        computed: {
            listPadding: function () {
                if (this.settings.centerMode) {
                    return this.settings.centerPadding
                } else {
                    return 0
                }
            }
        },

        watch: {
            show () {
                this.getWidth()
                this.reload()
            },

            widthWindow () {
                this.reload()
            },

            dragDistance () {
                if (this.mouseDown) {
                    if (this.dragDistance > this.swipeDistance) {
                        if (!this.settings.infinite && this.currentSlide === 0) {
                            return
                        }

                        this.goToPrev()
                        this.handleMouseUp()
                    }

                    if (this.dragDistance < -1 * this.swipeDistance) {
                        if (!this.settings.infinite && this.currentSlide === this.slidesCount - 1) {
                            return
                        }

                        this.goToNext()
                        this.handleMouseUp()
                    }
                }
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    .agile {
        position: relative;

        &, * {
            &:focus,
            &:active {
                outline: none;
            }
        }

        &__list {
            display: block;
            overflow: hidden;
            position: relative;
            width: 100%;
        }

        &__track {
            align-items: center;
            display: flex;
            justify-content: flex-start;

            .agile--disabled & {
                display: block;
            }
        }

        &__slide {
            display: block;

            .agile--fade & {
                opacity: 0;
                position: relative;
                z-index: 0;

                &--active {
                    opacity: 1;
                    z-index: 2;
                }

                &--expiring {
                    opacity: 1;
                    transition-duration: 0s;
                    z-index: 1;
                }
            }
        }

        &__arrow {
            &[disabled] {
                cursor: default;
            }
        }

        &__dots {
            align-items: center;
            display: flex;
            list-style: none;
            padding: 0;
            white-space: nowrap;
        }

        &__dot {
            button {
                cursor: pointer;
                display: block;
                font-size: 0;
                line-height: 0;
            }
        }
    }
</style>
