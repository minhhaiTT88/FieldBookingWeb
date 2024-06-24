import { useAxios } from "../connection/APIConnection";

export const usePublicApi = (controller) => {
  const apiConnection = useAxios();

  return {
    GetBaseImage: (image_id) => {
      return apiConnection.httpRequest(
        "GET",
        `api/public/image/get-base-image`,
        null,
        { image_id: image_id },
        false,
        "image/*",
        { responseType: "blob" }
      );
    },
  };
};
