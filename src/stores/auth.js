import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("auth", () => {
  const token = ref(null);

  const setToken = (t) => {
    token.value = t;
  };

  const logout = () => {
    token.value = null;
  };

  return { token, setToken, logout };
});
