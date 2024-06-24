import md5 from "md5";
import { getUserFromStorage, get_User_Name } from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const usePostsApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchData: (keysearch, from, to, orderBy) => {
      return apiConnection.httpRequest(
        "POST",
        `api/manager/posts/search`,
        null,
        {
          p_user_name: get_User_Name(),
          keysearch: keysearch,
          from: from,
          to: to,
          p_order_by: orderBy,
        },
        true
      );
    },
    GetById: (id) => {
      return apiConnection.httpRequest(
        "GET",
        `api/manager/posts/get-ByID`,
        null,
        { p_id: id },
        true
      );
    },
    Insert: (prop) => {
      prop.Created_By = get_User_Name();
      if (prop.IsPriavate == 1 && prop.Password != "") {
        prop.Password = md5(prop.Password);
      }
      
      return apiConnection.httpRequest(
        "POST",
        "api/manager/posts/Insert",
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    Update: (prop) => {
      prop.Modified_By = get_User_Name();
      if (prop.IsPriavate == 1 && prop.Password != "") {
        prop.Password = md5(prop.Password);
      }

      return apiConnection.httpRequest(
        "POST",
        "api/manager/posts/update",
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    Delete: (p_id) => {
      return apiConnection.httpRequest(
        "POST",
        "api/manager/posts/delete",
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
