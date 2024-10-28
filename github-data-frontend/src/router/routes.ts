import {RouteRecordRaw} from "vue-router";


export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/MainView.vue')
    },

]