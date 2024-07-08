import React, { useEffect } from "react";
import { Layout } from "antd";

import LeftMenu from "../header/LeftMenu";
import TopControls from "../header/TopControls";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LayoutLeftSideBar = (props) => {
  const processSocket = (e) => {
    try {
      if (e?.detail) {
        if (e.detail.type === "BOOKING_SUCCESS" && e.detail.content) {
          console.log(e.detail);
          toast.success(
            <a href="/quan-ly-don-dat-san">Có đơn đặt sân [{e.detail.content.FieldName}] mới từ khách hàng [{e.detail.content.CustomerName}] khung giờ [{e.detail.content.TimeSlotText}]</a>
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.addEventListener("socket-message", processSocket);
    return () => {
      document.removeEventListener("socket-message", processSocket);
    };
  }, []);

  return (
    // <div className="relative">
    <Layout className="main-layout h-screen">
      <LeftMenu />

      <Layout>
        <TopControls />
        <props.component />
      </Layout>
    </Layout>
    // </div>
  );
};
export default LayoutLeftSideBar;
