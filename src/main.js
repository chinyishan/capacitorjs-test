import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import VueSignaturePad from 'vue-signature-pad';
import './assets/reset.css';
import './assets/main.css';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(VueSignaturePad);
app.mount('#app');
