<template>
    <div class="agile">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'agile',

        data () {
            return {
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
