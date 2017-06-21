<template>
    <div class="agile">
        <div class="agile__list">
            <div class="agile__track">
                <slot></slot>
            </div>

            <ul v-if="options.dots" class="agile__dots"></ul>
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
                width: {
                    document: 0,
                    container: 0
                },
                options: {
                    dots: true
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

            // Prepare dots
            this.dots = this.$el.getElementsByClassName('agile__dots')[0]

            for (let i = 0; i < this.slidesCount; ++i) {
                let li = document.createElement('li')
                let button = document.createElement('button')
                let count = document.createTextNode(i + 1)

                if (i === 0) {
                    li.classList.add('is-current')
                }

                this.dots.appendChild(li).appendChild(button).appendChild(count)
            }
        },

        beforeDestroy () {
            window.removeEventListener('resize', this.getWidth)
        },

        methods: {
            getWidth () {
                this.width = {
                    // Cross-browser solution:
                    document: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    container: this.list.innerWidth || this.list.clientWidth
                }
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
            }
        }
    }
</script>

<style lang="scss" type="text/scss">

    .agile {
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
