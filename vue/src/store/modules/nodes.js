
import axios from "axios";


export default {
    state: {
        nodes: null,
        current: null,
        city: null,
        cities: null,
        metrics: null,
        statuses: null
    },
    actions: {
        async fetchData({commit}) {
            let nodes, metrics;
            let urlNodes = 'http://127.0.0.1:23456/api/groups';
            let urlMetrics = 'http://127.0.0.1:23456/api/metrics';

            await axios.all([axios.get(urlNodes), axios.get(urlMetrics)])
                .then(axios.spread((dataNodes, dataMetrics) => {
                    nodes = dataNodes.data.data;
                    metrics = dataMetrics.data.data;
                }))
                .catch(error => {throw error});


            await nodes.forEach(node => {
                let metric = metrics.filter(metric => metric.node_id === node.node_id);
                node.metrics = metric;
                let last = 0, current, options;
                metric.forEach(metric => {
                    let date = Date.parse(metric.datetime);
                    if (date > last) {
                        last = date;
                        current = metric;
                }
                options = {
                    cpu: current.cpu_utilization, 
                    memory: current.memory_utilization, 
                    disk: current.disk_utilization
                };
                for (const key in options) {
                    let color, cls;
                    let val = parseInt(options[key]);
                    if (val >= 95) {
                        color = '#FF6384';
                        cls = 'hight';
                    } else if (val > 85 && val < 95) {
                        color = '#ffd46b';
                        cls = 'middle';
                    } else {
                        color = '#97e0c2';
                        cls = 'low';
                    }
                    
                    options[key] = {
                        value: val,
                        color: color,
                        class: cls
                    };
                    node.lastmetric = options;
                }
            })});
            commit('setNodes', nodes)
            commit('setCities', nodes)
            commit('setStatuses', nodes)

            
          },
        changeCity ({commit}, city) {
            commit("setCity", city)
        }
    },
    mutations: {
        setNodes (state, nodes) {
            state.nodes = nodes;
        },
        setMetrics (state, metrics) {
            state.metrics = metrics;            
        },
        setCity (state, city) {
            state.city = city;
        },
        setCities (state, nodes) {
            let cities = [], counter = 0;
            nodes.forEach(node => {
                if (node.group_id > counter){
                    counter++
                    const obj = {
                        id: node.group_id,
                        name: node.city
                    }
                    cities.push(obj)
                }
            });
            state.cities = cities;
        },
        setStatuses (state, statuses) {
            let arr = [], counter = 0;
            statuses.forEach(node => {
                if (node.group_id > counter){
                    counter++
                    const obj = {
                        id: node.status,
                        color: node.color,
                        desc: node.description
                    }
                    arr.push(obj)
                }
            });
            state.statuses = arr;
        }
    },
    getters: {
        getNodes: state => {
            return state.nodes;
        },
        getMetrics: state => {
            return state.metrics;
        },
        getData: state => {
            return [state.nodes, state.metrics];
        },
        getCurrent (state) {
            return state.current
        },
        getCity (state) {
            return state.city
        },
        getCities (state) {
            return state.cities
        },
        getStatuses (state) {
            return state.statuses
        }
    }
}