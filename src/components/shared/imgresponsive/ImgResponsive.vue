<template>
    <img class="responsive-img" :src="url" :alt="title" />
</template>

<script>
export default {
    props: [
        "url",
        "title"
    ]
}
</script>

<style scoped>
.responsive-img {
    width: 100%;
    transition: transform 0.2s;
}
</style>
