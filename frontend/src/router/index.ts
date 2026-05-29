import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; 
import RadicalJuiceView from '../views/RadicalJuiceView.vue';
import SuperLemonHazeView from '../views/SuperLemonHaze.vue'; // <--- Importou

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/radical-juice', name: 'radical', component: RadicalJuiceView },
    { path: '/super-lemon-haze', name: 'slh', component: SuperLemonHazeView } // <--- Registrou
  ]
});

export default router;