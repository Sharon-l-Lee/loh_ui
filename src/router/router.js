import { createRouter, createWebHistory } from "vue-router";
import Search from '../components/SearchField.vue';
import Rerun from '../components/RerunDate.vue';
import Info from '../components/Information.vue';
import About from '../components/About.vue';


const routes =[
    {
        path: '/',
        component: Search
    },
    {
        path: '/rerun',
        component: Rerun

    },
    {
        path: '/info',
        component: Info

    },
    {
        path: '/about',
        component: About

    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;