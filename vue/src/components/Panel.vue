<template>
    <div class="panel" v-if="status && cities">
        <div class="block status" :class="status.color"> {{ status.desc }} </div>
        <div class="block info">
            <p class="block__title">Общая информация:</p>
            <ul class="block-list">
                <li class="block-list__item">{{ nodes.length }} нод</li>
                <li class="block-list__item">{{ interfaces.length }} интерфейсов</li>
            </ul>
        </div>
        <div class="block city">
            <p class="block__title">Города:</p>
            <ul class="block-buttons">
                <City @activeCity="activeCity(city)" :v-if="current" v-for="city in cities" :key="city.id" :city="city" :active="active" :current="current"/>
            </ul>
        </div>
    </div>
</template>

<script>
import City from '@/components/City';

export default {
    name: 'Panel',
    data: () => ({
        nodes: null,
        node: null,
        status: null,
        current: null,
        active: null,
        cities: null,
        interfaces: null
    }),
    components: {City},
    computed: {
        getNodes () {
            return this.$store.getters.getNodes;
        },
        getCities () {
            return this.$store.getters.getCities;
        },
        getInterfaces () {
            return this.$store.getters.getInterfaces;
        }
        
    },
    methods: {
        activeCity (city) {
            if (this.active == city) {
                this.active = null;
                this.getStatus(this.nodes, city);
                this.$store.dispatch('changeCity', null);
                
            } else{  
                this.active = city
                this.getStatus(this.nodes, city);
                this.$store.dispatch('changeCity', city);
            }

        },
        getStatus (nodes, city) {
            let number = 1;
            if (city) {
                nodes.forEach(node => {
                    if (node.status > number && city.id == node.group_id) {
                        number = node.status;
                        this.status = {
                            number: node.status,
                            desc: node.description,
                            color: node.color
                        }
                    }
                })
            } else{
                nodes.forEach(node => {
                    if (node.status > number) {
                        number = node.status;
                        this.status = {
                            number: node.status,
                            desc: node.description,
                            color: node.color
                        }
                    }
                })
            }
        },
        setCities (cities) {
            let node = this.node;
            cities.forEach(city => {
                if (city.id == node.group_id) {
                    city.current = true;
                    this.current = city;
                }
            });
            this.cities = cities
        }
    },
    watch: {
        getNodes (nodes) {
            this.nodes = nodes
            let hash = this.$route.params.title;
            if (hash) {
                this.node = nodes.find(node => node.title == hash)
            }
            this.getStatus(nodes, this.active)
        },
        getCities (cities) {
            let hash = this.$route.params.title;
            (hash) ? this.setCities(cities, hash) : this.cities = cities;            
        },
        getInterfaces (interfaces){
            this.interfaces = interfaces;
        },
        $route(to) {
            let hash = to.params.title;
            let cities = this.cities;
            let nodes = this.nodes;
            this.node = nodes.find(node => node.title == hash);
            (hash) ? this.setCities(cities, hash) : this.cities = cities;
        }
    }
}
</script>