import { createRouter, createWebHistory } from "vue-router";
import Search from '../components/SearchField.vue';
import Rerun from '../components/RerunDate.vue';

const routes =[
    {
        path: '/',
        component: Search
    },
    {
        path: '/rerun',
        component: Rerun

    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;