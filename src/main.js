import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-purple/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";
import "./style.css";

import { createApp } from "vue";
import App from "./App.vue";
import  router  from "./router";
import PrimeVue from "primevue/config";


import Button from 'primevue/button';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import InputGroup from 'primevue/inputgroup';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';

const app = createApp(App);
app.use(PrimeVue, { ripple: true  });
app.use(router);


app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.component('Button', Button);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('InputGroup', InputGroup);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('TabMenu', TabMenu);

app.mount("#app");
