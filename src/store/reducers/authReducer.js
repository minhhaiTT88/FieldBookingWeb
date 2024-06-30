import { getUserFromStorage } from "../actions/sharedActions";

const _initUser = getUserFromStorage();

const initState = {
  UserType: _initUser.UserType,
  UserTypeText: _initUser.UserTypeText,
  UserId: _initUser.UserId,
  Access_Token: _initUser.Access_Token,
  SsonData: _initUser.SsonData,
  Refresh_Token: _initUser.Refresh_Token,
  ExpiryTime: _initUser.ExpiryTime,
  //
  UserName: _initUser.UserName,
  Full_Name: _initUser.Full_Name,
  Lst_Com_Id: _initUser.Lst_Com_Id,
  Reference_Id: _initUser.Reference_Id,
  Com_Name: _initUser.Com_Name,
  Com_Id: _initUser.Com_Id,
  FunctionSettings: _initUser.FunctionSettings,
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        UserType: payload.UserType,
        UserTypeText: payload.UserTypeText,
        UserId: payload.UserId,
        Access_Token: payload.Access_Token,
        SsonData: payload.SsonData,
        Refresh_Token: payload.Refresh_Token,
        ExpiryTime: payload.ExpiryTime,
        //
        UserName: payload.UserName,
        Full_Name: payload.Full_Name,
        Lst_Com_Id: payload.Lst_Com_Id,
        Reference_Id: payload.Reference_Id,
        Com_Name: payload.Com_Name,
        Com_Id: payload.Com_Id,
        FunctionSettings: payload.FunctionSettings,
      };
    case "CLEAR_USER":
      return {
        ...state,
        UserId: 0,
        Access_Token: "",
        SsonData: "",
        Refresh_Token: "",
        ExpiryTime: null,
        UserName: "",
        Full_Name: null,
        FunctionSettings: [],
      };
    case "RESET_TOKEN":
      return {
        ...state,
        Access_Token: payload.Access_Token,
        Refresh_Token: payload.Refresh_Token,
        ExpiryTime: payload.ExpiryTime,
      };
    default:
      return state;
  }
};
