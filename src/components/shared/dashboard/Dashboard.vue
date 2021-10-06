<template>
    <div class="dashboard">
        <h2 class="dashboard-title" @click="visible = !visible">
        {{ title }}
        </h2>
        <transition name="dashboard-effect">
            <div class="img-container" v-show="visible">
                <slot />
            </div>
        </transition>
    </div>
</template> 

<script>
export default {
    props: [
        'title'
    ],
    data() {
        return {
            visible: true
        }
    }
}
</script>

<style>
.dashboard {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
}

.dashboard .dashboard-title {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
}

.dashboard-effect-enter, .dashboard-effect-leave-active {
    opacity: 0;
}

.dashboard-effect-enter-active, .dashboard-effect-leave-active {
    transition: opacity 0.2s;
}

</style>