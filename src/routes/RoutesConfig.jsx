//view
import Dashboard from "../pages/Dashboard/Index";

import Product from "../pages/Product/Index";
import Field from "../pages/Field/Index";
import Staff from "../pages/Staff/Index";
import Store from "../pages/Store/Index";

import FieldBookingList from "../pages/FieldBookingList/Index";
import FieldBookingInDay from "../pages/FieldBookingInDay/Index";
import BillSearch from "../pages/BillSearch/Index";
import Customer from "../pages/Customer/Index";

//layout
import LayoutLeftSideBar from "../components/layout/LayoutLeftSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faHome,
  faIdBadge,
  faListCheck,
  faMagnifyingGlass,
  faMoneyBill,
  faStore,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const RoutersConfig = [
  {
    Function_Id: "DASHBOARD",
    Function_Name: "Trang chủ",
    icon: <FontAwesomeIcon icon={faHome} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Dashboard },
  },

  {
    Function_Id: "STORE",
    Function_Name: "Bán hàng",
    icon: <FontAwesomeIcon icon={faStore} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/ban-hang",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Store },
  },
  {
    Function_Id: "FIELD",
    Function_Name: "Quản lý sân bóng",
    icon: <FontAwesomeIcon icon={faMoneyBill} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/quan-ly-san-bong",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Field },
  },
  // {
  //   Function_Id: "FIELDBOOKINGINDAY",
  //   Function_Name: "Quản lý sân bóng",
  //   icon: <FontAwesomeIcon icon={faMoneyBill} />,
  //   DisplayOnMenu: 0,
  //   checkRight: false,
  //   Function_Url: "/quan-ly-san-bong/danh-sach-don-dat-san",
  //   pageLayout: LayoutLeftSideBar,
  //   pageContent: { component: FieldBookingInDay },
  // },
  {
    Function_Id: "FEILDBOOKING",
    Function_Name: "DS đơn đặt sân tổng hợp",
    icon: <FontAwesomeIcon icon={faListCheck} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/danh-sach-don-dat-san",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: FieldBookingList },
  },
  {
    Function_Id: "BILLSEARCH",
    Function_Name: "Tra cứu hóa đơn",
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/tra-cuu-hoa-don",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: BillSearch },
  },
  {
    Function_Id: "PRODUCT",
    Function_Name: "Quản lý sản phẩm",
    icon: <FontAwesomeIcon icon={faBottleWater} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/quan-ly-san-pham",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Product },
  },
  {
    Function_Id: "STAFF",
    Function_Name: "Quản lý nhân viên",
    icon: <FontAwesomeIcon icon={faIdBadge} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/quan-ly-nhan-su",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Staff },
  },
  {
    Function_Id: "CUSTOMER",
    Function_Name: "DS khách hàng",
    icon: <FontAwesomeIcon icon={faUsers} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/danh-sach-khach-hang",
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Customer },
  },
];
