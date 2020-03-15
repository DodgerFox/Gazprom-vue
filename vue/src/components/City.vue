<template>
    <li  class="block-button" @click="changeCity" :class="{current: current, active: active}" >{{ city.name }}</li>
</template>

<script>

export default {
    name: 'Node',
    props: {
        city: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        active: false,
        current: false
    }),
    methods: {
        async changeCity () {
            await this.$emit('activeCity', this);
        },
    },
    computed: {
        getActive () {
            return this.$attrs.active       
        },
        getCurrent () {
            return this.$attrs.current      
        }
    },
    mounted () {
        let current = this.$attrs.current;
        (current && this.city.id == current.id) ? this.current = true : '';
    },
    watch: {
        getActive (active) {
            this.active = false;
            (active && this.city.id == active.id) ? this.active = true : '';
        },
        getCurrent (current) {
            this.current = false;
            
            (current && this.city.id == current.id) ? this.current = true : '';
        }
    }
}
</script>