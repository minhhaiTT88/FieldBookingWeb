import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faUpDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Histogram } from "./Component/Histogram";
import { data } from "./Component/data";
import { Content } from "antd/es/layout/layout";
import { Breadcrumb } from "antd";

function Index() {
  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: "Trang chủ" }]}
          />
          <div className="p-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <div className="rounded-xl border border-stroke bg-[#5856d6] text-white  p-6 shadow-default">
                <div className="flex gap-2 items-center justify-center">
                  <FontAwesomeIcon icon={faClipboard} />
                  <span className="text-base">Tổng số đơn đặt sân</span>
                </div>
                <div className="mt-4 font-bold text-xl text-center">1.099</div>
              </div>
              <div className="rounded-xl border border-stroke bg-[#5856d6] text-white  p-6 shadow-default">
                <div className="flex gap-2 items-center justify-center">
                  <FontAwesomeIcon icon={faUpDown} />
                  <span className="text-base">Doanh thu trong tháng</span>
                </div>
                <div className="mt-4 font-bold text-xl text-center">
                  1.000.124 đ
                </div>
              </div>
              <div className="rounded-xl border border-stroke bg-[#3399ff] text-white  p-6 shadow-default">
                <div className="flex gap-2 items-center justify-center">
                  <FontAwesomeIcon icon={faClipboard} />
                  <span className="text-base">Doanh thu từ dịch vụ</span>
                </div>
                <div className="mt-4 font-bold text-xl text-center">
                  1.000.124 đ
                </div>
              </div>
              <div className="rounded-xl border border-stroke bg-[#e55353] text-white  p-6 shadow-default">
                <div className="flex gap-2 items-center justify-center">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="text-base">Tổng số sản phẩm</span>
                </div>
                <div className="mt-4 font-bold text-xl text-center">320</div>
              </div>
            </div>
          </div>
          <div className="px-10">
            <h1 className="font-bold">Biểu đồ doanh thu theo ngày</h1>
            <Histogram data={data} width={1200} height={400} />
          </div>
        </Content>
      </div>
    </>
  );
}

export default Index;
