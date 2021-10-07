<template>
    <button
        @click="callAction()"
        class="button" 
        :class="styleButton" 
        :type="type"
    >
        {{ label }}
    </button>
</template>

<script>
export default {
    props: {
        type: {
            required: true,
            type: String
        },
        label: {
            required: true,
            type: String
        }, 
        confirmation: Boolean,
        styleName: String
    },
    methods: {
        callAction() {
            if(this.confirmation) {
                if (confirm("Deseja apagar a foto?")) {
                    this.$emit('activeButton');
                }
                return;
            }
            this.$emit('activeButton');
        }
    },
    computed: {
        styleButton() {
            if(this.styleName == 'default' || !this.styleName) return 'button button-default';
            if(this.styleName == 'danger') return 'button button-danger';
        }
    }
}
</script>

<style lang="scss">
$cor: firebrick;

.button {
    display: inline-block;
    padding: 10px;
    border-radius: 3px;
    margin: 10px;
    font-size: 1.2em;
}

.button-danger {
    background: $cor;
    color: white;
}

.button-default {
    background: darkcyan;
    color: white;
}
</style>