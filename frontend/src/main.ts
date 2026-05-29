import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // <-- Importante estar aqui

const app = createApp(App);
app.use(router); // <-- O pulo do gato! Ativa as rotas no sistema
app.mount('#app');