import md5 from "md5";
import {
  getUserFromStorage,
  get_User_Name,
} from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const useCustomerApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/Customer/search`,
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
        `api/Customer/getdetailbyid`,
        null,
        { value },
        true
      );
    },
    GetPhoneNumber: (value) => {
      return apiConnection.httpRequest(
        "GET",
        `api/Customer/GetPhoneNumber`,
        null,
        { value },
        true
      );
    },
    GetAll: () => {
      return apiConnection.httpRequest(
        "GET",
        `api/Customer/GetAll`,
        null,
        null,
        true
      );
    },
    Insert: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/Customer/insert",
        prop,
        null,
        true
      );
    },
    Update: (prop) => {
      return apiConnection.httpRequest(
        "PUT",
        "api/Customer/update",
        prop,
        null,
        true
      );
    },
    Delete: (value) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/Customer/delete",
        null,
        {
          value,
        },
        true
      );
    },
  };
};
