<template>
    <div class="agile">
        <div class="agile__list">
            <div class="agile__track">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'agile',

        data () {
            return {
                track: null,
                slides: null,
                slidesCount: 0,
                width: {
                    document: 0,
                    container: 0
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

            // Prepare track
            this.track = this.$el.getElementsByClassName('agile__track')[0]
        },

        beforeDestroy () {
            window.removeEventListener('resize', this.getWidth)
        },

        methods: {
            getWidth () {
                this.width = {
                    // Cross-browser solution:
                    document: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    container: this.$el.parentElement.innerWidth || this.$el.parentElement.clientWidth
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
            height: 100%;
            margin: 0;
            overflow: hidden;
            padding: 0;
            position: relative;
        }

        &__track {
            height: 100%;
        }

        &__slide {
            display: block;
            height: 100%;
            float: left;
        }
    }

</style>
