import { createRouter, createWebHistory } from 'vue-router';
import Students from '../views/StudentsTable.vue';
import Login from '../views/Login.vue';
import CourseData from '../views/CourseData.vue';

const routes = [
    {
        path: '/estudiantes',
        name: 'Estudiantes',
        component: Students,
    },
    {
        path: '/inicio',
        name: 'Home',
        component: Login,
    },
    {
        path: '/informacion/cursos',
        name: 'data-courses',
        component: CourseData,
    },
    {
        path: '/',
        redirect: '/inicio'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
