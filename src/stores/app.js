import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import useAuthStore from "@/stores/auth";

export default defineStore("app", () => {
  const auth = useAuthStore();

  const activeProject = ref(null);
  const columnList = ref(null);

  const setActiveProject = async (id) => {
    activeProject.value = id;

    const resp = await axios.get(
      `http://localhost:3001/columns/get-project-columns/${id}`,
      {
        headers: {
          Authorization: auth.token,
        },
      }
    );

    columnList.value = resp.data;
  };

  const deactivateProject = () => {
    activeProject.value = null;
    columnList.value = [];
  };

  const addColumn = (column) => {
    if (!columnList.value) columnList.value = [column];
    else columnList.value.push(column);
  };

  return {
    activeProject,
    columnList,
    setActiveProject,
    deactivateProject,
    addColumn,
  };
});
