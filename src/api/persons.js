import { api } from "./client";

export const personsApi = {
  getAll: () => api.get("/api/persons"),

  getById: (id) => api.get(`/api/persons/${id}`),

  getByCode: (code) => api.get(`/api/persons/code/${encodeURIComponent(code)}`),

  create: ({ code, firstName, lastName, email, phoneNumber }) =>
    api.post("/api/persons", {
      code,
      firtsName: firstName, // el DTO del backend usa "firtsName"
      lastName,
      email,
      phoneNumber,
    }),

  update: (id, { firstName, lastName, email, phoneNumber }) =>
    api.put(`/api/persons/${id}`, {
      id,
      firtsName: firstName, // el DTO del backend usa "firtsName"
      lastName,
      email,
      phoneNumber,
    }),

  remove: (id) => api.del(`/api/persons/${id}`),
};
