import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Board from "../views/Board.vue";
import Game from "../views/Game.vue";

import io from "socket.io";
import { v4 as uuidv4 } from "uuid";

console.log("Starting the Vue router.");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/board",
    name: "Board",
    component: Board
  },
  {
    path: "/game",
    name: "Game",
    component: Game
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
