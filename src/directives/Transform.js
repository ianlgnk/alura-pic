import Vue from 'vue'

Vue.directive('transformer', {
    bind(el, binding, vnode) {
        let current = 0;

        el.addEventListener('click', function() {
            let increment = binding.value || 90;
            let effect;

            if (!binding.arg || binding.arg == 'rotate') {
                if (binding.modifiers.reverse) {
                    current -= increment;
                } else {
                    current += increment;
                }

                effect = `rotate(${current}deg)`;
            } else if (binding.arg == 'scale') {
                effect = `scale(${increment})`;
            }

            this.style.transform = effect;
        });
    }
});