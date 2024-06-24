import { useAxios } from "../connection/APIConnection";

export const useFieldBookingApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/FieldBooking/search`,
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
        `api/FieldBooking/getdetailbyid`,
        null,
        { value },
        true
      );
    },
    Insert: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        "api/FieldBooking/insert",
        prop,
        null,
        true
      );
    },
    Update: (prop) => {
      return apiConnection.httpRequest(
        "PUT",
        "api/FieldBooking/update",
        prop,
        null,
        true
      );
    },
    UpdateStatus: (id, status, reason) => {
      return apiConnection.httpRequest(
        "PUT",
        "api/FieldBooking/UpdateStatus",
        null,
        {
          id,
          status,
          reason,
        },
        true
      );
    },
    Delete: (value) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/FieldBooking/delete",
        null,
        {
          value,
        },
        true
      );
    },
  };
};
