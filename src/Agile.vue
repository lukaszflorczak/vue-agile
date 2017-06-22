<template>
    <div class="agile">
        <div class="agile__list">
            <div class="agile__track">
                <slot></slot>
            </div>

            <ul v-if="options.dots" class="agile__dots">
                <li v-for="n in slidesCount" :class="{'is-current': n - 1 === currentSlide}">
                    <button @click="setSlide(n - 1)">{{n}}</button>
                </li>
            </ul>

            <button class="agile__arrow agile__arrow--prev" :disabled="currentSlide === 0" @click="prevSlide">prev</button>
            <button class="agile__arrow agile__arrow--next" :disabled="currentSlide === slidesCount - 1"@click="nextSlide">next</button>
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
                currentSlide: 0,
                width: {
                    document: 0,
                    container: 0,
                    slide: 0
                },
                options: {
                    dots: true,
                    slidesToShow: 1,
                    speed: 300,
                    timing: 'ease' // linear, ease-in, ease-out, ease-in-out
                }
            }
        },

        mounted () {
            // Listeners
            this.$nextTick(function () {
                // Windows resize listener
                window.addEventListener('resize', this.getWidth)

                // Get width on start
                this.getWidth()
            })

            // Prepare slides
            this.slides = this.$el.getElementsByClassName('agile__track')[0].children
            this.slidesCount = this.slides.length

            for (let i = 0; i < this.slidesCount; ++i) {
                this.slides[i].classList.add('agile__slide')
            }

            // Prepare list
            this.list = this.$el.getElementsByClassName('agile__list')[0]

            // Prepare track
            this.track = this.$el.getElementsByClassName('agile__track')[0]
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

            setSlide (n) {
                this.currentSlide = n
                this.track.style.transform = 'translate(-' + this.currentSlide * this.width.slide + 'px)'
                this.track.style.transition = this.options.timing + ' ' + this.options.speed + 'ms'
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
                for (let i = 0; i < this.slidesCount; ++i) {
                    this.slides[i].style.width = this.width.container + 'px'
                }

                // Prepare track
                this.track.style.width = this.width.container * this.slidesCount + 'px'
                this.setSlide(this.currentSlide)
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
