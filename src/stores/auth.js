import { ref, computed } from "vue";
import { defineStore } from "pinia";
import jwtParser from "../lib/jwtParser";

export default defineStore("auth", () => {
  const token = ref(null);
  const user = computed(() => (token.value ? jwtParser(token.value) : null));

  const setToken = (t) => {
    token.value = t;
    localStorage.setItem("token", t);
  };

  const initAuth = () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
      token.value = lsToken;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    token.value = null;
  };

  return { token, user, setToken, initAuth, logout };
});
