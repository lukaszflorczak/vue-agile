<template>
    <div class="agile">
        <div class="agile__list">
            <div class="agile__track"
                 :style="{width: width.track + 'px', transform: 'translate(-' + transform + 'px)', transition: timing + ' ' + transitionDelay + 'ms'}">
                <slot></slot>
            </div>

            <ul v-if="dots" class="agile__dots">
                <li v-for="n in slidesCount" :class="{'is-current': n - 1 === currentSlide}">
                    <button @click="setSlide(n - 1)">{{n}}</button>
                </li>
            </ul>

            <button v-if="arrows" class="agile__arrow agile__arrow--prev"
                    :disabled="currentSlide === 0 && !infinite" @click="prevSlide">prev
            </button>
            <button v-if="arrows" class="agile__arrow agile__arrow--next"
                    :disabled="currentSlide === slidesCount - 1 && !infinite" @click="nextSlide">next
            </button>
        </div>
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

            dots: {
                type: Boolean,
                default: true
            },

            infinite: {
                type: Boolean,
                default: true
            },

            speed: {
                type: Number,
                default: 300
            },

            timing: {
                type: String,
                default: 'ease' // linear, ease-in, ease-out, ease-in-out
            }
        },

        data () {
            return {
                el: {
                    dosts: null,
                    list: null,
                    track: null,
                    slides: null
                },
                slidesCount: 0,
                allSlidesCount: 0,
                currentSlide: 0,
                mouseDown: false,
                dragStartX: 0,
                dragDistance: 0,
                swipeDistance: 30,
                transform: 0,
                transitionDelay: 0,
                width: {
                    document: 0,
                    container: 0,
                    slide: 0,
                    track: 0
                },
                slidesToShow: 1
            }
        },

        mounted () {
            // Prepare list
            this.el.list = this.$el.getElementsByClassName('agile__list')[0]

            // Prepare slides
            this.el.slides = this.$el.getElementsByClassName('agile__track')[0].children
            this.slidesCount = this.el.slides.length

            if (this.infinite) {
                this.allSlidesCount = this.slidesCount + 2
            } else {
                this.allSlidesCount = this.slidesCount
            }

            for (let i = 0; i < this.slidesCount; ++i) {
                this.el.slides[i].classList.add('agile__slide')
            }

            // Prepare track
            this.el.track = this.$el.getElementsByClassName('agile__track')[0]

            // Prepare infinity mode
            if (this.infinite) {
                let firstSlide = this.el.track.firstChild.cloneNode(true)
                let lastSlide = this.el.track.lastChild.cloneNode(true)

                firstSlide.classList.add('agile__slide--cloned')
                lastSlide.classList.add('agile__slide--cloned')

                this.el.track.prepend(lastSlide)
                this.el.track.append(firstSlide)
            }

            // Listeners
            this.$nextTick(function () {
                // Windows resize listener
                window.addEventListener('resize', this.getWidth)

                // Get width on start
                this.getWidth()

                // Mouse and touch events
                if ('ontouchstart' in window) {
                    this.el.track.addEventListener('touchstart', this.handleMouseDown)
                    this.el.track.addEventListener('touchend', this.handleMouseUp)
                    this.el.track.addEventListener('touchmove', this.handleMouseMove)
                } else {
                    this.el.track.addEventListener('mousedown', this.handleMouseDown)
                    this.el.track.addEventListener('mouseup', this.handleMouseUp)
                    this.el.track.addEventListener('mousemove', this.handleMouseMove)
                }
            })
        },

        beforeDestroy () {
            window.removeEventListener('resize', this.getWidth)

            if ('ontouchstart' in window) {
                this.el.track.removeEventListener('touchstart')
                this.el.track.removeEventListener('touchend')
                this.el.track.removeEventListener('touchmove')
            } else {
                this.el.track.removeEventListener('mousedown')
                this.el.track.removeEventListener('mouseup')
                this.el.track.removeEventListener('mousemove')
            }
        },

        methods: {
            getWidth () {
                this.width = {
                    document: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    container: this.el.list.clientWidth,
                    slide: this.el.list.clientWidth / this.slidesToShow
                }
            },

            handleMouseDown (e) {
                if (!e.touches) {
                    e.preventDefault()
                }

                this.mouseDown = true
                this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
            },

            handleMouseMove (e) {
                let positionX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
                this.dragDistance = (positionX - this.dragStartX)
            },

            handleMouseUp () {
                this.mouseDown = false
            },

            setSlide (n, transition = true) {
                this.transform = n * this.width.slide

                if (this.infinite) {
                    this.transform += this.width.slide
                }

                if (!transition) {
                    this.transitionDelay = 0
                } else {
                    this.transitionDelay = this.speed
                }

                if (this.infinite && n < 0) {
                    this.currentSlide = this.slidesCount - 1

                    setTimeout(() => {
                        this.setSlide(this.slidesCount - 1, false)
                    }, this.speed)
                } else if (this.infinite && n >= this.slidesCount) {
                    this.currentSlide = 0

                    setTimeout(() => {
                        this.setSlide(0, false)
                    }, this.speed)
                } else {
                    this.currentSlide = n
                }
            },

            nextSlide () {
                this.setSlide(this.currentSlide + 1)
            },

            prevSlide () {
                this.setSlide(this.currentSlide - 1)
            }
        },

        watch: {
            width () {
                // Actions on document resize
                for (let i = 0; i < this.allSlidesCount; ++i) {
                    this.el.slides[i].style.width = this.width.container + 'px'
                }

                // Prepare track
                this.width.track = this.width.container * this.allSlidesCount
                this.setSlide(this.currentSlide, false)
            },

            dragDistance () {
                if (!this.mouseDown) {
                    return
                }

                if (this.dragDistance > this.swipeDistance) {
                    this.prevSlide()
                    this.handleMouseUp()
                }

                if (this.dragDistance < -1 * this.swipeDistance) {
                    this.nextSlide()
                    this.handleMouseUp()
                }
            }
        }
    }
</script>

<style lang="scss" type="text/scss">

    .agile {
        &, * {
            &:focus,
            &:active {
                outline: none;
            }
        }

        &__list {
            display: block;
            margin: 0;
            overflow: hidden;
            padding: 0;
            position: relative;
            width: 100%;
        }

        &__track {
            &:before,
            &:after {
                content: '';
                display: table;
            }

            &:after {
                clear: both;
            }
        }

        &__slide {
            display: block;
            float: left;
        }

        &__arrow {
            border: none;
            bottom: 15px;
            margin: 0;
            padding: 0;
            position: absolute;
            transition-duration: .3s;

            &[disabled] {
                cursor: default;
                opacity: .4;
            }

            &--prev {
                left: 0;
            }

            &--next {
                right: 0;
            }
        }

        &__dots {
            list-style: none;
            margin: 20px 0;
            padding: 0;
            text-align: center;

            li {
                display: inline-block;
                margin: 0 10px;

                &.is-current,
                &:hover {
                    button {
                        background-color: #888;
                    }
                }
            }

            button {
                background-color: #eee;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: block;
                height: 10px;
                font-size: 0;
                line-height: 0;
                margin: 0;
                transition-duration: .3s;
                width: 10px;
            }
        }
    }

</style>
