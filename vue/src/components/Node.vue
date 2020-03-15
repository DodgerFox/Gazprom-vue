<template>
    <router-link tag="div" class="node" active-class="active" :to="'/node/' + node.title"  @click="changeNode(node)">
        <div class="node__status" :class="node.color"></div>
        <div class="node__name">{{ node.title }}</div>
        <div class="node__options">
            <p :class="node.lastmetric.cpu.class">{{node.lastmetric.cpu.value}}</p>
            <p :class="node.lastmetric.disk.class">{{node.lastmetric.disk.value}}</p>
            <p :class="node.lastmetric.memory.class">{{node.lastmetric.memory.value}}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'Node',
    props: {
        node: {
            type: Object,
            required: true
        }
    }
}
</script>