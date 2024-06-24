import { useAxios } from "../connection/APIConnection";

export const useProductApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/product/search`,
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
    GetAll: () => {
      return apiConnection.httpRequest(
        "GET",
        `api/product/GetAll`,
        null,
        null,
        true
      );
    },
    GetById: (value) => {
      return apiConnection.httpRequest(
        "GET",
        `api/product/getdetailbyid`,
        null,
        { value },
        true
      );
    },
    Insert: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/product/insert",
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    Update: (prop) => {
      return apiConnection.httpRequest(
        "PUT",
        "api/product/update",
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    Delete: (value) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/product/delete",
        null,
        { value },
        true
      );
    },
  };
};
