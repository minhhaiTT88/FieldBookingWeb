import { getUserFromStorage, get_User_Name } from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const useFileAttachApi = (controller) => {
  const apiConnection = useAxios();

  return {
    SearchFiles: (p_posts_id, from, to, p_order_by) => {
      return apiConnection.httpRequest(
        "POST",
        `api/manager/file-attach/search-by-posts-id`,
        null,
        {
          p_posts_id: p_posts_id,
          from: from,
          to: to,
          p_order_by: p_order_by,
        },
        true
      );
    },
    AddFile: (prop, p_posts_id) => {
      return apiConnection.httpRequest(
        "POST",
        "api/manager/file-attach/add-file",
        prop,
        { p_posts_id: p_posts_id },
        false,
        "multipart/form-data"
      );
    },
    Delete: (p_id) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/manager/file-attach/delete",
        null,
        {
          p_id: p_id,
          p_Modified_By: get_User_Name(),
        },
        true
      );
    },
    Delete_Multiple: (p_ids) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/manager/file-attach/delete_multiple",
        null,
        {
          p_ids: p_ids,
          p_Modified_By: get_User_Name(),
        },
        true
      );
    },
  };
};
