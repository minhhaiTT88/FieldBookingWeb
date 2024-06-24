import { useAxios } from "../connection/APIConnection";

export const GetAllCode = () => {
  const clientAxios = useAxios();
  return clientAxios.httpRequestNonNotify("GET", `api/system/allcode/get-all`, null, null, false);
};
