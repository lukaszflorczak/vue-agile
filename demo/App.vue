<template>
    <main class="main">

        <div class="container">

            <agile>
                <div class="slide slide--1"><h3>slide 1</h3></div>
                <div class="slide slide--2"><h3>slide 2</h3></div>
                <div class="slide slide--3"><h3>slide 3</h3></div>
                <div class="slide slide--4"><h3>slide 4</h3></div>
                <div class="slide slide--5"><h3>slide 5</h3></div>
                <div class="slide slide--6"><h3>slide 6</h3></div>
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

    .agile {
        margin-top: 50px;
    }

    .slide {
        color: #fff;
        height: 300px;
        position: relative;

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

        h3 {
            font-size: 32px;
            font-weight: 300;
            left: 50%;
            margin: 0;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

</style>
