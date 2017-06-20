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
                slides: null,
                slidesCount: 0,
                width: {
                    document: 0,
                    container: 0
                }
            }
        },

        mounted () {
            // Prepare slides
            this.slides = this.$el.getElementsByClassName('agile__track')[0].children
            this.slidesCount = this.slides.length

            for (let i = 0; i < this.slidesCount; ++i) {
                this.slides[i].classList.add('agile__slide')
            }

            // Listeners
            this.$nextTick(function () {
                // Windows resize listener
                window.addEventListener('resize', this.getWidth)

                // Get width on start
                this.getWidth()
            })
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
                console.log(this.width.document, this.width.container)
            }
        }
    }
</script>

<style lang="scss" type="text/scss">

</style>
