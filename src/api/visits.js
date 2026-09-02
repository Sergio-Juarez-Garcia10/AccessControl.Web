import { api } from "./client";

export const visitsApi = {
  getAll: () => api.get("/api/visits"),

  getActive: () => api.get("/api/visits/active"),

  getByPerson: (personId) => api.get(`/api/visits/person/${personId}`),

  registerEntry: ({ personId, code, entryTime }) =>
    api.post("/api/visits/entry", {
      personId: personId || null,
      code: code || null,
      entryTime: entryTime || null,
    }),

  registerExit: ({ visitId, code, exitTime }) =>
    api.post("/api/visits/exit", {
      visitId: visitId || null,
      code: code || null,
      exitTime: exitTime || null,
    }),
};
