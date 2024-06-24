import { useAxios } from "../connection/APIConnection";

export const useStaffApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/staff/search`,
        null,
        {
          keysearch,
          from,
          to,
          orderBy,
        },
        true
      );
    },
    GetById: (id) => {
      return apiConnection.httpRequest("GET", `api/staff/getdetailbyid`, null, { value: id }, true);
    },
    Insert: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/staff/insert",
        prop,
        null,
        true
        // "multipart/form-data"
      );
    },
    Update: (prop) => {
      return apiConnection.httpRequest(
        "PUT",
        "api/staff/update",
        prop,
        null,
        true
        // "multipart/form-data"
      );
    },
    Delete: (p_id) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/staff/delete",
        null,
        {
          value: p_id,
        },
        true
      );
    },
  };
};
