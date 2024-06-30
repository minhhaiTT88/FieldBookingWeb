
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
    GetById: (value) => {
      return apiConnection.httpRequest("GET", `api/bill/getdetailbyid`, null, { value }, true);
    },
    Insert: (prop) => {
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
  };
};
