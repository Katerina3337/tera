import { createRouter, createWebHistory } from "vue-router";
import useAuthStore from "@/stores/auth";

import HomePage from "@/pages/HomePage.vue";
import SignIn from "@/pages/SignIn.vue";
import SignUp from "@/pages/SignUp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.name !== "sign-in" && to.name !== "sign-up" && !auth.token) {
    next({ name: "sign-in" });
  } else next();
});

export default router;
