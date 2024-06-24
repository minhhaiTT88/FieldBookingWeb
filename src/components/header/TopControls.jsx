import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";

import { getUserFromStorage, removeUserFromStorage } from "../../store/actions/sharedActions";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoginApi } from "../../apiHelper/api/login";
import { User_Type_Enum } from "../../utils/constData";
import { useNavigate } from "react-router-dom";

const TopControls = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.authReducer);
  const loginApi = useLoginApi();
  const dispatch = useDispatch();

  const Logout = (e) => {
    const userLocal = getUserFromStorage();

    loginApi
      .Logout(userLocal?.Refresh_Token)
      .then((res) => {
        removeUserFromStorage();
        dispatch({ type: "CLEAR_USER" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gotoProfile = () => {
    try {
      const userLocal = getUserFromStorage();
      if (userLocal.User_Type == User_Type_Enum.Company) {
        navigate("/company-profile");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const items = [
    // {
    //   label: <a onClick={gotoProfile}>Profile</a>,
    //   icon: <FontAwesomeIcon icon={faEye} color="#69B1FF" />,
    //   key: "1",
    // },
    // {
    //   type: "divider",
    // },
    {
      label: "Đăng xuất",
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} color="red" />,
      key: "3",
      onClick: Logout,
    },
  ];

  return (
    <div className="w-full h-16 bg-white flex flex-nowrap justify-between items-center px-12 shadow-md border-b">
      <div></div>
      <div className="app__top-controls">
        <div className="notifications"></div>

        <Dropdown
          className="user_option"
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <Space>
            <div className="avatar-user w-12 h-12 rounded-full overflow-hidden shadow-lg">
              <img
                className="w-full h-full"
                src={
                  userLogin.File_Url_Avata != undefined
                    ? userLogin.Link_Web_Ftp + userLogin.File_Url_Avata
                    : "https://everydaynutrition.co.uk/wp-content/uploads/2015/01/default-user-avatar.png"
                }
                alt="user"
              />
            </div>
            <div className="user_name">
              <span>{userLogin.User_Name}</span>
            </div>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default TopControls;
