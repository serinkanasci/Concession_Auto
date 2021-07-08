import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Home from "./views/Home";
import Car from "./views/Car";


Vue.use(Router);

export default new Router({
    mode: "history",
    hashbang: false,
    abstract: true,
    hash: false,
    base: "/the-room-front/",
    linkExactActiveClass: "active",
    root: "/the-room-front/",
    routes: [{
            path: "/",
            name: "components",
            components: {
                header: AppHeader,
                default: Home,
                footer: AppFooter
            }
        },
        {
            path: "/car",
            name: "car",
            components: {
                header: AppHeader,
                default: Car,
                footer: AppFooter
            }
        },
        { path: "*", redirect: "/" }
    ],
    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});