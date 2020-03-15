<template>
    <div class="nodes">
        <Node v-for="node in filtered" :key="node.node_id" :node="node"/>
    </div>
</template>

<script>
import Node from '@/components/Node'

export default {
    name: 'Nodes',
    data: () => ({
        nodes: null,
        filtered: null,
        city: null
    }),
    components: {
        Node
    },
    computed: {
        getData () {            
            return this.$store.getters.getData[0];
        },
        getCity () {
            return this.$store.getters.getCity;
        }
    },
    methods: {
        setNode (nodes) {
            (this.city) ? nodes = nodes.filter(node => node.group_id === this.city.id) : '';
            this.filtered = nodes
        },
        setCity (city) {
            this.city = city
        }
    },
    watch: {
        getData (nodes) {
            this.nodes = nodes;
            this.setNode(nodes)
        },
        getCity (city) {       
            this.city = city;
            this.setNode(this.nodes)
        },
    }
}
</script>