import md5 from "md5";
import {
  getUserFromStorage,
  get_User_Name,
} from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const useFieldApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/field/search`,
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
    GetById: (value) => {
      return apiConnection.httpRequest(
        "GET",
        `api/field/getdetailbyid`,
        null,
        { value },
        true
      );
    },
    GetAll: () => {
      return apiConnection.httpRequest(
        "GET",
        `api/field/GetAll`,
        null,
        null,
        true
      );
    },
    Insert: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/field/insert",
        prop,
        null,
        true
      );
    },
    Update: (prop) => {
      return apiConnection.httpRequest(
        "PUT",
        "api/field/update",
        prop,
        null,
        true
      );
    },
    Delete: (value) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/field/delete",
        null,
        {
          value,
        },
        true
      );
    },
  };
};
