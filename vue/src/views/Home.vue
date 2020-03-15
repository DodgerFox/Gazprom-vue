<template>
    <main class="main">
        <Loader v-if="loader" />
        <Panel />
        <Nodes />
        <Details />
    </main>
</template>

<script>
import Panel from '@/components/Panel'
import Nodes from '@/components/Nodes'
import Details from '@/components/Details'
import Loader from '@/components/Loader'

export default {
    name: "Home",
    data: () => ({
        loader: true
    }),
    components: {
        Panel,
        Nodes,
        Details,
        Loader
    },
    async mounted () {
        await this.$store.dispatch('fetchData');
        this.loader = false;
        
        setInterval(() => {
            this.$store.dispatch('fetchData');
        }, 60000);
    }
    };
</script>