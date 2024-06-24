import md5 from "md5";
import { getUserFromStorage, get_User_Name } from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const useBillApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/bill/search`,
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
      return apiConnection.httpRequest("GET", `api/bill/getdetailbyid`, null, { p_id: id }, true);
    },
    Insert: (prop) => {
      prop.CreatedBy = get_User_Name();

      return apiConnection.httpRequest(
        "POST",
        "api/bill/Insert",
        prop,
        null,
        true,
      );
    },
    PaymentField: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/bill/PaymentField",
        prop,
        null,
        true,
      );
    },
    Update: (prop) => {
      prop.Modified_By = get_User_Name();
      if (prop.IsPriavate == 1 && prop.Password != "") {
        prop.Password = md5(prop.Password);
      }

      return apiConnection.httpRequest(
        "POST",
        "api/bill/update",
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    Delete: (p_id) => {
      return apiConnection.httpRequest(
        "POST",
        "api/bill/delete",
        null,
        {
          p_id: p_id,
          p_Modified_By: get_User_Name(),
        },
        true
      );
    },
  };
};
