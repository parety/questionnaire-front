import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import indexPage from './components/indexPage/indexPage';
import create from './components/create/create';
import edit from './components/edit/edit';
import questionnaire from './components/questionnaire/questionnaire';
import questionnaireData from './components/questionnaireData/questionnaireData';
import '../static/css/reset';

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter();

router.map({
    '/main' : {
        component : indexPage
    },
    '/create' : {
        component : create
    },
    '/edit/:id' : {
        component : edit
    },
    '/questionnaire/:id' : {
        component : questionnaire
    },
    '/questionnaireData/:id' : {
        component : questionnaireData
    }
})

router.redirect({
    '/': '/main'
})

router.start(app, '#app');