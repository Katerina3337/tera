import { ref, computed } from "vue";
import { defineStore } from "pinia";
import jwtParser from "../lib/jwtParser";

export default defineStore("auth", () => {
  const token = ref(null);
  const user = computed(() => jwtParser(token.value));

  const setToken = (t) => {
    token.value = t;
  };

  const logout = () => {
    token.value = null;
  };

  return { token, user, setToken, logout };
});
