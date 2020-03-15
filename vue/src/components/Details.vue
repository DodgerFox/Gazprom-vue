<template>
    <div class="details" v-if="current">
        <div class="block charts">
            <Chart :chart-data="chartdata" :options="options" :width="200" :height="200"/>
        </div>
        <div class="block interface">
            <p class="block__title">Интерфейс:</p>
            <div class="block-interface">
                <div class="block-interface__name">{{ current.caption }}</div>
                <div class="block-interface__status" :class="status.color">{{ status.desc }}</div>
            </div>
        </div>
        <div class="block user">
            <p class="block__title">Администратор:</p>
            <div class="block-list">
                <div class="block-list__item">{{ current.firstname + ' ' + current.lastname }}</div>
                <div class="block-list__item">{{ current.email }}</div>
            </div>
        </div>
        <div class="block application">
            <p class="block__name">{{ current.lang }}</p>
        </div>
    </div>
</template>

<script>
import Chart from '@/components/Charts';

export default {
    name: 'Nodes',
    data: () => ({
        nodes: null,
        current: null,
        status: null,
        chartdata: {
            labels: ['CPU', 'Memory', 'Disk'],
            datasets: null
        },
        options: {
            responsive: true,
            legend: { display: false },
            title: {
                display: true,
                text: 'Options of utilization'
            }
        }
    }),
    components: {Chart},
    methods: {
        setData(hash) {
            let nodes = this.nodes;
            this.current = nodes.find(node => node.title == hash);
            this.setStatus(this.current)
            this.setChart(this.current)   
        },
        setNode (nodes) {
            (this.city) ? nodes = nodes.filter(node => node.group_id === this.city.id) : '';
            this.filtered = nodes
        },
        setStatus (node) {
            let statuses = this.$store.getters.getStatuses;
            let inters = parseInt(node.interface_status);
            this.status = statuses.find(status => status.id === inters);
        },
        setChart (node) {
            let metrics = node.lastmetric;
            this.chartdata.datasets = [
                {
                    backgroundColor: [metrics.cpu.color, metrics.memory.color, metrics.disk.color],
                    data: [metrics.cpu.value, metrics.memory.value, metrics.disk.value, 0, 100]
                }
            ];
        }
    },
    computed: {
        getNodes () {            
            return this.$store.getters.getNodes;
        }
    },
    watch: {
        getNodes (nodes) {
            this.nodes = nodes;
            let hash = this.$route.params.title;
            (hash) ? this.setData(hash) : '';      
        },
        $route(to) {
            let hash = to.params.title;
            (hash) ? this.setData(hash) : '';     
        }
    }
}
</script>