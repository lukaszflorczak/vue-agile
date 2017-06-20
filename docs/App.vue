<template>
    <main class="main">

        <div class="container">

            <agile>
                <div class="slide slide--1">slide 1</div>
                <div class="slide slide--2">slide 2</div>
                <div class="slide slide--3">slide 3</div>
                <div class="slide slide--4">slide 4</div>
                <div class="slide slide--5">slide 5</div>
                <div class="slide slide--6">slide 6</div>
            </agile>

        </div>
        <!-- /.container -->
    </main>
    <!-- /.main -->
</template>

<script>
    import Agile from '../src/Agile'

    export default {
        name: 'app',
        components: {Agile},
        data () {
            return {
                msg: 'vue-agile'
            }
        }
    }
</script>

<style lang="scss" type="text/scss">

    @import './scss/main.scss';

    .slide {
        align-items: center;
        color: #fff;
        display: flex;
        font-size: 20px;
        height: 200px;
        justify-content: center;
        padding: 20px;
        width: 100%;

        &--1 {
            background-color: #f1c40f;
        }

        &--2 {
            background-color: #e67e22;
        }

        &--3 {
            background-color: #e74c3c;
        }

        &--4 {
            background-color: #3498db;
        }

        &--5 {
            background-color: #9b59b6;
        }

        &--6 {
            background-color: #2ecc71;
        }
    }

</style>
