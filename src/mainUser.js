import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './AppUser';
import indexPageUser from './components/indexPageUser/indexPageUser';
import questionnaireUser from './components/questionnaireUser/questionnaireUser';
import '../static/css/reset';

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter();

router.map({
    '/main' : {
        component : indexPageUser
    },
    '/questionnaire/:id' : {
        component : questionnaireUser
    }
})

router.redirect({
    '/': '/main'
})

router.start(app, '#app');