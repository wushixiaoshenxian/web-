import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../components/Login.vue";
import Registered from "../components/Registered.vue";
import Forgetpassword from "../components/Forgetpassword.vue";
import Mainpage from "../components/Mainpage.vue";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
<<<<<<< Updated upstream
    path: "/registered",
    name: "registered",
    component: Registered,
  },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    component: Forgetpassword,
  },
  {
    path: "/mainpage",
    name: "mainpage",
    component: Mainpage,    
  }
=======
      path: "/home",
      name: "Home",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    },
    {
      path: "/map",
      name: "Map",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../components/Map.vue"),
    },
>>>>>>> Stashed changes
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
