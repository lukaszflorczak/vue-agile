<template>
    <div class="agile">
        <div class="agile__list">
            <div class="agile__track"
                 :style="{width: width.container * allSlidesCount + 'px', transform: 'translate(-' + transform + 'px)', transition: options.timing + ' ' + transitionDelay + 'ms'}">
                <slot></slot>
            </div>

            <ul v-if="options.dots" class="agile__dots">
                <li v-for="n in slidesCount" :class="{'is-current': n - 1 === currentSlide}">
                    <button @click="setSlide(n - 1)">{{n}}</button>
                </li>
            </ul>

            <button v-if="options.arrows" class="agile__arrow agile__arrow--prev"
                    :disabled="currentSlide === 0 && !options.infinite" @click="prevSlide">prev
            </button>
            <button v-if="options.arrows" class="agile__arrow agile__arrow--next"
                    :disabled="currentSlide === slidesCount - 1 && !options.infinite" @click="nextSlide">next
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'agile',

        data () {
            return {
                dots: null,
                list: null,
                track: null,
                slides: null,
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
                    slide: 0
                },
                options: {
                    arrows: true,
                    dots: true,
                    infinite: true,
                    slidesToShow: 1,
                    speed: 300,
                    timing: 'ease' // linear, ease-in, ease-out, ease-in-out
                }
            }
        },

        mounted () {
            // Prepare list
            this.list = this.$el.getElementsByClassName('agile__list')[0]

            // Prepare track
            this.track = this.$el.getElementsByClassName('agile__track')[0]

            // Prepare slides
            this.slides = this.$el.getElementsByClassName('agile__track')[0].children
            this.slidesCount = this.slides.length

            if (this.options.infinite) {
                this.allSlidesCount = this.slidesCount + 2
            } else {
                this.allSlidesCount = this.slidesCount
            }

            for (let i = 0; i < this.slidesCount; ++i) {
                this.slides[i].classList.add('agile__slide')
            }

            // Prepare infinity mode
            if (this.options.infinite) {
                let firstSlide = this.track.firstChild.cloneNode(true)
                let lastSlide = this.track.lastChild.cloneNode(true)

                firstSlide.classList.add('agile__slide--cloned')
                lastSlide.classList.add('agile__slide--cloned')

                this.track.prepend(lastSlide)
                this.track.append(firstSlide)
            }

            // Listeners
            this.$nextTick(function () {
                // Windows resize listener
                window.addEventListener('resize', this.getWidth)

                // Get width on start
                this.getWidth()

                // Mouse and touch events
                if ('ontouchstart' in window) {
                    this.track.addEventListener('touchstart', this.handleMouseDown)
                    this.track.addEventListener('touchend', this.handleMouseUp)
                    this.track.addEventListener('touchmove', this.handleMouseMove)
                } else {
                    this.track.addEventListener('mousedown', this.handleMouseDown)
                    this.track.addEventListener('mouseup', this.handleMouseUp)
                    this.track.addEventListener('mousemove', this.handleMouseMove)
                }
            })
        },

        beforeDestroy () {
            window.removeEventListener('resize', this.getWidth)
        },

        methods: {
            getWidth () {
                this.width = {
                    document: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    container: this.list.clientWidth,
                    slide: this.list.clientWidth / this.options.slidesToShow
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

                if (this.options.infinite) {
                    this.transform += this.width.slide
                }

                if (!transition) {
                    this.transitionDelay = 0
                } else {
                    this.transitionDelay = this.options.speed
                }

                if (this.options.infinite && n < 0) {
                    this.currentSlide = this.slidesCount - 1

                    setTimeout(() => {
                        this.setSlide(this.slidesCount - 1, false)
                    }, this.options.speed)
                } else if (this.options.infinite && n >= this.slidesCount) {
                    this.currentSlide = 0

                    setTimeout(() => {
                        this.setSlide(0, false)
                    }, this.options.speed)
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
                    this.slides[i].style.width = this.width.container + 'px'
                }

                // Prepare track
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
