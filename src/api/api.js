import axios from "axios";
import { toast } from "vue3-toastify";

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast("Неизвестная ошибка");
    }
  }
);

export const postSignUp = async (name, login, password) => {
  return await axios.post("http://localhost:3001/auth/signup", {
    name: name,
    login: login,
    password: password,
  });
};

export const postSignIn = async (login, password) => {
  return await axios.post("http://localhost:3001/auth/login", {
    login: login,
    password: password,
  });
};

export const postCreateProject = async (projectName, token) => {
  return await axios.post(
    "http://localhost:3001/projects/create-project",
    {
      name: projectName,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getProjectList = async (token) => {
  return await axios.get("http://localhost:3001/projects/get-all", {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteDeleteProject = async (id, token) => {
  return await axios.delete("http://localhost:3001/projects/delete-project", {
    headers: {
      Authorization: token,
    },
    data: {
      project_id: id,
    },
  });
};

export const postCreateColumn = async (columnName, activeProject, token) => {
  return await axios.post(
    "http://localhost:3001/columns/create-column",
    {
      name: columnName,
      position: 0,
      project_id: activeProject,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const deleteColumn = async (id, token) => {
  return await axios.delete(
    `http://localhost:3001/columns/delete-column/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getCardList = async (id, token) => {
  return await axios.get(`http://localhost:3001/card/get-column-cards/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const postUpdateCard = async (
  card,
  editedSummery,
  editedDescription,
  columnId,
  token
) => {
  return await axios.post(
    "http://localhost:3001/card/update-card",
    {
      ...card,
      ColumnId: columnId || card.columnId,
      summery: editedSummery,
      description: editedDescription,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const deleteCard = async (id, token) => {
  return await axios.delete(`http://localhost:3001/card/delete-card/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};
