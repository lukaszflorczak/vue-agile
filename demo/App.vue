<template>
    <main class="main">
        <header class="section section--header">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h1 class="section__title">Demo of <strong>vue-agile</strong><span class="badge">0.2</span></h1>
                        <p class="section__description">vue-agile is a carousel component for Vue.js inspired by Slick. Simple, touch-friendly, written in Vue and Vanilla JS (without jQuery dependency).</p>

                        <div class="gh-buttons visible-md">
                            <a class="github-button" href="https://github.com/lukaszflorczak/vue-agile" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star lukaszflorczak/vue-agile on GitHub">Star</a>

                            <a class="github-button" href="https://github.com/lukaszflorczak/vue-agile/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch lukaszflorczak/vue-agile on GitHub">Watch</a>

                            <a class="github-button" href="https://github.com/lukaszflorczak/vue-agile/issues" data-icon="octicon-issue-opened" data-size="large" data-show-count="true" aria-label="Issue lukaszflorczak/vue-agile on GitHub">Issue</a>
                        </div>
                    </div>

                    <div class="col-xs-12 hidden-md gh-buttons">
                        <a class="github-button" href="https://github.com/lukaszflorczak/vue-agile" data-icon="octicon-star" data-size="large" data-show-count="false" aria-label="Star lukaszflorczak/vue-agile on GitHub">Star</a>

                        <a class="github-button" href="https://github.com/lukaszflorczak/vue-agile/subscription" data-icon="octicon-eye" data-size="large" data-show-count="false" aria-label="Watch lukaszflorczak/vue-agile on GitHub">Watch</a>

                        <a class="github-button" href="https://github.com/lukaszflorczak/vue-agile/issues" data-icon="octicon-issue-opened" data-size="large" data-show-count="false" aria-label="Issue lukaszflorczak/vue-agile on GitHub">Issue</a>
                    </div>
                </div>
            </div>
        </header>


        <section class="section section--demo-1">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h2 class="section__title"><strong>#1</strong> demo</h2>
                        <p class="section__description">vue-agile with default settings and minimal styles</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <agile>
                            <div class="slide slide--1"><h3>slide 1</h3></div>
                            <div class="slide slide--2"><h3>slide 2</h3></div>
                            <div class="slide slide--3"><h3>slide 3</h3></div>
                            <div class="slide slide--4"><h3>slide 4</h3></div>
                            <div class="slide slide--5"><h3>slide 5</h3></div>
                            <div class="slide slide--6"><h3>slide 6</h3></div>
                        </agile>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-lg-6">
                        <div class="code">
                            <h4 class="code__title">Template</h4>
                        </div>

                        <pre class="code__content">
                            <code class="language-html">
                                &lt;agile&gt;
                                    &lt;div class="slide slide--1"&gt;&lt;h3&gt;slide 1&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--2"&gt;&lt;h3&gt;slide 2&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--3"&gt;&lt;h3&gt;slide 3&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--4"&gt;&lt;h3&gt;slide 4&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--5"&gt;&lt;h3&gt;slide 5&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--6"&gt;&lt;h3&gt;slide 6&lt;/h3&gt;&lt;/div&gt;
                                &lt;/agile&gt;
                            </code>
                        </pre>
                    </div>

                    <div class="col-xs-12 col-lg-6">
                        <div class="code">
                            <h4 class="code__title">Styles</h4>
                        </div>

                        <pre class="code__content">
                            <code class="language-css">
                                .slide {
                                    color: #fff;
                                    height: 300px;
                                    position: relative;

                                    &--1 {
                                        background-color: #f1c40f;
                                    }

                                    ...

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
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section--demo-2">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h2 class="section__title"><strong>#2</strong> demo</h2>
                        <p class="section__description">vue-agile with background-images, disabled infinite mode and custom styles for arrows and dots indicators</p>
                    </div>
                </div>
            </div>

            <div class="container-fluid">
                <div class="row no-gutters">
                    <div class="col-xs-12">
                        <agile :infinite="false">
                            <div class="slide slide--1"><h3>slide 1</h3></div>
                            <div class="slide slide--2"><h3>slide 2</h3></div>
                            <div class="slide slide--3"><h3>slide 3</h3></div>
                            <div class="slide slide--4"><h3>slide 4</h3></div>
                            <div class="slide slide--5"><h3>slide 5</h3></div>
                            <div class="slide slide--6"><h3>slide 6</h3></div>
                        </agile>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-lg-6">
                        <div class="code">
                            <h4 class="code__title">Template</h4>
                        </div>

                        <pre class="code__content">
                            <code class="language-html">
                                &lt;agile :infinite="false"&gt;
                                    &lt;div class="slide slide--1"&gt;&lt;h3&gt;slide 1&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--2"&gt;&lt;h3&gt;slide 2&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--3"&gt;&lt;h3&gt;slide 3&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--4"&gt;&lt;h3&gt;slide 4&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--5"&gt;&lt;h3&gt;slide 5&lt;/h3&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--6"&gt;&lt;h3&gt;slide 6&lt;/h3&gt;&lt;/div&gt;
                                &lt;/agile&gt;
                            </code>
                        </pre>
                    </div>

                    <div class="col-xs-12 col-lg-6">
                        <div class="code">
                            <h4 class="code__title">Styles</h4>
                        </div>

                        <pre class="code__content">
                            <code class="language-css">
                                .agile {
                                    &__dots {
                                        bottom: 0;
                                        left: 50%;
                                        position: absolute;
                                        transform: translateX(-50%);
                                    }

                                    &__dot {
                                        button {
                                            background-color: transparent;
                                            border: 1px solid #fff;

                                            &:hover {
                                                background-color: #fff;
                                            }
                                        }

                                        &--current {
                                            button {
                                                background-color: #fff;
                                            }
                                        }
                                    }

                                    &__arrow {
                                        height: 100%;
                                        top: 0;
                                        width: 80px;

                                        &:hover {
                                            background-color: rgba(#000, .5);

                                            #arrow-svg {
                                                fill: #fff;
                                            }
                                        }

                                        &[disabled] {
                                            display: none;
                                        }

                                        #arrow-svg {
                                            fill: rgba(#fff, .4);
                                            height: 25px;
                                        }
                                    }
                                }

                                .slide {
                                    background: {
                                        position: center;
                                        size: cover;
                                    }
                                    height: 500px;

                                    &:before {
                                        background-color: rgba(#000, .2);
                                        content: '';
                                        height: 100%;
                                        left: 0;
                                        position: absolute;
                                        top: 0;
                                        width: 100%;
                                    }

                                    &--1 {
                                        background-image: url(../img/bg-1_1.jpg);
                                    }

                                    ...
                                }
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>

        <section class="section section--demo-3">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h2 class="section__title"><strong>#3</strong> demo</h2>
                        <p class="section__description">vue-agile with background-images, fade effect and autoplay</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <agile :arrows="false" :speed="750" :timing="'linear'" :infinite="true" :fade="true" :autoplay="true" :autoplaySpeed="5000" :pauseOnHover="false">
                            <div class="slide slide--1"></div>
                            <div class="slide slide--2"></div>
                            <div class="slide slide--3"></div>
                        </agile>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-lg-6">
                        <div class="code">
                            <h4 class="code__title">Template</h4>
                        </div>

                        <pre class="code__content">
                            <code class="language-html">
                                &lt;agile :arrows="false" :speed="750" :timing="'linear'" :fade="true" :autoplay="true" :pauseOnHover="false"&gt;
                                    &lt;div class="slide slide--1"&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--2"&gt;&lt;/div&gt;
                                    &lt;div class="slide slide--3"&gt;&lt;/div&gt;
                                &lt;/agile&gt;
                            </code>
                        </pre>
                    </div>

                    <div class="col-xs-12 col-lg-6">
                        <div class="code">
                            <h4 class="code__title">Styles</h4>
                        </div>

                        <pre class="code__content">
                            <code class="language-css">
                                .agile {
                                    &__dots {
                                        bottom: 0;
                                        display: block;
                                        left: 10px;
                                        position: absolute;
                                        width: 30px;
                                    }

                                    &__dot {
                                        margin-bottom: 10px;

                                        button {
                                            background-color: transparent;
                                            border: 1px solid #fff;
                                            margin-top: 10px;

                                            &:hover {
                                                background-color: #fff;
                                            }
                                        }

                                        &--current {
                                            button {
                                                background-color: #fff;
                                            }
                                        }
                                    }
                                }

                                .slide {
                                    background: {
                                        position: center;
                                        size: cover;
                                    }
                                    height: 500px;

                                    &--1 {
                                        background-image: url(../img/bg-1_1.jpg);
                                    }

                                    ...
                                }
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>


        <footer class="site-footer">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="copyright">
                            <span>Copyright © 2017 <strong>Łukasz Florczak</strong></span> <a href="https://twitter.com/lukaszflorczak" class="twitter-follow-button" data-show-count="false">Follow @lukaszflorczak</a>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="license">Licensed under the MIT license</div>
                    </div>
                </div>
            </div>
        </footer>
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

</style>
